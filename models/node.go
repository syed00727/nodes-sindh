package node

import (
	"fmt"

	"github.com/heroku/go-getting-started/utils"
)

type Node struct {
	Power   int
	Status  byte
	Voltage float32
	Current float32
	Id      int
}

func (n Node) GetStatus() string {
	return bintodec.ToBin(n.Status)
}

func (n Node) GetStatusString() string {
	return fmt.Sprintf("%d|%s|%f|%f|%d", n.Power, n.GetStatus(), n.Voltage, n.Current, n.Id)
}
