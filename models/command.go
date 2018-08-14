package models

import "time"

type Command struct {
	Id int
	CommandTime time.Time
	Command string
	Received int
}
