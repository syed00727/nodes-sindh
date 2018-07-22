package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
	"github.com/heroku/go-getting-started/services"
	"net/http"
)

func processPinStatus(update string) {

}

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

	router.GET("/status/node/:id", func(c *gin.Context) {

		c.String(http.StatusOK, nodeservice.GetFormattedStatusString(5))
	})
	router.Run(":" + port)
}
