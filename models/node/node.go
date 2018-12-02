package node

import (
	"github.com/heroku/go-getting-started/utils"
	"time"
	"database/sql"
)

type New struct {
	Id                 int
	Switch1            int
	Switch2            int
	Ping               time.Time
	Status             byte
	BatteryVoltage     float64
	Limit1             sql.NullFloat64
	Limit2             sql.NullFloat64
	Limit3             sql.NullFloat64
	Limit4             sql.NullFloat64
	PowerSolarInput    float64
	PowerBatteryToGrid float64
	PowerGridToBattery float64
	PowerBatteryToLoad float64
	GridVoltage        float64
}

func (n New) GetStatus() string {
	return bintodec.ToBin(n.Status)
}

