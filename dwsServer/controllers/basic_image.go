package controllers

import (
	"bytes"
	"dwsServer/models"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
)

// BasicImageController operations for BasicImage
type BasicImageController struct {
	beego.Controller
}

// URLMapping ...
func (c *BasicImageController) URLMapping() {
	c.Mapping("Post", c.Post)
	c.Mapping("GetOne", c.GetOne)
	c.Mapping("GetAll", c.GetAll)
	c.Mapping("Put", c.Put)
	c.Mapping("Delete", c.Delete)
}

// Post ...
// @Title Post
// @Description create BasicImage
// @Param	body		body 	models.BasicImage	true		"body for BasicImage content"
// @Success 201 {int} models.BasicImage
// @Failure 403 body is empty
// @router / [post]
func (c *BasicImageController) Post() {
	fmt.Println("hello post")
	var v models.BasicImage
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &v); err == nil {
		fmt.Println("hello")
		pic:=strings.Replace(v.Pic," ","+",-1)
		pic_body,_:=base64.StdEncoding.DecodeString(pic)
		current:=time.Now().Format(time.RFC3339)
		current=strings.Replace(current,":","A",-1)
		file_name:=v.Uploader+"_"+"basic"+"_"+current+".jpg"
		pic_file,err:=os.Create("Pics\\"+v.Uploader+"\\"+file_name)
		if err!=nil{
			fmt.Println(err)
		}
		_,err=io.Copy(pic_file,bytes.NewReader(pic_body))
		urlDir:=models.GetMD5Hash("./Pics/"+v.Uploader)
		v.Pic=urlDir+`/`+file_name
		defer pic_file.Close()
		if _, err := models.AddBasicImage(&v); err == nil {
			c.Ctx.Output.SetStatus(201)
			c.Ctx.ResponseWriter.Write([]byte("200"))
		} else {
			c.Data["json"] = err.Error()
			c.ServeJSON()
		}
	} else {
		c.Data["json"] = err.Error()
		fmt.Println(
			err)
		c.ServeJSON()
	}

}

// GetOne ...
// @Title Get One
// @Description get BasicImage by id
// @Param	id		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.BasicImage
// @Failure 403 :id is empty
// @router /:id [get]
func (c *BasicImageController) GetOne() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)
	v, err := models.GetBasicImageById(id)
	if err != nil {
		c.Data["json"] = err.Error()
	} else {
		c.Data["json"] = v
	}
	c.ServeJSON()
}

// GetAll ...
// @Title Get All
// @Description get BasicImage
// @Param	query	query	string	false	"Filter. e.g. col1:v1,col2:v2 ..."
// @Param	fields	query	string	false	"Fields returned. e.g. col1,col2 ..."
// @Param	sortby	query	string	false	"Sorted-by fields. e.g. col1,col2 ..."
// @Param	order	query	string	false	"Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ..."
// @Param	limit	query	string	false	"Limit the size of result set. Must be an integer"
// @Param	offset	query	string	false	"Start position of result set. Must be an integer"
// @Success 200 {object} models.BasicImage
// @Failure 403
// @router / [get]
func (c *BasicImageController) GetAll() {
	var fields []string
	var sortby []string
	var order []string
	var query = make(map[string]string)
	var limit int64 = 10
	var offset int64
	fmt.Println("hello")
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

	l, err := models.GetAllBasicImage(query, fields, sortby, order, offset, limit)
	if err != nil {
		c.Data["json"] = err.Error()
	} else {
		c.Data["json"] = l
	}
	c.ServeJSON()
}

// Put ...
// @Title Put
// @Description update the BasicImage
// @Param	id		path 	string	true		"The id you want to update"
// @Param	body		body 	models.BasicImage	true		"body for BasicImage content"
// @Success 200 {object} models.BasicImage
// @Failure 403 :id is not int
// @router /:id [put]
func (c *BasicImageController) Put() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)
	v := models.BasicImage{Id: id}
	if err := json.Unmarshal(c.Ctx.Input.RequestBody, &v); err == nil {
		if err := models.UpdateBasicImageById(&v); err == nil {
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
// @Description delete the BasicImage
// @Param	id		path 	string	true		"The id you want to delete"
// @Success 200 {string} delete success!
// @Failure 403 id is empty
// @router /:id [delete]
func (c *BasicImageController) Delete() {
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.Atoi(idStr)
	if err := models.DeleteBasicImage(id); err == nil {
		c.Data["json"] = "OK"
	} else {
		c.Data["json"] = err.Error()
	}
	c.ServeJSON()
}
