package webSocket

import (
	"net/http"
	"log"
	"github.com/gorilla/websocket"
	"github.com/gin-gonic/gin"
)

var upGrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var webSocketConns = make([]*websocket.Conn, 0)
var webSocketConn *websocket.Conn

func WsHandshake(c *gin.Context) {
	WsHandler(c.Writer, c.Request)
}

func WsHandler(w http.ResponseWriter, r *http.Request) {

	var err error
	webSocketConn, err := upGrader.Upgrade(w, r, nil)
	webSocketConns = append(webSocketConns, webSocketConn)
	if err != nil {
		log.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}
}

func GetWebSocketConnection() []*websocket.Conn {
	return webSocketConns
}
