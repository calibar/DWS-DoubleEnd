package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:UserController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:UserController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:UserController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:UserController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:UserController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:UserController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:UserController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:UserController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["DwsPro/controllers:UserController"] = append(beego.GlobalControllerRouter["DwsPro/controllers:UserController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

}
