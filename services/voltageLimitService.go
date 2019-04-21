package services

import (
	"github.com/heroku/go-getting-started/repos"
	"github.com/heroku/go-getting-started/repos/inMemory"
)

func GetVoltageLimit(nodeId int) (float64, float64, error) {
	limit, found := inMemory.GetVoltageLimit(nodeId)
	if found{
		// api will doesnot return limit 2
		return limit, 0.0, nil
	}
	return repos.GetVoltageLimit(nodeId)
}

func SetVoltageLimit(nodeId int, limit_1 float64, limit_2 float64, limit_3 float64, limit_4 float64) error{
	e := repos.SetVoltageLimit(nodeId, limit_1, limit_2, limit_3, limit_4)
	if e == nil {
		inMemory.SetVoltageLimit(nodeId, limit_1)
	}
	return e
}