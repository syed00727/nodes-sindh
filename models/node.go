package node

import (
	"fmt"

	"github.com/heroku/go-getting-started/utils"
	"time"
)

type Node struct {
	Power   int
	Ping time.Time
	Status  byte
	Voltage float64
	Current float64
	Id      int
}

func (n Node) GetStatus() string {
	return bintodec.ToBin(n.Status)
}

func (n Node) GetStatusString() string {
	return fmt.Sprintf("%d|%s|%f|%f|%d", n.Power, n.GetStatus(), n.Voltage, n.Current, n.Id)
}
