package repos

import (
	"database/sql"
	"os"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/heroku/go-getting-started/models"
	"log"
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
}

func GetLastPing(id int) (models.Node, error) {

	ping := models.Node{}
	row := db.QueryRow("select node_pings.id,ping_time,status,voltage,current,power,voltage_limit from node_pings "+
		"left join voltage_limit on voltage_limit.id = node_pings.id "+
		"where node_pings.id = $1 "+
		"order by ping_time desc", id)
	e := row.Scan(&ping.Id, &ping.Ping, &ping.Status, &ping.Voltage, &ping.Current, &ping.Power, &ping.VoltageLimit)

	return ping, e

}

func UpdateNodeStatus(n models.Node) error {
	_, e := db.Exec("insert into node_pings(id, ping_time, status, voltage, current, power) values ($1, $2, $3, $4, $5, $6)", n.Id, n.Ping, n.Status, n.Voltage, n.Current, n.Power)
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

func GetLastPingForAllNodes() ([]models.Node, error) {

	pingList := make([]models.Node, 0)
	rows, e := db.Query("with ranked_messages as " +
		"(select id,ping_time,status,voltage,current, power ,rank() over (partition by id order by ping_time desc) as rn " +
		"from node_pings) " +
		"select ranked_messages.id,ping_time,status,voltage,current,power,voltage_limit from ranked_messages " +
		"left join voltage_limit on voltage_limit.id = ranked_messages.id " +
		"where rn = 1")
	if e != nil {
		return pingList, e
	}
	var latestPing models.Node
	for rows.Next() {
		if e := rows.Scan(&latestPing.Id, &latestPing.Ping, &latestPing.Status, &latestPing.Voltage, &latestPing.Current, &latestPing.Power, &latestPing.VoltageLimit); e == nil {
			pingList = append(pingList, latestPing)
		} else {
			break
		}

	}
	return pingList, e

}

func GetLastNPingsForANode(id int, n int) (pingList []models.Node, err error) {

	if rows, err := db.Query("select * from node_pings where id = $1 order by ping_time desc limit $2", id, n); err == nil {
		return getNodeList(rows)
	}
	return pingList, err
}

func GetLastPingsForNodeInXInterval(id int, interval int) (pingList []models.Node, err error) {
	var rows *sql.Rows
	queryStr := fmt.Sprintf("select * from node_pings where id = %d and ping_time > now() - interval '%d minutes'", id, interval)
	if rows, err = db.Query(queryStr); err == nil {
		return getNodeList(rows)
	}
	return pingList, err

}

func getNodeList(rows *sql.Rows) (nodeList []models.Node, err error) {
	pingList := make([]models.Node, 0)
	var ping models.Node
	for rows.Next() {
		if err = rows.Scan(&ping.Id, &ping.Ping, &ping.Status, &ping.Voltage, &ping.Current, &ping.Power); err == nil {
			pingList = append(pingList, ping)
		} else {
			break
		}

	}
	return pingList, err

}
