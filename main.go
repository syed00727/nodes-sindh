package main

import (
	"log"
	"net/http"
	// "os"
	"fmt"

	// "github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
)

func handler(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])

}

func main() {


	http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
	// port := os.Getenv("PORT")

	// if port == "" {
	// 	log.Fatal("$PORT must be set")
	// }

	// router := gin.New()
	// router.Use(gin.Logger())
	// router.LoadHTMLGlob("templates/*.tmpl.html")
	// router.Static("/static", "static")

	// router.GET("/", func(c *gin.Context) {
	// 	c.HTML(http.StatusOK, "index.tmpl.html", nil)
	// })

	// router.Run(":" + port)
}
