package nodeservice

import (
	"github.com/heroku/go-getting-started/models"
	"github.com/heroku/go-getting-started/mock"
)

func GetNode(id int) node.Node {
	return mock.GetStatusFromDb()
}

func GetNodeLastSeen(id int) string {
	return ""
}

func GetFormattedStatusString(id int) string {
	return mock.GetStatusFromDb().GetStatusString()
}
