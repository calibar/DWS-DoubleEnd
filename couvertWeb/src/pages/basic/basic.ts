import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import * as EXIF from 'exif-js';
import {ServiceProvider} from '../../providers/service/service'
import {BasicInfoModel} from "../../models/models"
/**
 * Generated class for the BasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basic',
  templateUrl: 'basic.html',
})
export class BasicPage {

  public basicinfo: BasicInfoModel
  private loader:any
  public Image: any
  public highEndImage: any
    public currentUser: any
    public showLowEnd:boolean
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public service :ServiceProvider,
     public loading :LoadingController,
     private alertCtrl: AlertController) {
    this.basicinfo= new BasicInfoModel
    this.showLowEnd=false
  }

  ionViewDidLoad() {
    this.currentUser=localStorage.getItem('CurrentUser')
    this.basicinfo.Uploader=this.currentUser
    console.log('ionViewDidLoad CulvertPage');
  }
  
  async readThis(inputValue: any) {
    var file= inputValue.files[0];
   var result=await this.getExifData(file,this.basicinfo)
    
      var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.Image = myReader.result;
    
      var str=this.Image.split('base64,');
      this.basicinfo.Pic=str[1];
    }
    myReader.readAsDataURL(file);
 /* this.couverinfo.Lat=result[0];
  this.couverinfo.Lon=result[1];
  this.couverinfo.Phototime=result[2];*/
/* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    
  }

  changeListener($event) : void {
    this.readThis($event.target)

  }
 
  getExifData(file,basic){
    return new Promise(resolve => {
      var latitude,longitude,photoedTime
      EXIF.getData(file, function() {
        var Lat = EXIF.getTag(this, "GPSLatitude"); 
        var LatRef=EXIF.getTag(this,'GPSLatitudeRef')
        var Lon = EXIF.getTag(this, 'GPSLongitude'); 
        var LonRef=EXIF.getTag(this,'GPSLongitudeRef')
        photoedTime=EXIF.getTag(this,'DateTimeOriginal');
        var lat:number
        lat=null
        var lon:number
        lon=null
        if(Lat&&Lon){
          if(typeof(Lat[0].numerator)!="undefined"){
           console.log(Lat[0].numerator)
            lat=Lat[0].numerator/Lat[0].denominator
            +Lat[1].numerator/(60*Lat[1].denominator)
            +Lat[2].numerator/(3600*Lat[2].denominator)
      
            lon=Lon[0].numerator/Lon[0].denominator
            +Lon[1].numerator/(60*Lon[1].denominator)
            +Lon[2].numerator/(3600*Lon[2].denominator)
          }else{
           lat=Lat[0]+Lat[1]/60+Lat[2]/3600;
           lon=Lon[0]+Lon[1]/60+Lon[2]/3600;
          }
         console.log(LonRef)
          if(LatRef=="S"){
            lat=-lat;
          }
          if(LonRef=="W"){
            lon=-lon;
          }
          latitude=lat.toFixed(6);
          longitude=lon.toFixed(6);
          basic.Lat=latitude;
          basic.Lon=longitude

          
          /*photoedTime=photoedTime.replace(':','-');
          couverinfo.Phototime=photoedTime.replace(':','-')*/
          
        }else{
          alert("This photo does not have location information, it cannot be uploaded")
          /*couverinfo.Photoedtime="2018-01-01 00:00:00"*/
          /*var alerting :AlertController
          let alertbox= alerting.create({
            title: 'No Location information',
            subTitle: "Your picture do not have location information, Please describe your location in the Description section.",
            buttons: ['OK']
          })
          alertbox.present();*/
          /*let alert = this.alertCtrl.create({
            title: 'No Location information',
            subTitle: "Your picture do not have location information, Please describe your location in the Description section.",
            buttons: ['OK']
          });
          alert.present();*/
          
        }
       
    });
     resolve([latitude,longitude,photoedTime]);
    });
  }
  presentAlert(title,content) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }
  upload(){
    if(this.basicinfo.Lat&&this.basicinfo.Lon){
        this.loader = this.loading.create({
          duration:60000,
          content: 'Uploading infomation. Please wait...'
        });
        this.loader.onDidDismiss(()=>{
          this.presentAlert("Time out","Time out. No connection to server.")
        })
        this.loader.present();
        this.service.uploadBasic(this.basicinfo)
        .subscribe(resp=>{
          this.loader.onDidDismiss(()=>{
            console.log("Connection success")
          })
          this.loader.dismiss();
          if(resp=="200")
          {
            this.presentAlert("Operation success","Thank you for your contribution!")
            this.Image=""
          }else{
            alert("Bad Request")
            this.Image=""
          }
        },err=>{
          this.loader.dismiss();
          alert("Error happened")
          this.Image=""
        })
        this.Image=""
      this.initCouverinfo();
    }else{
      alert("Please Upload full basic info, Picture with out loaction information will not be able to upload")
      this.cancelUpload()

    }
  }
  cancelUpload(){
    this.Image=""
    this.initCouverinfo();
  }
  initCouverinfo(){
    this.basicinfo.Pic=""
    this.basicinfo.Phototime=""
    this.basicinfo.Orientation=""
    this.basicinfo.Description=""
    this.basicinfo.Lat=null
    this.basicinfo.Lon=null
  }

}
