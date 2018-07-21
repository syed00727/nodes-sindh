package main

import (
	"log"
	"net/http"
	"os"
	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
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

	router.GET("/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.String(http.StatusOK, "Hello  %s! You are receving data from somewhere on the cloud", name)
	})

	router.Run(":" + port)
}
