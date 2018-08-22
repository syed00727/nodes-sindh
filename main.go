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
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
)

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	router := gin.Default()
	router.Use(cors.Default())

	router.Use(gin.Logger())
	router.Use(static.Serve("/", static.LocalFile(".", true)))
	//router.LoadHTMLFiles("index.html")
	//router.Static("/static", "./static")
	//
	//router.GET("/", func(context *gin.Context) {
	//	context.HTML(http.StatusOK, "index.html", gin.H{})
	//})

	//APIs for module
	router.POST("/node/status/:status", module.PostNodeStatus)

	//web facing APIs
	api:= router.Group("/api")
	{
		api.GET("node/voltage/limit/:id", web.GetVoltageLimit)
		api.POST("node/voltage/limit/:id", web.SetVoltageLimit)
		api.POST("/node/command/:action", web.SendCommand)
		api.GET("/node/history/:id", web.GetLastNPingsForANode)
		api.GET("/node/lookback/:id", web.GetHistoryInLastXMinutes)
		api.GET("/node/status/:id", web.GetNodeStatus)
		api.GET("/nodes", web.GetNodeIds)
		api.GET("/nodes/all", web.GetLastPingsForAllNodes)
	}
	//web socket handshake
	router.GET("ws", webSocket.WsHandshake)


	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "Thanks for asking about my health, Recovered from many serious blows today, How are you ?")
	})
	router.Run(":" + port)

}
