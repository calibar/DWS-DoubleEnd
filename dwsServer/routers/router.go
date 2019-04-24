// @APIVersion 1.0.0
// @Title beego Test API
// @Description beego has a very cool tools to autogenerate documents for your API
// @Contact astaxie@gmail.com
// @TermsOfServiceUrl http://beego.me/
// @License Apache 2.0
// @LicenseUrl http://www.apache.org/licenses/LICENSE-2.0.html
package routers

import (
	"dwsServer/controllers"

	"github.com/astaxie/beego"
)

func init() {
	ns := beego.NewNamespace("/v1",

		beego.NSNamespace("/basic_image",
			beego.NSInclude(
				&controllers.BasicImageController{},
			),
		),

		beego.NSNamespace("/basic_incomplete",
			beego.NSInclude(
				&controllers.BasicIncompleteController{},
			),
		),

		beego.NSNamespace("/culvert_image",
			beego.NSInclude(
				&controllers.CulvertImageController{},
			),
		),

		beego.NSNamespace("/culvert_incomplete",
			beego.NSInclude(
				&controllers.CulvertIncompleteController{},
			),
		),

		beego.NSNamespace("/debris_jams",
			beego.NSInclude(
				&controllers.DebrisJamsController{},
			),
		),

		beego.NSNamespace("/debris_jams_incomplete",
			beego.NSInclude(
				&controllers.DebrisJamsIncompleteController{},
			),
		),

		beego.NSNamespace("/streamflow",
			beego.NSInclude(
				&controllers.StreamflowController{},
			),
		),

		beego.NSNamespace("/streamflow_incomplete",
			beego.NSInclude(
				&controllers.StreamflowIncompleteController{},
			),
		),

		beego.NSNamespace("/user",
			beego.NSInclude(
				&controllers.UserController{},
			),
		),
	)
	beego.AddNamespace(ns)
}
