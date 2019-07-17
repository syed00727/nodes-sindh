package repos

import (
	"nodes-sindh/github.com/heroku/go-getting-started/models"
	"time"
)

func SaveNodeCommand(command string, id int) error {
	_, e := db.Exec("insert into node_commands(id,command_time,command,received) values ($1,$2,$3,$4)", id, time.Now(), command, 0)
	if e != nil {
		return e
	}
	return nil
}

func SetReceived(id int) error {
	_, e := db.Exec("update node_commands set received = 1 where id = $1 and received = 0", id)
	return e
}

func GetLatestCommand(id int) (models.Command, error) {
	command := models.Command{}
	row := db.QueryRow("select * from node_commands where id = $1 and received = 0 order by command_time desc limit 1", id)
	e := row.Scan(&command.Id, &command.CommandTime, &command.Command, &command.Received)
	return command, e
}
