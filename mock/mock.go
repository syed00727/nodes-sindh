package mock

import (
	"github.com/heroku/go-getting-started/models"
	"time"
)

func GetStatusFromDb() models.New {
	return models.New{1, time.Now(),48, 12.4, 0.3, 12}
}

func GetFormattedNodeStatus() models.New {
	return models.New{1, time.Now(),48, 12.4, 0.3, 12}
}
