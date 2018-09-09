package node

import (
	"github.com/heroku/go-getting-started/utils"
	"time"
	"database/sql"
)

type New struct {
	Id                 int
	Power              int
	Ping               time.Time
	Status             byte
	BatteryVoltage     float64
	VoltageLimit       sql.NullFloat64
	PowerSolarInput    float64
	PowerBatteryToGrid float64
	PowerGridToBattery float64
	PowerBatteryToLoad float64
	GridVoltage        float64
}

func (n New) GetStatus() string {
	return bintodec.ToBin(n.Status)
}

