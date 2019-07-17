package services

import (
	"database/sql"
	"nodes-sindh/github.com/heroku/go-getting-started/models/node"
	"nodes-sindh/github.com/heroku/go-getting-started/repos"
	bintodec "nodes-sindh/github.com/heroku/go-getting-started/utils"
	"strconv"
	"strings"
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
"battery voltage | status | power solar | power battery to grid | power grid to battery |  power battery to load | grid voltage | switch_1 |  switch_2 | load_switch_1 | load_switch_2 | load_switch_3 | load_switch_4 " */

func populateNode(statusStr string) node.New {
	split := strings.Split(statusStr, "|")
	id, e := strconv.Atoi(split[0])
	batteryVoltage, e := strconv.ParseFloat(split[1], 64)
	status := bintodec.ToDec(split[2])
	powerSolarInput, e := strconv.ParseFloat(split[3], 64)
	powerBatteryToGrid, e := strconv.ParseFloat(split[4], 64)
	powerGridToBattery, e := strconv.ParseFloat(split[5], 64)
	powerBatteryToLoad, e := strconv.ParseFloat(split[6], 64)
	gridVoltage, e := strconv.ParseFloat(split[7], 64)
	switch1, e := strconv.Atoi(split[8])
	switch2, e := strconv.Atoi(split[9])
	loadSwitch1, e := strconv.Atoi(split[10])
	loadSwitch2, e := strconv.Atoi(split[11])
	loadSwitch3, e := strconv.Atoi(split[12])
	loadSwitch4, e := strconv.Atoi(split[13])
	limit1, limit2, e := repos.GetVoltageLimit(id)
	var limit1SqlNF64 sql.NullFloat64
	var limit2SqlNF64 sql.NullFloat64
	_ = limit1SqlNF64.Scan(limit1)
	_ = limit2SqlNF64.Scan(limit2)
	if e != nil {
		return node.New{}
	}

	return node.New{Switch1: switch1, Ping: time.Now(), Status: status, BatteryVoltage: batteryVoltage, PowerBatteryToLoad: powerBatteryToLoad, PowerGridToBattery: powerGridToBattery, PowerBatteryToGrid: powerBatteryToGrid, Id: id, PowerSolarInput: powerSolarInput, GridVoltage: gridVoltage, Switch2: switch2, LoadSwitch1: loadSwitch1, LoadSwitch2: loadSwitch2, LoadSwitch3: loadSwitch3, LoadSwitch4: loadSwitch4, Limit1: limit1SqlNF64, Limit2:limit2SqlNF64}

}

func SaveNodeCommand(command string, id int) error {
	e := repos.SaveNodeCommand(command, id)
	if e != nil {
		return e
	}
	split := strings.Split(command, "|")
	limit1, e := strconv.ParseFloat(split[2], 64)
	limit2, e := strconv.ParseFloat(split[3], 64)
	limit3, e := strconv.ParseFloat(split[4], 64)
	limit4, e := strconv.ParseFloat(split[5], 64)
	repos.SetVoltageLimit(id, limit1, limit2, limit3, limit4)
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
