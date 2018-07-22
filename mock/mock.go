package mock

import (
	"github.com/heroku/go-getting-started/models"
)

func GetStatusFromDb() node.Node {
	return node.Node{1, 48, 12.4, 0.3, 12}
}

func GetFormattedNodeStatus() node.Node {
	return node.Node{1, 48, 12.4, 0.3, 12}
}
