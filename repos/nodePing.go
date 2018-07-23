package repos

import (
	"database/sql"
	"os"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/heroku/go-getting-started/models"
	"time"
)

var db *sql.DB

func init() {
	//
	//username := os.Getenv("DB_USR")
	//password := os.Getenv("DB_PWD")
	//host := os.Getenv("DB_HOST")
	//dbPort := os.Getenv("DB_PORT")
	//dbSchema := os.Getenv("DB_SCHEMA")
	//
	//connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", username, password, host, dbPort, dbSchema)

	var err error
	//db, err = sql.Open("postgres", connStr)
	db, err = sql.Open("postgres", os.Getenv("DATABASE_URL")+"?sslmode=require")
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("you are connected to the database")

}

func GetLastPing(id int) node.Node {

	ping := node.Node{}
	row := db.QueryRow("select * from node_pings where id = $1 order by ping_time desc", id)
	e := row.Scan(&ping.Id, &ping.Ping, &ping.Status, &ping.Voltage, &ping.Current, &ping.Power)
	if e != nil {
		return ping
	}

	return ping

}

func UpdateNodeStatus(n node.Node) error {
	_, e := db.Exec("insert into node_pings(id, ping_time, status, voltage, current, power) values ($1, $2, $3, $4, $5, $6)", n.Id, n.Ping, n.Status, n.Voltage, n.Current, n.Power)
	if e != nil {
		return e
	}
	return nil
}

func SaveNodeCommand(command string, id int) error {
	_, e := db.Exec("insert into node_commands(id,command_time,command,received) values ($1,$2,$3,$4)", id, time.Now(), command, 0)
	if e != nil {
		return e
	}
	return nil
}
