package services

import (
	"github.com/heroku/go-getting-started/models/node"
	"github.com/heroku/go-getting-started/repos"
	"strings"
	"strconv"
	"github.com/heroku/go-getting-started/utils"
	"time"
)

func GetNode(id int) (node.New, error) {
	return repos.GetLastPing(id)
}

func UpdateNodeStatus(status string) (*node.New, error) {
	nodeObj := populateNode(status)
	if err := repos.UpdateNodeStatus(nodeObj); err != nil {
		return nil, err
	}
	return &nodeObj, nil
}

func GetCommandForNode(nodeId int) (commandStr string, err error) {
	if command, err := repos.GetLatestCommand(nodeId); err == nil && command.Command != "" {
		err = repos.SetReceived(nodeId)
		commandStr = command.Command
	}
	return commandStr, err

}

/*
"batter voltage | status | power solar | power battery to grid | power grid to battery |  power battery to load | power switch | grid voltage | grid switch" */

func populateNode(statusStr string) node.New {
	split := strings.Split(statusStr, "|")
	id, e := strconv.Atoi(split[0])
	batteryVoltage, e := strconv.ParseFloat(split[1], 64)
	status := bintodec.ToDec(split[2])
	powerSolarInput, e := strconv.ParseFloat(split[3], 64)
	powerBatteryToGrid, e := strconv.ParseFloat(split[4], 64)
	powerGridToBattery, e := strconv.ParseFloat(split[5], 64)
	powerBatteryToLoad, e := strconv.ParseFloat(split[6], 64)
	powerSwitch, e := strconv.Atoi(split[7])
	gridVoltage, e := strconv.ParseFloat(split[8], 64)
	if e != nil {
		return node.New{}
	}

	return node.New{Power: powerSwitch, Ping: time.Now(), Status: status, BatteryVoltage: batteryVoltage, PowerBatteryToLoad: powerBatteryToLoad, PowerGridToBattery: powerGridToBattery, PowerBatteryToGrid: powerBatteryToGrid, Id: id, PowerSolarInput: powerSolarInput, GridVoltage: gridVoltage}

}

func SaveNodeCommand(command string, id int) error {
	e := repos.SaveNodeCommand(command, id)
	if e != nil {
		return e
	}
	return nil
}

func GetNodeIds() ([]int, error) {
	return repos.GetNodeIds()
}

func GetLastPingsForAllNodes() ([]node.New, error) {
	return repos.GetLastPingForAllNodes()
}

func GetLastNPingsForANode(id int, n int) ([]node.New, error) {
	return repos.GetLastNPingsForANode(id, n)
}

func GetPingsForANodeInLastXInterval(id int, interval int) (pingList []node.New, err error) {
	return repos.GetLastPingsForNodeInXInterval(id, interval)
}
