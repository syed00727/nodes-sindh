package web

import (
	"strconv"
	"net/http"
	"github.com/heroku/go-getting-started/services"
	"github.com/gin-gonic/gin"
)

func GetNodeStatus(c *gin.Context) {
	id, e := strconv.Atoi(c.Param("id"))
	if e != nil {
		c.String(http.StatusBadRequest, "Something went wrong")
	}
	node, e := nodeservice.GetNode(id)
	c.JSON(http.StatusOK, node)
}

func GetNodeIds(c *gin.Context) {

	ids, e := nodeservice.GetNodeIds()
	if e != nil {
		c.JSON(http.StatusInternalServerError, e)
	}
	c.JSON(http.StatusOK, ids)
}

func SendCommand(c *gin.Context) {
	command := c.Param("action")
	id, e := strconv.Atoi(c.Query("id"))
	if e != nil {
		c.String(http.StatusBadRequest, "Some error")
	}
	e = nodeservice.SaveNodeCommand(command, id)
	if e != nil {
		c.String(http.StatusBadRequest, "Something went wrong")
	}
	c.String(http.StatusAccepted, command)

}

func GetStatusString(c *gin.Context) {
	id, e := strconv.Atoi(c.Param("id"))
	if e != nil {
		c.String(http.StatusBadRequest, "Something went wrong")
	}
	c.String(http.StatusOK, nodeservice.GetNodeLastPingString(id))
}

func GetLastPingsForAllNodes(c *gin.Context) {
	lastPingsForAllNodes, e := nodeservice.GetLastPingsForAllNodes()
	if e != nil {
		c.JSON(http.StatusInternalServerError, nil)
	}
	c.JSON(http.StatusOK, lastPingsForAllNodes)
}
