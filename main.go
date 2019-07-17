package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
	"net/http"
	"nodes-sindh/github.com/heroku/go-getting-started/controllers/module"
	"nodes-sindh/github.com/heroku/go-getting-started/controllers/web"
	"nodes-sindh/github.com/heroku/go-getting-started/controllers/webSocket"
	"time"
)

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	router.Use(cors.New(config))

	router.Use(gin.Logger())
	router.Use(static.Serve("/", static.LocalFile(".", true)))

	//APIs for module
	router.POST("/node/status/:status", module.PostNodeStatus)

	//web facing APIs
	api := router.Group("/api")
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

	log.Println(time.Now().Local().Truncate(60 * time.Minute))
	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "Thanks for asking about my health, Recovered from many serious blows today, How are you ?")
	})
	router.Run(":" + port)

}
