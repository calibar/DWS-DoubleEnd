import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service'
import {CouvertInfoModel,StreamflowInfoModel,BasicInfoModel,DebrisjamsInfoModel} from '../../models/models'
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { CurrencyPipe } from '@angular/common';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage({
  name: 'my-page',
  segment: 'some-path'
})
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  url="http://159.89.127.33:443/"
  public currentMap:any
  public basicinfoList: BasicInfoModel[];
  public basicinfo: BasicInfoModel
  public couvertinfoList: CouvertInfoModel[];
  public couverinfo: CouvertInfoModel;
  public sfinfoList: StreamflowInfoModel[];
  public sfinfo:StreamflowInfoModel;
  public djinfoList: DebrisjamsInfoModel[];
  public djinfo:DebrisjamsInfoModel;
  private loader:any
  public MyLocationMap:any
  private subscription:any
  public CurrentDirection:any
  public markerList: any[]
  private loadingmark="Loading Information Marks..."
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private service: ServiceProvider,
    private geolocation:Geolocation,
    private loading:LoadingController,
    private deviceOrientation: DeviceOrientation) {
    this.couvertinfoList=[];  
    this.basicinfoList=[];
    this.sfinfoList=[];
    this.djinfoList=[];
    this.couverinfo=new CouvertInfoModel
    this.MyLocationMap=new Map();
    this.markerList=new Array();
    /*this.MyLocationMarker=new google.maps.Marker*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    console.log(this.mapRef)
    this.showMap()
    /*this.subscription = this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => {
        var Ovalue=data.trueHeading;
           
           var Direction:string
           if((Ovalue>337.5&&Ovalue<360)||(Ovalue>=0&&Ovalue<22.5)){
            Direction="North  "+Ovalue.toFixed(2)+"°";
        }else if(22.5<=Ovalue&&Ovalue<=67.5){
            Direction="NorthEast  "+Ovalue.toFixed(2)+"°";
        }else if(Ovalue>67.5&&Ovalue<112.5){
            Direction="East  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>=112.5&&Ovalue<=157.5){
            Direction="SouthEast  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>157.5&&Ovalue<202.5){
            Direction="South  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>=202.5&&Ovalue<=247.5){
            Direction="SouthWest  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>247.5&&Ovalue<292.5){
          Direction="West  "+Ovalue.toFixed(2)+"°"
        }else if(Ovalue>=292.5&&Ovalue<=337.5){
          Direction="NorthWest  "+Ovalue.toFixed(2)+"°"
        }else{
          Direction="out of range"
        }
        this.CurrentDirection=Direction;
      }
    );*/
 
  
  }
  changeMap(){
    if(this.currentMap=="Basic"){
      this.removeMarkers();
      this.loadBasic();
      this.loadingmark="Basic Map"
    }else if(this.currentMap=="Culvert"){
      this.removeMarkers();
      this.loadCouverts();
      this.loadingmark="Culvert Map"
    }else if(this.currentMap=="Stream Flow"){
      this.removeMarkers();
      this.loadStreamflow();
      this.loadingmark="Stream Flow Map"
    }else if(this.currentMap=="Debirs Jams"){
      this.removeMarkers();
      this.loadDebrisjams();
      this.loadingmark="Debirs Jams Map"
    }else if(this.currentMap=="All"){
      this.loadAll()
      this.loadingmark="DWS MAP General"
    }
  }
  getLocation(couverinfo){
    let loading = this.loading.create({
      content: 'Getting your location,Please wait...'
    });
  
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      couverinfo.Lat=resp.coords.latitude// resp.coords.latitude
      couverinfo.Lon=resp.coords.longitude// resp.coords.longitude
      loading.dismiss();
     }).catch((error) => {
       console.log('Failed getting your location', error);
       loading.dismiss();
       alert("Failed to get your location")
     });
  }
loadAll(){
    this.removeMarkers();
    this.loadBasic();
    this.loadCouverts();
    this.loadStreamflow();
    this.loadDebrisjams();
    return true
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  showMap(){
    var location = new google.maps.LatLng(51.132854,-106.631401);
    var lat;
    var lon;
    const options={
      center: location,
      zoom:10
    }
    this.map= new google.maps.Map(this.mapRef.nativeElement,options)
    this.gotoMYpostionWeb();
    this.loadBasic();
    this.loadCouverts();
    this.loadStreamflow();
    this.loadDebrisjams();
    this.loadingmark="DWS MAP General"
  }
  reload(){
    this.navCtrl.push(MapPage)
  }
  gotoMYpostionWeb(){
    console.log("hello")
    this.loader = this.loading.create({
      duration:5000,
      content: 'Getting your location, it may take a minute. Please wait...',
      dismissOnPageChange:true
    });
    this.loader.onDidDismiss(()=>{
      alert("Cannot get your location")
    })
    var lat,lon;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          heading: position.coords.accuracy
        };
       lat=pos.lat.toFixed(6);
       console.log(lat)
       localStorage.setItem('Lat',lat)
       lon=pos.lng.toFixed(6);
       localStorage.setItem('Lon',lon)
      }, function() {
        alert("Cannot get your current location")
      });

    }else{
      alert("Your broswer do not support geolocation.")
    }
    var myLat=localStorage.getItem('Lat');
      var myLon=localStorage.getItem('Lon');
    if(myLat&&myLon){
      
      this.loader.onDidDismiss(()=>{
        console.log("Into your location")
      })
      this.loader.dismiss();
      console.log("setting")
      var pos=new google.maps.LatLng(myLat,myLon);
      this.map.setCenter(pos)
      if(this.MyLocationMap.get('currentPosMarker')){
        this.MyLocationMap.get('currentPosMarker').setMap(null);
      }
      var MyPos = "assets/icon/bluecircle.png";
  
      var marker= new google.maps.Marker({
        position: pos,
        map: this.map,
        icon: MyPos
      });
      
      this.MyLocationMap.set('currentPosMarker',marker)
      var infowindow = new google.maps.InfoWindow
      marker.addListener('click', function() {
      
        infowindow.setContent('Your server location.');

        infowindow.open(this.map, marker);
      });
    }

  }
  /*gotoMyPosition(){
    this.loader = this.loading.create({
      duration:5000,
      content: 'Getting your location, it may take a minute. Please wait...',
      dismissOnPageChange:true
    });
    this.loader.onDidDismiss(()=>{
      alert("Cannot get your location")
    })
    this.loader.present();
    var lat,lon;
    let options: MyLocationOptions = {
      enableHighAccuracy: true
    };
    LocationService.getMyLocation(options).then((myLocation: MyLocation)=>{
     lat=myLocation.latLng.lat;
     lon=myLocation.latLng.lng;

      this.loader.onDidDismiss(()=>{
        console.log("Into your location")
      })
      this.loader.dismiss();
       var location=new google.maps.LatLng(lat,lon);
      this.map.setCenter(location);

      /*var infowindow = new google.maps.InfoWindow
      infowindow.setPosition(location);
      infowindow.setContent('You are here');
      infowindow.open(this.map);*/

      /*if(this.MyLocationMap.get('currentPosMarker')){
        this.MyLocationMap.get('currentPosMarker').setMap(null);
      }
      var MyPos = "assets/icon/bluecircle.png";
  
      var marker= new google.maps.Marker({
        position: location,
        map: this.map,
        icon: MyPos
      });
      
      this.MyLocationMap.set('currentPosMarker',marker)
      var infowindow = new google.maps.InfoWindow
      marker.addListener('click', function() {
      
        infowindow.setContent('Your are here');

        infowindow.open(this.map, marker);
      });*/
      /*this.MyLocationMarker= new google.maps.Marker({
        position: location,
        map: this.map,
      });
      var infowindow = new google.maps.InfoWindow
      this.MyLocationMarker.addListener('click', function() {
        infowindow.setContent('Your Location');
        infowindow.open(this.map,this.MyLocationMarker)
      });*/
    /* }).catch(err=>{
       alert(err);
       this.loader.dismiss();
     })
    

  }*/
  addMarker(position,map,culvert:CouvertInfoModel){
    var culvertIcon="assets/icon/pinkdot.png"
    var marker= new google.maps.Marker({
      position: position,
      map: map,
      icon: {
        url:culvertIcon,
        scaledSize:new google.maps.Size(45,45)
      }
    });
    /*var infowindow = new google.maps.InfoWindow({
      content: content
    });*/
    var infowindow = new google.maps.InfoWindow({ maxWidth: 300 })
    var content='<a href="'+this.url+culvert.LowPic+'" target="_blank">Low End Image</a>'
    +'<br><br><a href="'+this.url+culvert.HighPic+'" target="_blank">High End Image</a>:&nbsp;&nbsp;&nbsp;'
    +'<br><br>Low End Latitude:&nbsp;&nbsp;&nbsp;'+culvert.LowLat
    +'<br><br>Low End Longitude:&nbsp;&nbsp;&nbsp;'+culvert.LowLon
    +'<br><br>High End Latitude:&nbsp;&nbsp;&nbsp;'+culvert.HighLat
    +'<br><br>High End Longitude:&nbsp;&nbsp;&nbsp;'+culvert.HighLon
    +'<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;'+culvert.Uploader
    if(culvert.Description){
      content=content+'<br><br>Description:&nbsp;&nbsp;&nbsp;'+culvert.Description
    }
    if(culvert.Orientation){
      content=content+'<br><br>Direction:&nbsp;&nbsp;&nbsp;'+culvert.Orientation
    }
    marker.addListener('click', function() {
      infowindow.setContent(content);      
      infowindow.open(map, marker);
    });
    this.markerList.push(marker)
   /* this.resizePic(pic,res=>{
      var content='<IMG SRC=' +res + '><br><br>Latitude:&nbsp;&nbsp;&nbsp;'+Latitude
      +'<br><br>Longitude:&nbsp;&nbsp;&nbsp;'+Longitude
      +'<br><br>Uploaded&nbsp;Time:&nbsp;&nbsp;&nbsp;'+Phototime
      +'<br><br>Uploaded&nbsp;By:&nbsp;&nbsp;&nbsp;'+Uploader
     if(Description){
       content=content+'<br><br>Description:&nbsp;&nbsp;&nbsp;'+Description
     }
     if(Orientation){
       content=content+'<br><br>Direction:&nbsp;&nbsp;&nbsp;'+Orientation
     }
      marker.addListener('click', function() {
        infowindow.setContent(content);      
        console.log(pic)
        infowindow.open(map, marker);
      });
    })*/
   
  }
  addBasicMarker(position,map,basic:BasicInfoModel){
    console.log(position)
    console.log(basic)
     var BasicIcon="assets/icon/bluedot.png"
    var marker= new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        url:BasicIcon,
        scaledSize:new google.maps.Size(50,50)
      }
    });
    /*var infowindow = new google.maps.InfoWindow({
      content: content
    });*/
    var infowindow = new google.maps.InfoWindow({ maxWidth: 300 })
    var modal='<style>body {font-family: Arial, Helvetica, sans-serif;}/* The Modal (background) */.modal { display: none; /* Hidden by default */ position: fixed; /* Stay in place */ z-index: 1; /* Sit on top */ padding-top: 100px; /* Location of the box */ left: 0; top: 0; width: 100%; /* Full width */ height: 100%; /* Full height */ overflow: auto; /* Enable scroll if needed */ background-color: rgb(0,0,0); /* Fallback color */ background-color: rgba(0,0,0,0.4); /* Black w/ opacity */}/* Modal Content */.modal-content { background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;}/* The Close Button */.close { color: #aaaaaa; float: right; font-size: 28px; font-weight: bold;}.close:hover,.close:focus { color: #000; text-decoration: none; cursor: pointer;}</style></head><body><!-- Trigger/Open The Modal --><button id="myBtn">Open Modal</button><!-- The Modal --><div id="myModal" class="modal"> <!-- Modal content --> <div class="modal-content"> <span class="close">&times;</span> <p>Some text in the Modal..</p> </div></div><script>// Get the modalvar modal = document.getElementById("myModal");// Get the button that opens the modalvar btn = document.getElementById("myBtn");// Get the <span> element that closes the modalvar span = document.getElementsByClassName("close")[0];// When the user clicks the button, open the modal btn.onclick = function() { modal.style.display = "block";}// When the user clicks on <span> (x), close the modalspan.onclick = function() { modal.style.display = "none";}// When the user clicks anywhere outside of the modal, close itwindow.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; }}</script>'
    var content='<a href="'+this.url+basic.Pic+'" target="_blank">Image</a>'
    +'<br><br>Latitude:&nbsp;&nbsp;&nbsp;'+basic.Lat
    +'<br><br>Longitude:&nbsp;&nbsp;&nbsp;'+basic.Lon
    +'<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;'+basic.Uploader
    if(basic.Description){
      content=content+'<br><br>Description:&nbsp;&nbsp;&nbsp;'+basic.Description
    }
    if(basic.Orientation){
      content=content+'<br><br>Direction:&nbsp;&nbsp;&nbsp;'+basic.Orientation
    }
    marker.addListener('click', function() {
      infowindow.setContent(content);      
      infowindow.open(map, marker);
    });
    this.markerList.push(marker)
  }
  addSfMarker(position,map,sf:StreamflowInfoModel){

    var SfIcon="assets/icon/greendot.png"
    var marker= new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        url:SfIcon,
        scaledSize:new google.maps.Size(40,40)
      }
    });
    /*var infowindow = new google.maps.InfoWindow({
      content: content
    });*/

    var infowindow = new google.maps.InfoWindow({ maxWidth: 300 })
    var content='<a href="'+this.url+sf.Pic+'" target="_blank">Image</a>'
    +'<br><br>Latitude:&nbsp;&nbsp;&nbsp;'+sf.Lat
    +'<br><br>Longitude:&nbsp;&nbsp;&nbsp;'+sf.Lon
    +'<br><br>Agricultural/Urban:&nbsp;&nbsp;&nbsp;'+sf.Area
    +'<br><br>Flow Level:&nbsp;&nbsp;&nbsp;'+sf.Level
    +'<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;'+sf.Uploader
    if(sf.Description){
      content=content+'<br><br>Description:&nbsp;&nbsp;&nbsp;'+sf.Description
    }
    if(sf.Orientation){
      content=content+'<br><br>Direction:&nbsp;&nbsp;&nbsp;'+sf.Orientation
    }
    marker.addListener('click', function() {
      infowindow.setContent(content);      
      infowindow.open(map, marker);
    });
    this.markerList.push(marker)
  }
  addDjMarker(position,map,dj:DebrisjamsInfoModel){

    var DjIcon="assets/icon/yellowdot.png"
    var marker= new google.maps.Marker({
      position: position,
      map: this.map,
      icon: {
        url:DjIcon,
        scaledSize:new google.maps.Size(35,35)
      }
    });
    /*var infowindow = new google.maps.InfoWindow({
      content: content
    });*/
    var infowindow = new google.maps.InfoWindow({ maxWidth: 300 })
    var content='<a href="'+this.url+dj.Pic+'" target="_blank">Image</a>'
    +'<br><br>Latitude:&nbsp;&nbsp;&nbsp;'+dj.Lat
    +'<br><br>Longitude:&nbsp;&nbsp;&nbsp;'+dj.Lon
    +'<br><br>Direction:&nbsp;&nbsp;&nbsp;'+dj.Direction
    +'<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;'+dj.Uploader
    if(dj.Description){
      content=content+'<br><br>Description:&nbsp;&nbsp;&nbsp;'+dj.Description
    }
    if(dj.Orientation){
      content=content+'<br><br>Direction:&nbsp;&nbsp;&nbsp;'+dj.Orientation
    }
    marker.addListener('click', function() {
      infowindow.setContent(content);      
      infowindow.open(map, marker);
    });
    this.markerList.push(marker)
  }
  removeMarkers(){
    for(var i=0;i<this.markerList.length;i++){
      this.markerList[i].setMap(null)
    }
  }
  resizePic(base64,callback){
    var maxWidth = 200;
    var maxHeight = 200;
    var reslut
    // Create and initialize two canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    // Create original image
    var img = new Image();
    img.src = base64;
    var result 
    var resizeimg=img.onload = function(){

        // Determine new ratio based on max size
        var ratio = 1;
        if(img.width > maxWidth) {
            ratio = maxWidth / img.width;
        }
        else if(img.height > maxHeight) {
            ratio = maxHeight / img.height;
        }


    // Draw original image in second canvas
    canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    copyContext.drawImage(img, 0, 0);

    // Copy and resize second canvas to first canvas
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);


         console.log(canvas.toDataURL());
         base64=canvas.toDataURL()
        callback(canvas.toDataURL());
    };
   
}
loadBasic(){
  let loading = this.loading.create({
    dismissOnPageChange: true,
    content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
  });

  this.service.getAllBasic()
  .subscribe((resp:any)=>{
   if (resp){
      resp.forEach(element => {
        this.basicinfo= new BasicInfoModel
        this.basicinfo.Description=element.Description
        this.basicinfo.Uploader=element.Uploader
        this.basicinfo.Phototime=element.Phototime
        this.basicinfo.Lat=element.Lat
        this.basicinfo.Lon=element.Lon
        this.basicinfo.Pic=element.Pic
        this.basicinfo.Orientation=element.Orientation
        this.basicinfoList.push(this.basicinfo)
        let position= new google.maps.LatLng(this.basicinfo.Lat,this.basicinfo.Lon);
        this.addBasicMarker(position,this.map,this.basicinfo)
      });
      /*console.log(resp)
      console.log(this.couvertinfoList) */
     loading.dismiss()
      
   }else{

     console.log("no result")
   }
  },err=>{
    alert("Connot connect to couverts server")
    console.log("Cannot connect to couverts server")
  })
  return this.basicinfoList
}
  loadCouverts(){
    let loading = this.loading.create({
      dismissOnPageChange: true,
      content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
    });

    this.service.getAllCouvert()
    .subscribe((resp:any)=>{
     if (resp){
        resp.forEach(element => {
          this.couverinfo= new CouvertInfoModel
          this.couverinfo.Description=element.Description
          this.couverinfo.Uploader=element.Uploader
          this.couverinfo.Phototime=element.Phototime
          this.couverinfo.LowLat=element.LowLat
          this.couverinfo.LowLon=element.LowLon
          this.couverinfo.LowPic=element.LowPic
          this.couverinfo.HighLat=element.HighLat
          this.couverinfo.HighLon=element.HighLon
          this.couverinfo.HighPic=element.HighPic
          this.couverinfo.Orientation=element.Orientation
          this.couvertinfoList.push(this.couverinfo)
          let position= new google.maps.LatLng(this.couverinfo.HighLat,this.couverinfo.HighLon);
          this.addMarker(position,this.map,this.couverinfo)
        });
        /*console.log(resp)
        console.log(this.couvertinfoList) */
       loading.dismiss()
        
     }else{

       console.log("no result")
     }
    },err=>{
      alert("Connot connect to couverts server")
      console.log("Cannot connect to couverts server")
    })
    return this.couvertinfoList
  }
 loadStreamflow(){
  let loading = this.loading.create({
    dismissOnPageChange: true,
    content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
  });

  this.service.getAllStreamflow()
  .subscribe((resp:any)=>{
   if (resp){
      resp.forEach(element => {
        this.sfinfo= new StreamflowInfoModel
        this.sfinfo.Description=element.Description
        this.sfinfo.Uploader=element.Uploader
        this.sfinfo.Phototime=element.Phototime
        this.sfinfo.Lat=element.Lat
        this.sfinfo.Lon=element.Lon
        this.sfinfo.Pic=element.Pic
        this.sfinfo.Orientation=element.Orientation
        this.sfinfo.Area=element.Area
        this.sfinfo.Level=element.Level
        this.sfinfoList.push(this.sfinfo)
        let position= new google.maps.LatLng(this.sfinfo.Lat,this.sfinfo.Lon);
        this.addSfMarker(position,this.map,this.sfinfo)
      });
      /*console.log(resp)
      console.log(this.couvertinfoList) */
     loading.dismiss()
      
   }else{

     console.log("no result")
   }
  },err=>{
    alert("Connot connect to couverts server")
    console.log("Cannot connect to couverts server")
  })
  return this.sfinfoList
 }
 loadDebrisjams(){
  let loading = this.loading.create({
    dismissOnPageChange: true,
    content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
  });

  this.service.getAllDebrisjams()
  .subscribe((resp:any)=>{
   if (resp){
      resp.forEach(element => {
        this.djinfo= new DebrisjamsInfoModel
        this.djinfo.Description=element.Description
        this.djinfo.Uploader=element.Uploader
        this.djinfo.Phototime=element.Phototime
        this.djinfo.Lat=element.Lat
        this.djinfo.Lon=element.Lon
        this.djinfo.Pic=element.Pic
        this.djinfo.Orientation=element.Orientation
        this.djinfo.Direction=element.Direction
        this.djinfoList.push(this.djinfo)
        let position= new google.maps.LatLng(this.djinfo.Lat,this.djinfo.Lon);
        this.addDjMarker(position,this.map,this.djinfo)
      });
      /*console.log(resp)
      console.log(this.couvertinfoList) */
     loading.dismiss()
      
   }else{

     console.log("no result")
   }
  },err=>{
    alert("Connot connect to couverts server")
    console.log("Cannot connect to couverts server")
  })
  return this.djinfoList
 }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }
  alertText(){
    alert("test for marker call")
  }
}
