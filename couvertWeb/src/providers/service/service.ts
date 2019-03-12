import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiProvider} from '../api/api'
import { text } from '@angular/core/src/render3/instructions';
import {CouvertInfoModel} from '../../models/models'

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  url="http://localhost:8380/v1/"
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
}
