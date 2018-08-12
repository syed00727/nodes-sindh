package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
	"net/http"
	"github.com/heroku/go-getting-started/controllers/web"
	"github.com/heroku/go-getting-started/controllers/module"
	"github.com/heroku/go-getting-started/controllers/webSocket"
)

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.LoadHTMLFiles("index.html")
	router.Static("/static", "./static")

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", gin.H{})
	})

	//APIs for module
	router.POST("/node/status/:status", module.PostNodeStatus)

	//web facing APIs
	api:= router.Group("/api")
	{
		api.POST("/node/command/:action", web.SendCommand)
		api.GET("/node/history/:id", web.GetLastNPingsForANode)
		api.GET("/node/status/:id", web.GetNodeStatus)
		api.GET("/nodes", web.GetNodeIds)
		api.GET("/nodes/all", web.GetLastPingsForAllNodes)
	}
	//web socket handshake
	router.GET("ws", webSocket.WsHandshake)


	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "Thanks for asking about my health, I'm fine, How are you ?")
	})

	router.Run(":" + port)

}
