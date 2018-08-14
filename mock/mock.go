package mock

import (
	"github.com/heroku/go-getting-started/models"
	"time"
)

func GetStatusFromDb() models.Node {
	return models.Node{1, time.Now(),48, 12.4, 0.3, 12}
}

func GetFormattedNodeStatus() models.Node {
	return models.Node{1, time.Now(),48, 12.4, 0.3, 12}
}
