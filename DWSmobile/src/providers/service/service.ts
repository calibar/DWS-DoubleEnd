import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiProvider} from '../api/api'
import { text } from '@angular/core/src/render3/instructions';
import {CouvertInfoModel,BasicInfoModel,StreamflowInfoModel,DebrisjamsInfoModel} from '../../models/models'

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  url="http://159.89.127.33:443/v1/"
  /*urlAndroid="http://10.0.2.2:9000/"*/
  urlAndroid="http://167.99.185.11:9005/"
  constructor(public http: HttpClient,public api:ApiProvider) {
    console.log('Hello ServiceProvider Provider');
  }
  signup(username:string,pwd:string){
   var params=JSON.stringify({
      Username:username,
      Pwdhash:pwd
    })
   let seq=this.http.post(this.url+'user',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}, responseType:'text'})
   return seq;
  }
  login(username:string,pwd:string){
    const params = new HttpParams()
    .append("verify", username+"|"+pwd)
    let seq = this.http.get(this.url+'user', { responseType: 'text' ,params:params});
    return seq;
  }
  signupAndroid(username:string,pwd:string){
    const params = new HttpParams()
    .append("username", username)
    .append("pwd", pwd);
    console.log(params.toString())
   let seq=this.http.post(this.urlAndroid+'login',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
  loginAndroid(username:string,pwd:string){
    const params = new HttpParams()
    .append("username", username)
    .append("pwd", pwd);
    let seq = this.http.get(this.urlAndroid+'login', { responseType: 'json' ,params:params});
    return seq;
  }
  getAllCouvert(){
    let seq=this.http.get(this.url+'culvert_image',{responseType:'json'})
    return seq
  }
  getAllBasic(){
    let seq=this.http.get(this.url+'basic_image',{responseType:'json'})
    return seq
  }
  getAllStreamflow(){
    let seq=this.http.get(this.url+'streamflow',{responseType:'json'})
    return seq
  }
  getAllDebrisjams(){
    let seq=this.http.get(this.url+'debris_jams',{responseType:'json'})
    return seq
  }
  uploadCouvert(culvert:CouvertInfoModel){
    const params = JSON.stringify({
      Uploader: culvert.Uploader,
      LowLat: culvert.LowLat,
      LowLon: culvert.LowLon,
      LowPic: culvert.LowPic,
      HighLat: culvert.HighLat,
      HighLon: culvert.HighLon,
      HighPic: culvert.HighPic,
      Description: culvert.Description,
      Orientation: culvert.Orientation
    })
    console.log(params.toString())
   let seq=this.http.post(this.url+'culvert_image',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'},responseType:'text'})
   return seq;
  }
  uploadBasic(basic:BasicInfoModel){
    const params = JSON.stringify({
      Uploader: basic.Uploader,
      Lat: basic.Lat,
      Lon: basic.Lon,
      Pic: basic.Pic,
      Description: basic.Description,
      Orientation: basic.Orientation
    })
    console.log(params.toString())
   let seq=this.http.post(this.url+'basic_image',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'},responseType:'text'})
   return seq;
  }
  uploadStreamflow(sf:StreamflowInfoModel){
    const params = JSON.stringify({
      Uploader: sf.Uploader,
      Lat: sf.Lat,
      Lon: sf.Lon,
      Pic: sf.Pic,
      Description: sf.Description,
      Orientation: sf.Orientation,
      Area: sf.Area,
      Level:sf.Level
    })
    console.log(params.toString())
   let seq=this.http.post(this.url+'streamflow',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'},responseType:'text'})
   return seq;
  }
  uploadDebris(dj:DebrisjamsInfoModel){
    const params = JSON.stringify({
      Uploader: dj.Uploader,
      Lat: dj.Lat,
      Lon: dj.Lon,
      Pic: dj.Pic,
      Description: dj.Description,
      Orientation: dj.Orientation,
      Direction: dj.Direction
    })
    console.log(params.toString())
   let seq=this.http.post(this.url+'debris_jams',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'},responseType:'text'})
   return seq;
  }
}
