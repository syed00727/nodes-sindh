package configs

import (
	"database/sql"
	_ "github.com/lib/pq"
	"os"
	"fmt"
)

var db *sql.DB

func init() {
	//
	var err error
	if (os.Getenv("PROFILE") == "LOCAL") {
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

	fmt.Println("you are connected to the database")
}
