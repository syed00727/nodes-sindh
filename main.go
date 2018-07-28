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

	router.LoadHTMLFiles("index.html")
	router.Static("/static", "./static")

	router.GET("/", func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.html", gin.H{})
	})

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
		res, e := nodeservice.UpdateNodeStatusAndSendCommand(status)
		if e != nil {
			c.String(http.StatusOK, res)
		} else {
			c.String(http.StatusBadRequest, res)
		}
	})
	router.POST("/node/command/:action", func(c *gin.Context) {
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

	})

	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "I'm good, How are you?")
	})

	router.GET("api/nodes", func(c *gin.Context) {

		ids, e := nodeservice.GetNodeIds()
		if e != nil {
			c.JSON(http.StatusInternalServerError, e)
		}
		c.JSON(http.StatusOK, ids)
	})

	router.GET("api/node/:id", func(c *gin.Context) {
		id, e := strconv.Atoi(c.Param("id"))
		if e != nil {
			c.String(http.StatusBadRequest, "Something went wrong")
		}
		node, e := nodeservice.GetNode(id)
		c.JSON(http.StatusOK, node)
	})

	router.Run(":" + port)

}
