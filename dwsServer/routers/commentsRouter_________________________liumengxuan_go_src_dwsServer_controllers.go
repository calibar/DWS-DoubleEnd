package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicImageController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:BasicIncompleteController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertImageController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:CulvertIncompleteController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:DebrisJamsIncompleteController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:StreamflowIncompleteController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:UserController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:UserController"],
		beego.ControllerComments{
			Method: "Post",
			Router: `/`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:UserController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:UserController"],
		beego.ControllerComments{
			Method: "GetAll",
			Router: `/`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:UserController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:UserController"],
		beego.ControllerComments{
			Method: "GetOne",
			Router: `/:id`,
			AllowHTTPMethods: []string{"get"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:UserController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:UserController"],
		beego.ControllerComments{
			Method: "Put",
			Router: `/:id`,
			AllowHTTPMethods: []string{"put"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["dwsServer/controllers:UserController"] = append(beego.GlobalControllerRouter["dwsServer/controllers:UserController"],
		beego.ControllerComments{
			Method: "Delete",
			Router: `/:id`,
			AllowHTTPMethods: []string{"delete"},
			MethodParams: param.Make(),
			Params: nil})

}
