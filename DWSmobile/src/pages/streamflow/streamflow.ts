import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';
import * as EXIF from 'exif-js';
import {ServiceProvider} from '../../providers/service/service'
import {StreamflowInfoModel} from '../../models/models'
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the StreamflowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-streamflow',
  templateUrl: 'streamflow.html',
})
export class StreamflowPage {
  public IfCamera:boolean
  public sfinfo: StreamflowInfoModel
  private loader:any
  public Image: any
  public place: any
  public highEndImage: any
    public currentUser: any
    public showLowEnd:boolean
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public service :ServiceProvider,
     public loading :LoadingController,
     private alertCtrl: AlertController,
     private camera :Camera) {
    this.sfinfo= new StreamflowInfoModel
    this.showLowEnd=false
    this.IfCamera=false
  }

  ionViewDidLoad() {
    this.currentUser=localStorage.getItem('CurrentUser')
    this.sfinfo.Uploader=this.currentUser
    console.log('ionViewDidLoad CulvertPage');
  }
  
  async readThis(inputValue: any) {
    var file= inputValue.files[0];
   var result=await this.getExifData(file,this.sfinfo)

 /* this.couverinfo.Lat=result[0];
  this.couverinfo.Lon=result[1];
  this.couverinfo.Phototime=result[2];*/
/* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.Image = myReader.result;
    
      var str=this.Image.split('base64,');
      this.sfinfo.Pic=str[1];
    }
    myReader.readAsDataURL(file);
  }

  changeListener($event) : void {
    this.readThis($event.target)

  }

  getExifData(file,sf){
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
          sf.Lat=latitude;
          sf.Lon=longitude

          
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
  upload(){
    if(this.sfinfo.Lat&&this.sfinfo.Lon){
        this.loader = this.loading.create({
          duration:60000,
          content: 'Uploading infomation. Please wait...',
          enableBackdropDismiss: true
        });
        this.loader.onDidDismiss(()=>{
          this.presentAlert("Time out","Time out. No connection to server.")
        })
        this.loader.present();
        this.service.uploadStreamflow(this.sfinfo)
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
      alert("Please Upload full Stream Flow info, Picture with out loaction information will not be able to upload")
      this.cancelUpload()
    }
  }
  cancelUpload(){
    this.Image=""
    this.initCouverinfo();
    this.IfCamera=false
  }
  initCouverinfo(){
    this.sfinfo.Pic=""
    this.sfinfo.Phototime=""
    this.sfinfo.Orientation=""
    this.sfinfo.Description=""
    this.sfinfo.Area=""
    this.sfinfo.Level=""
    this.sfinfo.Lat=null
    this.sfinfo.Lon=null
    this.IfCamera=false
  }
  optionsFn(){
    alert(this.sfinfo.Area)
  }
  getPreciseLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve([position.coords.latitude, position.coords.longitude]);
      });
    });
  }
  getPos(){
    this.loader = this.loading.create({
      duration:60000,
      content: 'Locating your position. It may take minutes to get your accurate position. Please wait...',
      enableBackdropDismiss: true
    });
    this.loader.onDidDismiss(()=>{
      this.presentAlert("Time out","Time out. Your GPS signal is weak, cannot locate your position.")
    })
    this.loader.present();
    this.getPreciseLocation()
    .then(pos=>{
      this.loader.onDidDismiss(()=>{
        console.log("Connection success")
      })
      this.loader.dismiss();
      this.sfinfo.Lat=pos[0].toFixed(6)
      this.sfinfo.Lon=pos[1].toFixed(6)
    })
  }
  getlatlon(){
    this.getPreciseLocation()
    .then(pos=>{
      this.sfinfo.Lat=pos[0].toFixed(6)
      this.sfinfo.Lon=pos[1].toFixed(6)
      console.log(this.sfinfo.Lat)
      console.log(this.sfinfo.Lon)
    })
  }
  takePicture(){
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 200
    }

      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.sfinfo.Uploader=localStorage.getItem('CurrentUser')
        this.sfinfo.Pic=imageData;
        this.Image = 'data:image/jpeg;base64,' + imageData;
        this.IfCamera=true
        this.getlatlon()
       }, (err) => {
        // Handle error
       });
      /*let loading = this.loading.create({
        showBackdrop: true,
        enableBackdropDismiss: true,
        content: 'Getting location, it may take a minute. Please wait...'
      });
      loading.present();
       this.geolocation.getCurrentPosition().then(resp=>{
         this.couverinfo.Lat=resp.coords.latitude;
         this.couverinfo.Lon=resp.coords.longitude;
         var heading=resp.coords.heading;
         alert(heading)
         loading.dismiss()
       }).catch(err=>{
         loading.dismiss()
         alert("Fail to get position")
       })*/
       
     }
}
