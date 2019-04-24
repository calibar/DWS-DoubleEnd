package models

import (
	"errors"
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/astaxie/beego/orm"
)

type BasicImage struct {
	Id          int       `orm:"column(bid);auto"`
	Uploader    string    `orm:"column(Uploader);size(100)"`
	Lat         float64   `orm:"column(lat)" json:"Lat,string"`
	Lon         float64   `orm:"column(lon)" json:"Lon,string"`
	Pic         string    `orm:"column(pic);null"`
	Phototime   time.Time `orm:"column(phototime);type(timestamp);auto_now"`
	Description string    `orm:"column(description);null"`
	Orientation string    `orm:"column(orientation);null"`
}

func (t *BasicImage) TableName() string {
	return "basic_image"
}

func init() {
	orm.RegisterModel(new(BasicImage))
}

// AddBasicImage insert a new BasicImage into database and returns
// last inserted Id on success.
func AddBasicImage(m *BasicImage) (id int64, err error) {
	o := orm.NewOrm()
	id, err = o.Insert(m)
	return
}

// GetBasicImageById retrieves BasicImage by Id. Returns error if
// Id doesn't exist
func GetBasicImageById(id int) (v *BasicImage, err error) {
	o := orm.NewOrm()
	v = &BasicImage{Id: id}
	if err = o.Read(v); err == nil {
		return v, nil
	}
	return nil, err
}

// GetAllBasicImage retrieves all BasicImage matches certain condition. Returns empty list if
// no records exist
func GetAllBasicImage(query map[string]string, fields []string, sortby []string, order []string,
	offset int64, limit int64) (ml []interface{}, err error) {
	o := orm.NewOrm()
	qs := o.QueryTable(new(BasicImage))
	// query k=v
	for k, v := range query {
		// rewrite dot-notation to Object__Attribute
		k = strings.Replace(k, ".", "__", -1)
		if strings.Contains(k, "isnull") {
			qs = qs.Filter(k, (v == "true" || v == "1"))
		} else {
			qs = qs.Filter(k, v)
		}
	}
	// order by:
	var sortFields []string
	if len(sortby) != 0 {
		if len(sortby) == len(order) {
			// 1) for each sort field, there is an associated order
			for i, v := range sortby {
				orderby := ""
				if order[i] == "desc" {
					orderby = "-" + v
				} else if order[i] == "asc" {
					orderby = v
				} else {
					return nil, errors.New("Error: Invalid order. Must be either [asc|desc]")
				}
				sortFields = append(sortFields, orderby)
			}
			qs = qs.OrderBy(sortFields...)
		} else if len(sortby) != len(order) && len(order) == 1 {
			// 2) there is exactly one order, all the sorted fields will be sorted by this order
			for _, v := range sortby {
				orderby := ""
				if order[0] == "desc" {
					orderby = "-" + v
				} else if order[0] == "asc" {
					orderby = v
				} else {
					return nil, errors.New("Error: Invalid order. Must be either [asc|desc]")
				}
				sortFields = append(sortFields, orderby)
			}
		} else if len(sortby) != len(order) && len(order) != 1 {
			return nil, errors.New("Error: 'sortby', 'order' sizes mismatch or 'order' size is not 1")
		}
	} else {
		if len(order) != 0 {
			return nil, errors.New("Error: unused 'order' fields")
		}
	}

	var l []BasicImage
	qs = qs.OrderBy(sortFields...)
	if _, err = qs.Limit(limit, offset).All(&l, fields...); err == nil {
		if len(fields) == 0 {
			for _, v := range l {
				ml = append(ml, v)
			}
		} else {
			// trim unused fields
			for _, v := range l {
				m := make(map[string]interface{})
				val := reflect.ValueOf(v)
				for _, fname := range fields {
					m[fname] = val.FieldByName(fname).Interface()
				}
				ml = append(ml, m)
			}
		}
		return ml, nil
	}
	return nil, err
}

// UpdateBasicImage updates BasicImage by Id and returns error if
// the record to be updated doesn't exist
func UpdateBasicImageById(m *BasicImage) (err error) {
	o := orm.NewOrm()
	v := BasicImage{Id: m.Id}
	// ascertain id exists in the database
	if err = o.Read(&v); err == nil {
		var num int64
		if num, err = o.Update(m); err == nil {
			fmt.Println("Number of records updated in database:", num)
		}
	}
	return
}

// DeleteBasicImage deletes BasicImage by Id and returns error if
// the record to be deleted doesn't exist
func DeleteBasicImage(id int) (err error) {
	o := orm.NewOrm()
	v := BasicImage{Id: id}
	// ascertain id exists in the database
	if err = o.Read(&v); err == nil {
		var num int64
		if num, err = o.Delete(&BasicImage{Id: id}); err == nil {
			fmt.Println("Number of records deleted in database:", num)
		}
	}
	return
}
