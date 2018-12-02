package inMemory

import (
	"github.com/patrickmn/go-cache"
	"time"
)

var c *cache.Cache

func init() {
	c = cache.New(5*time.Minute, 10*time.Minute)
}

func GetVoltageLimit(nodeId int) (float64, bool) {

	limit, found := c.Get("limit" + string(nodeId))
	if found {
		return limit.(float64), found
	}
	return 0.0, found

}

func SetVoltageLimit(nodeId int, limit float64) {
	c.Set("limit"+string(nodeId), limit, cache.NoExpiration)

}
