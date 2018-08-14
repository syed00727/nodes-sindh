package services

import (
	"github.com/heroku/go-getting-started/repos"
	"github.com/heroku/go-getting-started/repos/inMemory"
)

func GetVoltageLimit(nodeId int) (float32, error) {
	limit, found := inMemory.GetVoltageLimit(nodeId)
	if found{
		return limit, nil
	}
	return repos.GetVoltageLimit(nodeId)
}

func SetVoltageLimit(nodeId int, voltageLimit float32) error{
	e := repos.SetVoltageLimit(nodeId, voltageLimit)
	if e == nil {
		inMemory.SetVoltageLimit(nodeId, voltageLimit)
	}
	return e
}