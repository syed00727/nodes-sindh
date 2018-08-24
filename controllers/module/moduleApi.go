package module

import (
	"net/http"
	"github.com/heroku/go-getting-started/services"
	"github.com/gin-gonic/gin"
	"github.com/heroku/go-getting-started/controllers/webSocket"
)

func PostNodeStatus(c *gin.Context) {
	status := c.Param("status")
	node, e := services.UpdateNodeStatus(status)
	if e != nil {
		c.JSON(http.StatusBadRequest, e)
	} else {

		command, e := services.GetCommandForNode((*node).Id)
		if e != nil {
			c.String(http.StatusInternalServerError, command)
		}
		webSocketConnection := webSocket.GetWebSocketConnection()
		if webSocketConnection != nil {
			webSocketConnection.WriteJSON(*node)
		}
		c.String(http.StatusAccepted, command)
	}
}
