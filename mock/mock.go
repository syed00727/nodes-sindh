package mock

import (
	"github.com/heroku/go-getting-started/models"
	"time"
)

func GetStatusFromDb() node.Node {
	return node.Node{1, time.Now(),48, 12.4, 0.3, 12}
}

func GetFormattedNodeStatus() node.Node {
	return node.Node{1, time.Now(),48, 12.4, 0.3, 12}
}
