package services

import (
	"github.com/heroku/go-getting-started/models"
	"github.com/heroku/go-getting-started/repos"
	"strings"
	"strconv"
	"github.com/heroku/go-getting-started/utils"
	"time"
)

func GetNode(id int) (models.Node, error) {
	return repos.GetLastPing(id)
}

func GetNodeLastPingString(id int) string {
	ping, _ := repos.GetLastPing(id)
	return ping.GetStatusString()
}

func UpdateNodeStatus(status string) (*models.Node, error) {
	nodeObj := populateNodeObj(status)
	err := repos.UpdateNodeStatus(nodeObj)
	if err != nil {
		return nil, err
	}
	return &nodeObj, nil
}

func GetCommandForNode(nodeId int) (string, error) {
	command, e := repos.GetLatestCommand(nodeId)

	if e == nil && command.Command != "" {
		e = repos.SetReceived(nodeId)
	}
	// to make sure not to propagate error if there's no command.
	// finding no command is quite a valid case
	if command.Command == "" {
		return "", nil
	}
	return command.Command, e
}

func populateNodeObj(statusStr string) models.Node {
	split := strings.Split(statusStr, "|")
	power, ep := strconv.Atoi(split[0])
	status := bintodec.ToDec(split[1])
	voltage, ev := strconv.ParseFloat(split[2], 64)
	current, ec := strconv.ParseFloat(split[3], 64)
	id, ei := strconv.Atoi(split[4])
	if ep != nil || ev != nil || ec != nil || ei != nil {
		return models.Node{}
	}
	return models.Node{Power: power, Ping: time.Now(), Status: status, Voltage: voltage, Current: current, Id: id}

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

func GetLastPingsForAllNodes() ([]models.Node, error) {
	return repos.GetLastPingForAllNodes()
}

func GetLastNPingsForANode(id int, n int) ([]models.Node, error) {
	return repos.GetLastNPingsForANode(id,n)
}