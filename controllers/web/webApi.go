package web

import (
	"strconv"
	"net/http"
	"github.com/heroku/go-getting-started/services"
	"github.com/gin-gonic/gin"
	"encoding/json"
	"github.com/heroku/go-getting-started/models"
)

func GetNodeStatus(c *gin.Context) {
	id, e := strconv.Atoi(c.Param("id"))
	if e != nil {
		c.String(http.StatusBadRequest, "Something went wrong")
		return
	}
	node, e := services.GetNode(id)
	c.JSON(http.StatusOK, node)
}

func GetNodeIds(c *gin.Context) {

	ids, e := services.GetNodeIds()
	if e != nil {
		c.JSON(http.StatusInternalServerError, e)
		return
	}
	c.JSON(http.StatusOK, ids)
}

func SendCommand(c *gin.Context) {
	command := c.Param("action")
	id, e := strconv.Atoi(c.Query("id"))
	if e != nil {
		c.String(http.StatusBadRequest, "Some error")
		return
	}
	e = services.SaveNodeCommand(command, id)
	if e != nil {
		c.String(http.StatusBadRequest, "Something went wrong")
		return
	}
	c.String(http.StatusAccepted, command)

}

func GetStatusString(c *gin.Context) {
	id, e := strconv.Atoi(c.Param("id"))
	if e != nil {
		c.String(http.StatusBadRequest, "Something went wrong")
		return
	}
	c.String(http.StatusOK, services.GetNodeLastPingString(id))
}

func GetLastPingsForAllNodes(c *gin.Context) {
	lastPingsForAllNodes, e := services.GetLastPingsForAllNodes()
	if e != nil {
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	c.JSON(http.StatusOK, lastPingsForAllNodes)
}

func GetLastNPingsForANode(c *gin.Context) {
	id, eP := strconv.Atoi(c.Param("id"))
	lookBackWindow, eQ := strconv.Atoi(c.Query("pageSize"))
	if eP != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	if eQ != nil {
		lookBackWindow = 15
	}
	nodes, e := services.GetLastNPingsForANode(id, lookBackWindow)
	if e != nil {
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	c.JSON(http.StatusOK, nodes)
}

func GetVoltageLimit(c *gin.Context) {
	id, eP := strconv.Atoi(c.Param("id"))
	if eP != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	limit, e := services.GetVoltageLimit(id)
	if e != nil {
		c.JSON(http.StatusInternalServerError, nil)
		return
	}

	c.JSON(http.StatusOK, models.VoltageLimit{limit})
}

func SetVoltageLimit(c *gin.Context) {

	id, eP := strconv.Atoi(c.Param("id"))
	if eP != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	limit := models.VoltageLimit{}
	json.NewDecoder(c.Request.Body).Decode(&limit)
	e := services.SetVoltageLimit(id, limit.Limit)
	if e != nil {
		c.JSON(http.StatusInternalServerError, nil)
		return
	}
	c.JSON(http.StatusOK, nil)

}

func GetHistoryInLastXMinutes(c *gin.Context) {

	var id int
	var interval int
	var err error
	if id, err = strconv.Atoi(c.Param("id")); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	if interval, err = strconv.Atoi(c.Query("interval")); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	if pingList, err := services.GetPingsForANodeInLastXInterval(id, interval); err == nil {
		c.JSON(http.StatusOK, pingList)
		return
	} else {
		c.JSON(http.StatusInternalServerError, err)
	}
}
