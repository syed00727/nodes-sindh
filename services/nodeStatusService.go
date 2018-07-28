package nodeservice

import (
	"github.com/heroku/go-getting-started/models"
	"github.com/heroku/go-getting-started/repos"
	"strings"
	"strconv"
	"github.com/heroku/go-getting-started/utils"
	"time"
)

func GetNode(id int) (node.Node, error) {
	return repos.GetLastPing(id)
}

func GetNodeLastPingString(id int) string {
	ping, _ := repos.GetLastPing(id)
	return ping.GetStatusString()
}

func UpdateNodeStatusAndSendCommand(status string) (string, error) {
	nodeObj := populateNodeObj(status)
	err := repos.UpdateNodeStatus(nodeObj)
	if err != nil {
		return "ILL", err
	}
	command, e := repos.GetLatestCommand(nodeObj.Id)
	if e == nil {
		e = repos.SetReceived(nodeObj.Id)
	}
	return command.Command, e
}

func populateNodeObj(statusStr string) node.Node {
	split := strings.Split(statusStr, "|")
	power, ep := strconv.Atoi(split[0])
	status := bintodec.ToDec(split[1])
	voltage, ev := strconv.ParseFloat(split[2], 64)
	current, ec := strconv.ParseFloat(split[3], 64)
	id, ei := strconv.Atoi(split[4])
	if ep != nil || ev != nil || ec != nil || ei != nil {
		return node.Node{}
	}
	return node.Node{Power: power, Ping: time.Now(), Status: status, Voltage: voltage, Current: current, Id: id}

}

func SaveNodeCommand(command string, id int) error {
	e := repos.SaveNodeCommand(command, id)
	if e != nil {
		return e
	}
	return nil
}

func GetNodeIds() ([]int, error){
	return  repos.GetNodeIds()
}

