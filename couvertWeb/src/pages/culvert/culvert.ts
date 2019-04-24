import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController} from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service'
import {CouvertInfoModel} from '../../models/models'
import * as EXIF from 'exif-js';
/**
 * Generated class for the CulvertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-culvert',
  templateUrl: 'culvert.html',
})
export class CulvertPage {
  public couverinfo: CouvertInfoModel
  private loader:any
  public lowEndImage: any
  public highEndImage: any
    public currentUser: any
    public showLowEnd:boolean
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public service :ServiceProvider,
     public loading :LoadingController,
     private alertCtrl: AlertController) {
    this.couverinfo= new CouvertInfoModel
    this.showLowEnd=false
  }

  ionViewDidLoad() {
    this.currentUser=localStorage.getItem('CurrentUser')
    this.couverinfo.Uploader=this.currentUser
    console.log('ionViewDidLoad CulvertPage');
  }
  
  async readThisLow(inputValue: any) {
    var file= inputValue.files[0];
   var result=await this.getExifData(file,this.couverinfo,"low")

 /* this.couverinfo.Lat=result[0];
  this.couverinfo.Lon=result[1];
  this.couverinfo.Phototime=result[2];*/
/* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.lowEndImage = myReader.result;
    
      var str=this.lowEndImage.split('base64,');
      this.couverinfo.LowPic=str[1];
    }
    myReader.readAsDataURL(file);
  }
  async readThisHigh(inputValue: any) {
    var file= inputValue.files[0];
   var result=await this.getExifData(file,this.couverinfo,"high")

 /* this.couverinfo.Lat=result[0];
  this.couverinfo.Lon=result[1];
  this.couverinfo.Phototime=result[2];*/
/* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.highEndImage = myReader.result;
    
      var str=this.highEndImage.split('base64,');
      this.couverinfo.HighPic=str[1];
    }
    myReader.readAsDataURL(file);
  }
  changeListener($event,side:string) : void {
    if(side=="low"){this.readThisLow($event.target);}else if(side=="high"){
      this.readThisHigh($event.target);
    }
    
  }

  getExifData(file,culvert,side:string){
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
          if(side=="low"){
            culvert.LowLat=latitude;
            culvert.LowLon=longitude;
          }else if(side=="high"){
            culvert.HighLat=latitude;
            culvert.HighLon=longitude;
          }
          
          /*photoedTime=photoedTime.replace(':','-');
          couverinfo.Phototime=photoedTime.replace(':','-')*/
          
        }else{
          alert("Your picture do not have location information, Please describe photoed location and time in the Description section.")
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
  uploadCouvert(){
    if(this.couverinfo.LowLat&&
      this.couverinfo.LowLon&&
      this.couverinfo.HighLat&&
      this.couverinfo.HighLon){
        this.loader = this.loading.create({
          duration:15000,
          content: 'Uploading Couvert infomation. Please wait...'
        });
        this.loader.onDidDismiss(()=>{
          this.presentAlert("Time out","Time out. No connection to server.")
        })
        this.loader.present();
        this.service.uploadCouvert(this.couverinfo)
        .subscribe(resp=>{
          this.loader.onDidDismiss(()=>{
            console.log("Connection success")
          })
          this.loader.dismiss();
          if(resp=="200")
          {
            this.presentAlert("Operation success","Thank you for your contribution!")
            this.lowEndImage=""
            this.highEndImage=""
          }else{
            alert("Bad Request")
            this.lowEndImage=""
            this.highEndImage=""
          }
        },err=>{
          this.loader.dismiss();
          alert("Error happened")
          this.lowEndImage=""
          this.highEndImage=""
        })
        this.lowEndImage=""
        this.highEndImage=""
      this.initCouverinfo();
    }else{
      alert("Please Upload full culvert info, Picture with on loaction information will not be able to upload")
    }
  }
  cancelUpload(){
    this.lowEndImage=""
    this.highEndImage=""
    this.initCouverinfo();
  }
  initCouverinfo(){
    this.couverinfo.LowPic=""
    this.couverinfo.HighPic=""
    this.couverinfo.Phototime=""
    this.couverinfo.Orientation=""
    this.couverinfo.Description=""
    this.couverinfo.LowLat=null
    this.couverinfo.LowLon=null
    this.couverinfo.HighLat=null
    this.couverinfo.HighLon=null
  }
}
