package repos

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/robfig/cron"
	"log"
	"nodes-sindh/github.com/heroku/go-getting-started/models/node"
	"os"
	"time"
)

var db *sql.DB

func init() {
	var err error
	var connStr string
	if os.Getenv("PROFILE") == "LOCAL" {
		username := os.Getenv("DB_USR")
		password := os.Getenv("DB_PWD")
		host := os.Getenv("DB_HOST")
		dbPort := os.Getenv("DB_PORT")
		dbSchema := os.Getenv("DB_SCHEMA")

		connStr = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", username, password, host, dbPort, dbSchema)
	} else {

		connStr = fmt.Sprintf("%s?sslmode=require", os.Getenv("DATABASE_URL"))
	}
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}

	if err = db.Ping(); err != nil {
		panic(err)
	}

	log.Println("Connection to Database successful")
	c := cron.New()
	// make this configurable
	err = c.AddFunc("@every 2h", scheduledFlush)
	if err == nil {
		c.Start()
	} else {
		log.Println("cron job failed", err)
	}
}

func scheduledFlush() {
	_, e := db.Exec("delete from node_pings")
	if e == nil {
		log.Printf("Scheduled task was run @ %s", time.Now().Local())
	} else {
		log.Println("scheduled task failed to execute", e)
	}
}

func GetLastPing(id int) (node.New, error) {

	ping := node.New{}
	row := db.QueryRow("select node_pings.id,"+
		"ping_time,"+
		"status,"+
		"battery_voltage,"+
		"power_solar_input,"+
		"power_battery_to_grid,"+
		"power_grid_to_battery,"+
		"power_battery_to_load,"+
		"grid_voltage,"+
		"switch_1,"+
		"switch_2,"+
		"limit_1 from node_pings "+
		"left join voltage_limit on voltage_limit.id = node_pings.id "+
		"where node_pings.id = $1 "+
		"order by ping_time desc", id)
	e := row.Scan(
		&ping.Id,
		&ping.Ping,
		&ping.Status,
		&ping.BatteryVoltage,
		&ping.PowerSolarInput,
		&ping.PowerBatteryToGrid,
		&ping.PowerGridToBattery,
		&ping.PowerBatteryToLoad,
		&ping.GridVoltage,
		&ping.Switch1,
		&ping.Switch2,
		&ping.Limit1)

	return ping, e

}

func UpdateNodeStatus(n node.New) error {
	_, e := db.Exec("insert into node_pings(id, "+
		"ping_time, "+
		"status, "+
		"battery_voltage,"+
		"power_solar_input,"+
		"power_battery_to_grid,"+
		"power_grid_to_battery,"+
		"power_battery_to_load,"+
		"grid_voltage, "+
		"switch_1, "+
		"switch_2, "+
		"load_switch_1, "+
		"load_switch_2, "+
		"load_switch_3, "+
		"load_switch_4) "+
		"values ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11, $12, $13, $14, $15)",
		n.Id,
		n.Ping,
		n.Status,
		n.BatteryVoltage,
		n.PowerSolarInput,
		n.PowerBatteryToGrid,
		n.PowerGridToBattery,
		n.PowerBatteryToLoad,
		n.GridVoltage,
		n.Switch1,
		n.Switch2,
		n.LoadSwitch1,
		n.LoadSwitch2,
		n.LoadSwitch3,
		n.LoadSwitch4)
	return e
}

func GetNodeIds() ([]int, error) {
	rows, e := db.Query("select distinct(id) from node_pings")
	nodes := make([]int, 0)
	var Id int
	for rows.Next() {
		if e := rows.Scan(&Id); e != nil {
			return nodes, e
		}
		nodes = append(nodes, Id)
	}

	return nodes, e

}

func GetLastPingForAllNodes() ([]node.New, error) {

	pingList := make([]node.New, 0)
	rows, e := db.Query(
		"with ranked_messages as " +
			"(" +
			"select " +
			"id," +
			"ping_time," +
			"status," +
			"battery_voltage," +
			"power_solar_input," +
			"power_battery_to_grid," +
			"power_grid_to_battery," +
			"power_battery_to_load," +
			"grid_voltage, " +
			"switch_1, " +
			"switch_2," +
			"load_switch_1," +
			"load_switch_2," +
			"load_switch_3," +
			"load_switch_4 ," +
			"rank() over (partition by id order by ping_time desc) as rn " +
			"from node_pings) " +
			"select ranked_messages.id," +
			"ping_time," +
			"status," +
			"battery_voltage," +
			"power_solar_input," +
			"power_battery_to_grid," +
			"power_grid_to_battery," +
			"power_battery_to_load," +
			"grid_voltage," +
			"switch_1," +
			"switch_2," +
			"load_switch_1," +
			"load_switch_2," +
			"load_switch_3," +
			"load_switch_4," +
			"limit_1," +
			"limit_2," +
			"limit_3," +
			"limit_4 from ranked_messages " +
			"left join voltage_limit on voltage_limit.id = ranked_messages.id " +
			"where rn = 1")
	if e != nil {
		return pingList, e
	}
	var latestPing node.New
	for rows.Next() {
		if e := rows.Scan(&latestPing.Id,
			&latestPing.Ping,
			&latestPing.Status,
			&latestPing.BatteryVoltage,
			&latestPing.PowerSolarInput,
			&latestPing.PowerBatteryToGrid,
			&latestPing.PowerGridToBattery,
			&latestPing.PowerBatteryToLoad,
			&latestPing.GridVoltage,
			&latestPing.Switch1,
			&latestPing.Switch2,
			&latestPing.LoadSwitch1,
			&latestPing.LoadSwitch2,
			&latestPing.LoadSwitch3,
			&latestPing.LoadSwitch4,
			&latestPing.Limit1,
			&latestPing.Limit2,
			&latestPing.Limit3,
			&latestPing.Limit4); e == nil {
			pingList = append(pingList, latestPing)
		} else {
			break
		}

	}
	return pingList, e

}

func GetLastNPingsForANode(id int, n int) (pingList []node.New, err error) {

	if rows, err := db.Query("select * from node_pings where id = $1 order by ping_time desc limit $2", id, n); err == nil {
		return getNodeList(rows)
	}
	return pingList, err
}

func GetLastPingsForNodeInXInterval(id int, interval int) (pingList []node.New, err error) {
	var rows *sql.Rows
	queryStr := fmt.Sprintf("select * from node_pings where id = %d and ping_time > now() - interval '%d minutes'", id, interval)
	if rows, err = db.Query(queryStr); err == nil {
		return getNodeList(rows)
	}
	return pingList, err

}

func getNodeList(rows *sql.Rows) (nodeList []node.New, err error) {
	pingList := make([]node.New, 0)
	var ping node.New
	for rows.Next() {
		if err = rows.Scan(&ping.Id, &ping.Ping, &ping.Status, &ping.BatteryVoltage, &ping.PowerSolarInput, &ping.PowerBatteryToGrid, &ping.PowerGridToBattery, &ping.PowerBatteryToLoad, &ping.GridVoltage, &ping.Switch1); err == nil {
			pingList = append(pingList, ping)
		} else {
			break
		}

	}
	return pingList, err

}
