package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
	"github.com/heroku/go-getting-started/services"
	"net/http"
	"strconv"
)

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	router := gin.New()
	router.Use(gin.Logger())
	// router.LoadHTMLGlob("templates/*.tmpl.html")
	// router.Static("/static", "static")
	//
	//router.GET("/:name", func(c *gin.Context) {
	//	name := c.Param("name")
	//	c.String(http.StatusOK, "Hello  %s! You are receving data from somewhere on the cloud", name)
	//})
	//router.GET("/status/:status", func(c *gin.Context) {
	//	//status := c.Param("status") // status string
	//
	//
	//})

	router.GET("/node/status/:id", func(c *gin.Context) {

		id, e := strconv.Atoi(c.Param("id"))
		if e != nil {
			c.String(http.StatusBadRequest, "Something went wrong")
		}
		c.String(http.StatusOK, nodeservice.GetNodeLastPingString(id))
	})

	//
	router.POST("/node/status/:status", func(c *gin.Context) {
		status := c.Param("status")
		 res:= nodeservice.UpdateNodeStatusAndSendCommand(status)
		 if res == "OK" {
		 	c.String(http.StatusOK, res)
		 } else {
		 	c.String(http.StatusBadRequest, res)
		}
	} )
	router.POST("/node/command/:command", func(c *gin.Context) {

	})

	router.Run(":" + port)


}
