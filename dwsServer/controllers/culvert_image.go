package controllers

import (
	"dwsServer/models"
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
)

// CulvertImageController operations for CulvertImage
type CulvertImageController struct {
	beego.Controller
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
// URLMapping ...
func (c *CulvertImageController) URLMapping() {
	c.Mapping("Post", c.Post)
	c.Mapping("GetOne", c.GetOne)
	c.Mapping("GetAll", c.GetAll)
	c.Mapping("Put", c.Put)
	c.Mapping("Delete", c.Delete)
}

// Post ...
// @Title Post
// @Description create CulvertImage
// @Param	body		body 	models.CulvertImage	true		"body for CulvertImage content"
// @Success 201 {int} models.CulvertImage
// @Failure 403 body is empty
// @router / [post]
func (c *CulvertImageController) Post() {
	fmt.Println("P0")
	var v models.CulvertImage
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &v); err == nil {
		fmt.Println("P!")
		low_pic:=strings.Replace(v.LowPic," ","+",-1)
		high_pic:=strings.Replace(v.HighPic," ","+",-1)
		low_pic_body,_:=base64.StdEncoding.DecodeString(low_pic)
		high_pic_body,err1:=base64.StdEncoding.DecodeString(high_pic)
		if err1!=nil{
			fmt.Println("err1")
		}
		fmt.Println(high_pic)

		current:=time.Now().Format(time.RFC3339)
		current=strings.Replace(current,":","A",-1)
		low_file_name:=v.Uploader+"_"+"low"+"_"+current+".jpg"
		high_file_name:=v.Uploader+"_"+"high"+"_"+current+".jpg"
		low_pic_file,err:=os.Create("Pics/"+v.Uploader+"/"+low_file_name)
		high_pic_file,err:=os.Create("Pics/"+v.Uploader+"/"+high_file_name)
		if err!=nil{
			fmt.Println(err.Error())
		}
		_,err=io.Copy(low_pic_file,bytes.NewReader(low_pic_body))
		_,err=io.Copy(high_pic_file,bytes.NewReader(high_pic_body))
		urlDir:=models.GetMD5Hash("./Pics/"+v.Uploader)
		v.LowPic=urlDir+`/`+low_file_name
		v.HighPic=urlDir+`/`+high_file_name
		defer low_pic_file.Close()
		defer high_pic_file.Close()
		if _, err := models.AddCulvertImage(&v); err == nil {
			c.Ctx.Output.SetStatus(201)
			c.Ctx.ResponseWriter.Write([]byte("200"))
		} else {
			fmt.Println(err.Error())
			c.Data["json"] = err.Error()
			c.ServeJSON()
		}
	} else {
		fmt.Println(err.Error())
		c.Data["json"] = err.Error()
		c.ServeJSON()
	}

}

// GetOne ...
// @Title Get One
// @Description get CulvertImage by id
// @Param	id		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.CulvertImage
// @Failure 403 :id is empty
// @router /:id [get]
func (c *CulvertImageController) GetOne() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)
	v, err := models.GetCulvertImageById(id)
	if err != nil {
		c.Data["json"] = err.Error()
	} else {
		c.Data["json"] = v
	}
	c.ServeJSON()
}

// GetAll ...
// @Title Get All
// @Description get CulvertImage
// @Param	query	query	string	false	"Filter. e.g. col1:v1,col2:v2 ..."
// @Param	fields	query	string	false	"Fields returned. e.g. col1,col2 ..."
// @Param	sortby	query	string	false	"Sorted-by fields. e.g. col1,col2 ..."
// @Param	order	query	string	false	"Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ..."
// @Param	limit	query	string	false	"Limit the size of result set. Must be an integer"
// @Param	offset	query	string	false	"Start position of result set. Must be an integer"
// @Success 200 {object} models.CulvertImage
// @Failure 403
// @router / [get]
func (c *CulvertImageController) GetAll() {
	var fields []string
	var sortby []string
	var order []string
	var query = make(map[string]string)
	var limit int64 = 10
	var offset int64

	// fields: col1,col2,entity.col3
	if v := c.GetString("fields"); v != "" {
		fields = strings.Split(v, ",")
	}
	// limit: 10 (default is 10)
	if v, err := c.GetInt64("limit"); err == nil {
		limit = v
	}
	// offset: 0 (default is 0)
	if v, err := c.GetInt64("offset"); err == nil {
		offset = v
	}
	// sortby: col1,col2
	if v := c.GetString("sortby"); v != "" {
		sortby = strings.Split(v, ",")
	}
	// order: desc,asc
	if v := c.GetString("order"); v != "" {
		order = strings.Split(v, ",")
	}
	// query: k:v,k:v
	if v := c.GetString("query"); v != "" {
		for _, cond := range strings.Split(v, ",") {
			kv := strings.SplitN(cond, ":", 2)
			if len(kv) != 2 {
				c.Data["json"] = errors.New("Error: invalid query key/value pair")
				c.ServeJSON()
				return
			}
			k, v := kv[0], kv[1]
			query[k] = v
		}
	}

	l, err := models.GetAllCulvertImage(query, fields, sortby, order, offset, limit)
	if err != nil {
		c.Data["json"] = err.Error()
	} else {
		c.Data["json"] = l
	}
	c.ServeJSON()
}

// Put ...
// @Title Put
// @Description update the CulvertImage
// @Param	id		path 	string	true		"The id you want to update"
// @Param	body		body 	models.CulvertImage	true		"body for CulvertImage content"
// @Success 200 {object} models.CulvertImage
// @Failure 403 :id is not int
// @router /:id [put]
func (c *CulvertImageController) Put() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)
	v := models.CulvertImage{Id: id}
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &v); err == nil {
		if err := models.UpdateCulvertImageById(&v); err == nil {
			c.Data["json"] = "OK"
		} else {
			c.Data["json"] = err.Error()
		}
	} else {
		c.Data["json"] = err.Error()
	}
	c.ServeJSON()
}

// Delete ...
// @Title Delete
// @Description delete the CulvertImage
// @Param	id		path 	string	true		"The id you want to delete"
// @Success 200 {string} delete success!
// @Failure 403 id is empty
// @router /:id [delete]
func (c *CulvertImageController) Delete() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)
	if err := models.DeleteCulvertImage(id); err == nil {
		c.Data["json"] = "OK"
	} else {
		c.Data["json"] = err.Error()
	}
	c.ServeJSON()
}
