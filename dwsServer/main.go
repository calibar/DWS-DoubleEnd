package main

import (
	"dwsServer/models"
	_ "dwsServer/routers"
	"github.com/astaxie/beego/plugins/cors"
	"io/ioutil"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func init() {
	orm.RegisterDataBase("default", "mysql", "root:lmx1993917@tcp(127.0.0.1:3306)/culvert")

}
func listAll(path string) {
	files, _ := ioutil.ReadDir(path)
	for _, fi := range files {
		if fi.IsDir() {
			//listAll(path + "/" + fi.Name())
			dir:=path + "/" + fi.Name()
			urldir:=models.GetMD5Hash(dir)
			beego.SetStaticPath(urldir,dir)
			println(urldir)
		} else {
			println(path + "/" + fi.Name())
		}
	}
}
func main() {
	listAll("./Pics")
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	/*beego.SetStaticPath("/image","./Pics")
	beego.SetStaticPath("/test","./Pics/admin")*/
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:    []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Content-Type"},
		ExposeHeaders:   []string{"Content-Length", "Access-Control-Allow-Origin"},
	}))
	beego.Run()
}

