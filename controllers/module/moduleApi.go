package module

import (
	"net/http"
	"github.com/heroku/go-getting-started/services"
	"github.com/gin-gonic/gin"
	"github.com/heroku/go-getting-started/controllers/webSocket"
)

func PostNodeStatus(c *gin.Context) {
	status := c.Param("status")
	node, e := nodeservice.UpdateNodeStatus(status)
	if e != nil {
		c.String(http.StatusBadRequest, "")
	} else {

		command, e := nodeservice.GetCommandForNode((*node).Id)
		if e != nil {
			c.String(http.StatusAccepted, command)
		}
		webSocketConnection := webSocket.GetWebSocketConnection()
		if webSocketConnection != nil {
			webSocketConnection.WriteJSON(*node)
		}
	}
}
