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
	if os.Getenv("PROFILE") == "LOCAL" {
		username := os.Getenv("DB_USR")
		password := os.Getenv("DB_PWD")
		host := os.Getenv("DB_HOST")
		dbPort := os.Getenv("DB_PORT")
		dbSchema := os.Getenv("DB_SCHEMA")

		connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", username, password, host, dbPort, dbSchema)
		db, err = sql.Open("postgres", connStr)
	} else {

		db, err = sql.Open("postgres", os.Getenv("DATABASE_URL")+"?sslmode=require")
	}
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	log.Println("Connection to Database successful")
}

func GetLastPing(id int) (node.Node, error) {

	ping := node.Node{}
	row := db.QueryRow("select * from node_pings where id = $1 order by ping_time desc", id)
	e := row.Scan(&ping.Id, &ping.Ping, &ping.Status, &ping.Voltage, &ping.Current, &ping.Power)

	return ping, e

}

func UpdateNodeStatus(n node.Node) error {
	_, e := db.Exec("insert into node_pings(id, ping_time, status, voltage, current, power) values ($1, $2, $3, $4, $5, $6)", n.Id, n.Ping, n.Status, n.Voltage, n.Current, n.Power)
	return e
}

func GetNodeIds() ([]int, error) {
	rows, e := db.Query("select distinct(id) from node_pings")
	nodes := make([]int, 0)
	var Id int
	for rows.Next() {
		e := rows.Scan(&Id)
		if e != nil {
			return nodes, e
		}
		nodes = append(nodes, Id)
	}

	return nodes, e

}

func GetLastPingForAllNodes() ([]node.Node, error) {

	pingList := make([]node.Node, 0)
	rows, e := db.Query("with ranked_messages as " +
		"(select id,ping_time,status,voltage,current, power ,rank() over (partition by id order by ping_time desc) as rn " +
		"from node_pings) " +
		"select id,ping_time,status,current,power from ranked_messages where rn = 1")
	if e != nil {
		return pingList, e
	}
	var latestPing node.Node
	for rows.Next() {
		e := rows.Scan(&latestPing.Id, &latestPing.Ping, &latestPing.Status, &latestPing.Voltage, &latestPing.Current, &latestPing.Power)
		if e == nil {
			pingList = append(pingList, latestPing)
		} else {
			break
		}

	}
	return pingList, e

}
