webpackJsonp([7],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CulvertPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_models__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_exif_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_exif_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CulvertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CulvertPage = /** @class */ (function () {
    function CulvertPage(navCtrl, navParams, service, loading, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.couverinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["b" /* CouvertInfoModel */];
        this.showLowEnd = false;
    }
    CulvertPage.prototype.ionViewDidLoad = function () {
        this.currentUser = localStorage.getItem('CurrentUser');
        this.couverinfo.Uploader = this.currentUser;
        console.log('ionViewDidLoad CulvertPage');
    };
    CulvertPage.prototype.readThisLow = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        this.getExifData(file, this.couverinfo, "low")
            .then(function (res) {
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.lowEndImage = myReader.result;
                var str = _this.lowEndImage.split('base64,');
                _this.couverinfo.LowPic = str[1];
            };
            myReader.readAsDataURL(file);
        });
        /* this.couverinfo.Lat=result[0];
         this.couverinfo.Lon=result[1];
         this.couverinfo.Phototime=result[2];*/
        /* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
        this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
        this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    };
    CulvertPage.prototype.readThisHigh = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        this.getExifData(file, this.couverinfo, "high")
            .then(function (res) {
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.highEndImage = myReader.result;
                var str = _this.highEndImage.split('base64,');
                _this.couverinfo.HighPic = str[1];
            };
            myReader.readAsDataURL(file);
        });
        /* this.couverinfo.Lat=result[0];
         this.couverinfo.Lon=result[1];
         this.couverinfo.Phototime=result[2];*/
        /* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
        this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
        this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    };
    CulvertPage.prototype.changeListener = function ($event, side) {
        if (side == "low") {
            this.readThisLow($event.target);
        }
        else if (side == "high") {
            this.readThisHigh($event.target);
        }
    };
    CulvertPage.prototype.getExifData = function (file, culvert, side) {
        return new Promise(function (resolve) {
            var latitude, longitude, photoedTime;
            __WEBPACK_IMPORTED_MODULE_4_exif_js__["getData"](file, function () {
                var Lat = __WEBPACK_IMPORTED_MODULE_4_exif_js__["getTag"](this, "GPSLatitude");
                var LatRef = __WEBPACK_IMPORTED_MODULE_4_exif_js__["getTag"](this, 'GPSLatitudeRef');
                var Lon = __WEBPACK_IMPORTED_MODULE_4_exif_js__["getTag"](this, 'GPSLongitude');
                var LonRef = __WEBPACK_IMPORTED_MODULE_4_exif_js__["getTag"](this, 'GPSLongitudeRef');
                photoedTime = __WEBPACK_IMPORTED_MODULE_4_exif_js__["getTag"](this, 'DateTimeOriginal');
                var lat;
                lat = null;
                var lon;
                lon = null;
                if (Lat && Lon) {
                    if (typeof (Lat[0].numerator) != "undefined") {
                        console.log(Lat[0].numerator);
                        lat = Lat[0].numerator / Lat[0].denominator
                            + Lat[1].numerator / (60 * Lat[1].denominator)
                            + Lat[2].numerator / (3600 * Lat[2].denominator);
                        lon = Lon[0].numerator / Lon[0].denominator
                            + Lon[1].numerator / (60 * Lon[1].denominator)
                            + Lon[2].numerator / (3600 * Lon[2].denominator);
                    }
                    else {
                        lat = Lat[0] + Lat[1] / 60 + Lat[2] / 3600;
                        lon = Lon[0] + Lon[1] / 60 + Lon[2] / 3600;
                    }
                    console.log(LonRef);
                    if (LatRef == "S") {
                        lat = -lat;
                    }
                    if (LonRef == "W") {
                        lon = -lon;
                    }
                    latitude = lat.toFixed(6);
                    longitude = lon.toFixed(6);
                    if (side == "low") {
                        culvert.LowLat = latitude;
                        culvert.LowLon = longitude;
                    }
                    else if (side == "high") {
                        culvert.HighLat = latitude;
                        culvert.HighLon = longitude;
                    }
                    /*photoedTime=photoedTime.replace(':','-');
                    couverinfo.Phototime=photoedTime.replace(':','-')*/
                }
                else {
                    alert("This photo does not have location information, it cannot be uploaded");
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
            resolve([latitude, longitude, photoedTime]);
        });
    };
    CulvertPage.prototype.presentAlert = function (title, content) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: content,
            buttons: ['OK']
        });
        alert.present();
    };
    CulvertPage.prototype.uploadCouvert = function () {
        var _this = this;
        if (this.couverinfo.LowLat &&
            this.couverinfo.LowLon &&
            this.couverinfo.HighLat &&
            this.couverinfo.HighLon) {
            this.loader = this.loading.create({
                duration: 120000,
                content: 'Uploading infomation. Please wait...'
            });
            this.loader.onDidDismiss(function () {
                _this.presentAlert("Time out", "Time out. No connection to server.");
            });
            this.loader.present();
            this.service.uploadCouvert(this.couverinfo)
                .subscribe(function (resp) {
                _this.loader.onDidDismiss(function () {
                    console.log("Connection success");
                });
                _this.loader.dismiss();
                if (resp == "200") {
                    _this.presentAlert("Operation success", "Thank you for your contribution!");
                    _this.lowEndImage = "";
                    _this.highEndImage = "";
                }
                else {
                    alert("Bad Request");
                    _this.lowEndImage = "";
                    _this.highEndImage = "";
                }
            }, function (err) {
                _this.loader.dismiss();
                alert("Error happened");
                _this.lowEndImage = "";
                _this.highEndImage = "";
            });
            this.lowEndImage = "";
            this.highEndImage = "";
            this.initCouverinfo();
        }
        else {
            alert("Please Upload full culvert info, Picture with out loaction information will not be able to upload");
            this.cancelUpload();
        }
    };
    CulvertPage.prototype.cancelUpload = function () {
        this.lowEndImage = "";
        this.highEndImage = "";
        this.initCouverinfo();
    };
    CulvertPage.prototype.cancelHigh = function () {
        this.couverinfo.HighPic = "";
        this.highEndImage = "";
    };
    CulvertPage.prototype.cancelLow = function () {
        this.couverinfo.LowPic = "";
        this.lowEndImage = "";
    };
    CulvertPage.prototype.initCouverinfo = function () {
        this.couverinfo.LowPic = "";
        this.couverinfo.HighPic = "";
        this.couverinfo.Phototime = "";
        this.couverinfo.Orientation = "";
        this.couverinfo.Description = "";
        this.couverinfo.LowLat = null;
        this.couverinfo.LowLon = null;
        this.couverinfo.HighLat = null;
        this.couverinfo.HighLon = null;
    };
    CulvertPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-culvert',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\culvert\culvert.html"*/'<!--\n\n  Generated template for the CulvertPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="primary">\n\n        <ion-title>Upload Culvert</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div *ngIf="!lowEndImage">\n\n        <div id="upload_button">\n\n            <label>\n\n        <ion-label id="fileChoose" color="primary">\n\n          <input class="ionic-item" type="file" accept="image/*" (change)="changeListener($event,\'low\')">\n\n         <ion-icon name="albums"></ion-icon>\n\n          <span class="btn btn-primary">&nbsp;Low End of Culvert</span>\n\n        </ion-label>\n\n      </label>\n\n        </div>\n\n    </div>\n\n\n\n    <div *ngIf="lowEndImage">\n\n        <div>\n\n            <br><img class="image-client" [src]="lowEndImage" *ngIf="lowEndImage" height="200" width="200" />\n\n        </div>\n\n        <ion-list>\n\n            <!--<ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>-->\n\n            <div *ngIf="!couverinfo.LowLat">\n\n                <ion-card>\n\n                    <ion-item>\n\n                        <label>This photo does not have location information, it cannot be uploaded</label>\n\n                    </ion-item>\n\n                </ion-card>\n\n                <button ion-button (click)="cancelLow()" clear>Reselect Low-end Picture</button>\n\n            </div>\n\n            <ion-card *ngIf="couverinfo.LowLat">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Low end Latitude: {{couverinfo.LowLat}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.LowLon">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Low end longitude: {{couverinfo.LowLon}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Orientation">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Direction: {{couverinfo.Orientation}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Phototime">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Photoed Time : {{couverinfo.Phototime}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n\n\n            <!--<ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>-->\n\n            <!--<ion-item *ngIf="!couverinfo.Phototime">\n\n                <ion-label floating> &nbsp; Click here to select photoed Time</ion-label>\n\n                <ion-datetime displayFormat="YYYY-MM-DD HH:mm" [(ngModel)]="couverinfo.Phototime"></ion-datetime>\n\n            </ion-item>-->\n\n        </ion-list>\n\n\n\n        <!--<button ion-button (click)="uploadCouvert()" clear>Upload Information</button>\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>-->\n\n    </div>\n\n\n\n    <br><br>\n\n    <div *ngIf="!highEndImage">\n\n        <div id="upload_button">\n\n            <label>\n\n        <ion-label id="fileChoose" color="primary">\n\n          <input class="ionic-item" type="file" accept="image/*" (change)="changeListener($event,\'high\')">\n\n         <ion-icon name="albums"></ion-icon>\n\n          <span class="btn btn-primary">&nbsp;High End of Culvert</span>\n\n        </ion-label>\n\n      </label>\n\n        </div>\n\n    </div>\n\n\n\n    <div *ngIf="highEndImage">\n\n        <div>\n\n            <br><img class="image-client" [src]="highEndImage" *ngIf="highEndImage" height="200" width="200" />\n\n        </div>\n\n        <ion-list>\n\n            <!--<ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>-->\n\n            <div *ngIf="!couverinfo.HighLat">\n\n                <ion-card>\n\n                    <ion-item>\n\n                        <label>This photo does not have location information, it cannot be uploaded</label>\n\n                    </ion-item>\n\n                </ion-card>\n\n                <button ion-button (click)="cancelHigh()" clear>Reselect High-end Picture</button>\n\n            </div>\n\n            <ion-card *ngIf="couverinfo.HighLat">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; High end Latitude: {{couverinfo.HighLat}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.HighLon">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; High end longitude: {{couverinfo.HighLon}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Orientation">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Direction: {{couverinfo.Orientation}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Phototime">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Photoed Time : {{couverinfo.Phototime}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n\n\n            <!--<ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>-->\n\n            <!--<ion-item *ngIf="!couverinfo.Phototime">\n\n                <ion-label floating> &nbsp; Click here to select photoed Time</ion-label>\n\n                <ion-datetime displayFormat="YYYY-MM-DD HH:mm" [(ngModel)]="couverinfo.Phototime"></ion-datetime>\n\n            </ion-item>-->\n\n        </ion-list>\n\n\n\n        <!--<button ion-button (click)="uploadCouvert()" clear>Upload Information</button>\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>-->\n\n    </div>\n\n    <div *ngIf="highEndImage && lowEndImage">\n\n        <div *ngIf="couverinfo.LowLat&&couverinfo.HighLat">\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>\n\n            <button ion-button (click)="uploadCouvert()" clear>Upload Information</button>\n\n        </div>\n\n\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <div style="text-align: center;font-size: 100%">\n\n        <p>*Please turn on your location settings before using this app or upload the images having location tags from gallery.</p>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\culvert\culvert.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], CulvertPage);
    return CulvertPage;
}());

//# sourceMappingURL=culvert.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_exif_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_exif_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_models__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BasicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BasicPage = /** @class */ (function () {
    function BasicPage(navCtrl, navParams, service, loading, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.basicinfo = new __WEBPACK_IMPORTED_MODULE_4__models_models__["a" /* BasicInfoModel */];
        this.showLowEnd = false;
    }
    BasicPage.prototype.ionViewDidLoad = function () {
        this.currentUser = localStorage.getItem('CurrentUser');
        this.basicinfo.Uploader = this.currentUser;
        console.log('ionViewDidLoad CulvertPage');
    };
    BasicPage.prototype.readThis = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        this.getExifData(file, this.basicinfo)
            .then(function (res) {
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.Image = myReader.result;
                var str = _this.Image.split('base64,');
                _this.basicinfo.Pic = str[1];
            };
            myReader.readAsDataURL(file);
        });
        /* this.couverinfo.Lat=result[0];
         this.couverinfo.Lon=result[1];
         this.couverinfo.Phototime=result[2];*/
        /* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
        this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
        this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    };
    BasicPage.prototype.changeListener = function ($event) {
        var _this = this;
        var file = $event.target.files[0];
        this.getExifData(file, this.basicinfo)
            .then(function (res) {
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.Image = myReader.result;
                var str = _this.Image.split('base64,');
                _this.basicinfo.Pic = str[1];
            };
            myReader.readAsDataURL(file);
        });
    };
    BasicPage.prototype.getExifData = function (file, basic) {
        return new Promise(function (resolve) {
            var latitude, longitude, photoedTime;
            __WEBPACK_IMPORTED_MODULE_2_exif_js__["getData"](file, function () {
                var Lat = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, "GPSLatitude");
                var LatRef = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLatitudeRef');
                var Lon = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLongitude');
                var LonRef = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLongitudeRef');
                photoedTime = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'DateTimeOriginal');
                var lat;
                lat = null;
                var lon;
                lon = null;
                if (Lat && Lon) {
                    if (typeof (Lat[0].numerator) != "undefined") {
                        console.log(Lat[0].numerator);
                        lat = Lat[0].numerator / Lat[0].denominator
                            + Lat[1].numerator / (60 * Lat[1].denominator)
                            + Lat[2].numerator / (3600 * Lat[2].denominator);
                        lon = Lon[0].numerator / Lon[0].denominator
                            + Lon[1].numerator / (60 * Lon[1].denominator)
                            + Lon[2].numerator / (3600 * Lon[2].denominator);
                    }
                    else {
                        lat = Lat[0] + Lat[1] / 60 + Lat[2] / 3600;
                        lon = Lon[0] + Lon[1] / 60 + Lon[2] / 3600;
                    }
                    console.log(LonRef);
                    if (LatRef == "S") {
                        lat = -lat;
                    }
                    if (LonRef == "W") {
                        lon = -lon;
                    }
                    latitude = lat.toFixed(6);
                    longitude = lon.toFixed(6);
                    basic.Lat = latitude;
                    basic.Lon = longitude;
                    /*photoedTime=photoedTime.replace(':','-');
                    couverinfo.Phototime=photoedTime.replace(':','-')*/
                }
                else {
                    alert("This photo does not have location information, it cannot be uploaded");
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
            resolve([latitude, longitude, photoedTime]);
        });
    };
    BasicPage.prototype.presentAlert = function (title, content) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: content,
            buttons: ['OK']
        });
        alert.present();
    };
    BasicPage.prototype.upload = function () {
        var _this = this;
        if (this.basicinfo.Lat && this.basicinfo.Lon) {
            this.loader = this.loading.create({
                duration: 60000,
                content: 'Uploading infomation. Please wait...'
            });
            this.loader.onDidDismiss(function () {
                _this.presentAlert("Time out", "Time out. No connection to server.");
            });
            this.loader.present();
            this.service.uploadBasic(this.basicinfo)
                .subscribe(function (resp) {
                _this.loader.onDidDismiss(function () {
                    console.log("Connection success");
                });
                _this.loader.dismiss();
                if (resp == "200") {
                    _this.presentAlert("Operation success", "Thank you for your contribution!");
                    _this.Image = "";
                }
                else {
                    alert("Bad Request");
                    _this.Image = "";
                }
            }, function (err) {
                _this.loader.dismiss();
                alert("Error happened");
                _this.Image = "";
            });
            this.Image = "";
            this.initCouverinfo();
        }
        else {
            alert("Please Upload full basic info, Picture with out loaction information will not be able to upload");
            this.cancelUpload();
        }
    };
    BasicPage.prototype.cancelUpload = function () {
        this.Image = "";
        this.initCouverinfo();
    };
    BasicPage.prototype.initCouverinfo = function () {
        this.basicinfo.Pic = "";
        this.basicinfo.Phototime = "";
        this.basicinfo.Orientation = "";
        this.basicinfo.Description = "";
        this.basicinfo.Lat = null;
        this.basicinfo.Lon = null;
    };
    BasicPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-basic',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\basic\basic.html"*/'<!--\n\n  Generated template for the CulvertPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="primary">\n\n        <ion-title>Upload Basic Image</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div *ngIf="!Image">\n\n        <div id="upload_button">\n\n            <label>\n\n      <ion-label id="fileChoose" color="primary">\n\n        <input class="ionic-item" type="file" accept="image/*" (change)="changeListener($event)">\n\n       <ion-icon name="albums"></ion-icon>\n\n        <span class="btn btn-primary">&nbsp;Explore Image</span>\n\n      </ion-label>\n\n    </label>\n\n        </div>\n\n    </div>\n\n\n\n    <div *ngIf="Image">\n\n        <div>\n\n            <br><img class="image-client" [src]="Image" *ngIf="Image" height="200" width="200" />\n\n        </div>\n\n        <ion-list>\n\n            <!--<ion-card>\n\n              <ion-item>\n\n                  <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n\n              </ion-item>\n\n          </ion-card>-->\n\n            <ion-card *ngIf="basicinfo.Lat">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Latitude: {{basicinfo.Lat}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="basicinfo.Lon">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; longitude: {{basicinfo.Lon}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="basicinfo.Orientation">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Direction: {{basicinfo.Orientation}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="basicinfo.Phototime">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Photoed Time : {{basicinfo.Phototime}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n\n\n            <!--<ion-card>\n\n              <ion-item>\n\n                  <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n              </ion-item>\n\n          </ion-card>-->\n\n            <!--<ion-item *ngIf="!couverinfo.Phototime">\n\n              <ion-label floating> &nbsp; Click here to select photoed Time</ion-label>\n\n              <ion-datetime displayFormat="YYYY-MM-DD HH:mm" [(ngModel)]="couverinfo.Phototime"></ion-datetime>\n\n          </ion-item>-->\n\n        </ion-list>\n\n\n\n        <!--<button ion-button (click)="uploadCouvert()" clear>Upload Information</button>\n\n      <button ion-button (click)="cancelUpload()" clear>Cancel</button>-->\n\n    </div>\n\n\n\n\n\n\n\n\n\n    <div *ngIf="Image">\n\n\n\n\n\n        <div *ngIf="basicinfo.Lat">\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{basicinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="basicinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>\n\n            <button ion-button (click)="upload()" clear>Upload Information</button>\n\n        </div>\n\n        <div *ngIf="!basicinfo.Lat">\n\n            <ion-card>\n\n                <ion-item>\n\n                    <label>This photo does not have location information, it cannot be uploaded</label>\n\n                </ion-item>\n\n            </ion-card>\n\n        </div>\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>\n\n    </div>\n\n\n\n</ion-content>\n\n<ion-footer>\n\n    <div style="text-align: center;font-size: 100%">\n\n        <p>*Please turn on your location settings before using this app or upload the images having location tags from gallery.</p>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\basic\basic.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], BasicPage);
    return BasicPage;
}());

//# sourceMappingURL=basic.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebrisJamsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_exif_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_exif_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_models__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DebrisJamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DebrisJamsPage = /** @class */ (function () {
    function DebrisJamsPage(navCtrl, navParams, service, loading, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.djinfo = new __WEBPACK_IMPORTED_MODULE_4__models_models__["c" /* DebrisjamsInfoModel */];
        this.showLowEnd = false;
    }
    DebrisJamsPage.prototype.ionViewDidLoad = function () {
        this.currentUser = localStorage.getItem('CurrentUser');
        this.djinfo.Uploader = this.currentUser;
        console.log('ionViewDidLoad CulvertPage');
    };
    DebrisJamsPage.prototype.readThis = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        this.getExifData(file, this.djinfo)
            .then(function (res) {
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.Image = myReader.result;
                var str = _this.Image.split('base64,');
                _this.djinfo.Pic = str[1];
            };
            myReader.readAsDataURL(file);
        });
        /* this.couverinfo.Lat=result[0];
         this.couverinfo.Lon=result[1];
         this.couverinfo.Phototime=result[2];*/
        /* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
        this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
        this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    };
    DebrisJamsPage.prototype.changeListener = function ($event) {
        this.readThis($event.target);
    };
    DebrisJamsPage.prototype.getExifData = function (file, sf) {
        return new Promise(function (resolve) {
            var latitude, longitude, photoedTime;
            __WEBPACK_IMPORTED_MODULE_2_exif_js__["getData"](file, function () {
                var Lat = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, "GPSLatitude");
                var LatRef = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLatitudeRef');
                var Lon = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLongitude');
                var LonRef = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLongitudeRef');
                photoedTime = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'DateTimeOriginal');
                var lat;
                lat = null;
                var lon;
                lon = null;
                if (Lat && Lon) {
                    if (typeof (Lat[0].numerator) != "undefined") {
                        console.log(Lat[0].numerator);
                        lat = Lat[0].numerator / Lat[0].denominator
                            + Lat[1].numerator / (60 * Lat[1].denominator)
                            + Lat[2].numerator / (3600 * Lat[2].denominator);
                        lon = Lon[0].numerator / Lon[0].denominator
                            + Lon[1].numerator / (60 * Lon[1].denominator)
                            + Lon[2].numerator / (3600 * Lon[2].denominator);
                    }
                    else {
                        lat = Lat[0] + Lat[1] / 60 + Lat[2] / 3600;
                        lon = Lon[0] + Lon[1] / 60 + Lon[2] / 3600;
                    }
                    console.log(LonRef);
                    if (LatRef == "S") {
                        lat = -lat;
                    }
                    if (LonRef == "W") {
                        lon = -lon;
                    }
                    latitude = lat.toFixed(6);
                    longitude = lon.toFixed(6);
                    sf.Lat = latitude;
                    sf.Lon = longitude;
                    /*photoedTime=photoedTime.replace(':','-');
                    couverinfo.Phototime=photoedTime.replace(':','-')*/
                }
                else {
                    alert("This photo does not have location information, it cannot be uploaded");
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
            resolve([latitude, longitude, photoedTime]);
        });
    };
    DebrisJamsPage.prototype.presentAlert = function (title, content) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: content,
            buttons: ['OK']
        });
        alert.present();
    };
    DebrisJamsPage.prototype.upload = function () {
        var _this = this;
        if (this.djinfo.Lat && this.djinfo.Lon) {
            this.loader = this.loading.create({
                duration: 60000,
                content: 'Uploading infomation. Please wait...'
            });
            this.loader.onDidDismiss(function () {
                _this.presentAlert("Time out", "Time out. No connection to server.");
            });
            this.loader.present();
            this.service.uploadDebris(this.djinfo)
                .subscribe(function (resp) {
                _this.loader.onDidDismiss(function () {
                    console.log("Connection success");
                });
                _this.loader.dismiss();
                if (resp == "200") {
                    _this.presentAlert("Operation success", "Thank you for your contribution!");
                    _this.Image = "";
                }
                else {
                    alert("Bad Request");
                    _this.Image = "";
                }
            }, function (err) {
                _this.loader.dismiss();
                alert("Error happened");
                _this.Image = "";
            });
            this.Image = "";
            this.initCouverinfo();
        }
        else {
            alert("Please Upload full Debris Jams info, Picture with out loaction information will not be able to upload");
            this.cancelUpload();
        }
    };
    DebrisJamsPage.prototype.cancelUpload = function () {
        this.Image = "";
        this.initCouverinfo();
    };
    DebrisJamsPage.prototype.initCouverinfo = function () {
        this.djinfo.Pic = "";
        this.djinfo.Phototime = "";
        this.djinfo.Orientation = "";
        this.djinfo.Description = "";
        this.djinfo.Direction = "";
        this.djinfo.Lat = null;
        this.djinfo.Lon = null;
    };
    DebrisJamsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-debris-jams',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\debris-jams\debris-jams.html"*/'<!--\n\n  Generated template for the CulvertPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="primary">\n\n        <ion-title>Upload Debris Jams Image</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div *ngIf="!Image">\n\n        <div id="upload_button">\n\n            <label>\n\n        <ion-label id="fileChoose" color="primary">\n\n          <input class="ionic-item" type="file" accept="image/*" (change)="changeListener($event)">\n\n         <ion-icon name="albums"></ion-icon>\n\n          <span class="btn btn-primary">&nbsp;Explore Image</span>\n\n        </ion-label>\n\n      </label>\n\n        </div>\n\n    </div>\n\n\n\n    <div *ngIf="Image">\n\n        <div>\n\n            <br><img class="image-client" [src]="Image" *ngIf="Image" height="200" width="200" />\n\n        </div>\n\n        <ion-list>\n\n            <!--<ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>-->\n\n            <ion-card *ngIf="djinfo.Lat">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Latitude: {{djinfo.Lat}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="djinfo.Lon">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; longitude: {{djinfo.Lon}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="djinfo.Orientation">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Direction: {{djinfo.Orientation}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="djinfo.Phototime">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Photoed Time : {{djinfo.Phototime}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n\n\n            <!--<ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>-->\n\n            <!--<ion-item *ngIf="!couverinfo.Phototime">\n\n                <ion-label floating> &nbsp; Click here to select photoed Time</ion-label>\n\n                <ion-datetime displayFormat="YYYY-MM-DD HH:mm" [(ngModel)]="couverinfo.Phototime"></ion-datetime>\n\n            </ion-item>-->\n\n        </ion-list>\n\n\n\n        <!--<button ion-button (click)="uploadCouvert()" clear>Upload Information</button>\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>-->\n\n    </div>\n\n\n\n\n\n\n\n\n\n    <div *ngIf="Image">\n\n\n\n        <div *ngIf="djinfo.Lat">\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{djinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="djinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label>Direction:</ion-label>\n\n                    <ion-select [(ngModel)]="djinfo.Direction" placeholder="Chose a Direction">\n\n                        <ion-option value="North">North</ion-option>\n\n                        <ion-option value="NorthEast">NorthEast</ion-option>\n\n                        <ion-option value="East">East</ion-option>\n\n                        <ion-option value="SouthEast">SouthEast</ion-option>\n\n                        <ion-option value="South">South</ion-option>\n\n                        <ion-option value="SouthWest">SouthWest</ion-option>\n\n                        <ion-option value="West">West</ion-option>\n\n                        <ion-option value="NorthWest">NorthWest</ion-option>\n\n                    </ion-select>\n\n                </ion-item>\n\n            </ion-card>\n\n            <button ion-button (click)="upload()" clear>Upload Information</button>\n\n        </div>\n\n        <div *ngIf="!djinfo.Lat">\n\n            <ion-card>\n\n                <ion-item>\n\n                    <label>This photo does not have location information, it cannot be uploaded</label>\n\n                </ion-item>\n\n            </ion-card>\n\n        </div>\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <div style="text-align: center;font-size: 100%">\n\n        <p>*Please turn on your location settings before using this app or upload the images having location tags from gallery.</p>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\debris-jams\debris-jams.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], DebrisJamsPage);
    return DebrisJamsPage;
}());

//# sourceMappingURL=debris-jams.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_models__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.User = new __WEBPACK_IMPORTED_MODULE_2__models_models__["e" /* UserInfoModel */];
        this.home = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        if (this.User.username != "" && this.User.pwd != "") {
            if (this.User.pwd == this.ConfirmPWD) {
                if (!this.User.username.includes("/")
                    && !this.User.pwd.includes("/")
                    && !this.User.username.includes(" ")
                    && !this.User.pwd.includes(" ")
                    && !this.User.username.includes("$")
                    && !this.User.pwd.includes("$")
                    && !this.User.username.includes('\\')
                    && !this.User.pwd.includes('\\')
                    && !this.User.username.includes("#")
                    && !this.User.pwd.includes("#")
                    && !this.User.username.includes("-")
                    && !this.User.pwd.includes("-")
                    && !this.User.username.includes("&")
                    && !this.User.pwd.includes("&")
                    && !this.User.username.includes("+")
                    && !this.User.pwd.includes("+")
                    && !this.User.username.includes("_")
                    && !this.User.pwd.includes("_")
                    && !this.User.username.includes("(")
                    && !this.User.pwd.includes("(")
                    && !this.User.username.includes(")")
                    && !this.User.pwd.includes(")")) {
                    this.service.signup(this.User.username, this.User.pwd)
                        .subscribe(function (data) {
                        console.log(data);
                        if (data == _this.User.username) {
                            localStorage.setItem('CurrentUser', _this.User.username);
                            _this.navCtrl.setRoot(_this.home);
                            _this.navCtrl.popToRoot;
                        }
                        else if (data == "existed") {
                            alert("username has already existed");
                        }
                    }, function (err) {
                        console.log(err.error);
                    });
                }
                else {
                    alert("Username and password should not contain slash, space, $, \\, #, +, -, (, )");
                }
            }
            else {
                alert("Password and Confirm Password are not matched, Please check again.");
            }
            /* .subscribe((resp) => {
    
                console.log("hello");
                alert(resp)
                //this.img.ID=uuid;
               
                
              }, (err) => {
                
                console.log(err);
              });*/
        }
        else {
            alert("Username and Password cannot be null.");
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\signup\signup.html"*/'<!--\n\n  Generated template for the SignupPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="primary">\n\n        <ion-title>Signup</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n\n\n        <ion-item>\n\n            <ion-label stacked>Username</ion-label>\n\n            <ion-input type="text" [(ngModel)]="User.username"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label stacked>Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="User.pwd"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label stacked>Confirm Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="ConfirmPWD"></ion-input>\n\n        </ion-item>\n\n    </ion-list>\n\n    <button ion-button outline (click)="signup()" full>sign up</button>\n\n</ion-content>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StreamflowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_exif_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_exif_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_exif_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_models__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the StreamflowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StreamflowPage = /** @class */ (function () {
    function StreamflowPage(navCtrl, navParams, service, loading, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.sfinfo = new __WEBPACK_IMPORTED_MODULE_4__models_models__["d" /* StreamflowInfoModel */];
        this.showLowEnd = false;
    }
    StreamflowPage.prototype.ionViewDidLoad = function () {
        this.currentUser = localStorage.getItem('CurrentUser');
        this.sfinfo.Uploader = this.currentUser;
        console.log('ionViewDidLoad CulvertPage');
    };
    StreamflowPage.prototype.readThis = function (inputValue) {
        var _this = this;
        var file = inputValue.files[0];
        this.getExifData(file, this.sfinfo)
            .then(function (res) {
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.Image = myReader.result;
                var str = _this.Image.split('base64,');
                _this.sfinfo.Pic = str[1];
            };
            myReader.readAsDataURL(file);
        });
        /* this.couverinfo.Lat=result[0];
         this.couverinfo.Lon=result[1];
         this.couverinfo.Phototime=result[2];*/
        /* this.couverinfo.Lat=Number(localStorage.getItem('exifLat'));
        this.couverinfo.Lon=Number(localStorage.getItem('exifLon'));
        this.couverinfo.Phototime=localStorage.getItem('PhotoedTime')*/
    };
    StreamflowPage.prototype.changeListener = function ($event) {
        this.readThis($event.target);
    };
    StreamflowPage.prototype.getExifData = function (file, sf) {
        return new Promise(function (resolve) {
            var latitude, longitude, photoedTime;
            __WEBPACK_IMPORTED_MODULE_2_exif_js__["getData"](file, function () {
                var Lat = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, "GPSLatitude");
                var LatRef = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLatitudeRef');
                var Lon = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLongitude');
                var LonRef = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'GPSLongitudeRef');
                photoedTime = __WEBPACK_IMPORTED_MODULE_2_exif_js__["getTag"](this, 'DateTimeOriginal');
                var lat;
                lat = null;
                var lon;
                lon = null;
                if (Lat && Lon) {
                    if (typeof (Lat[0].numerator) != "undefined") {
                        console.log(Lat[0].numerator);
                        lat = Lat[0].numerator / Lat[0].denominator
                            + Lat[1].numerator / (60 * Lat[1].denominator)
                            + Lat[2].numerator / (3600 * Lat[2].denominator);
                        lon = Lon[0].numerator / Lon[0].denominator
                            + Lon[1].numerator / (60 * Lon[1].denominator)
                            + Lon[2].numerator / (3600 * Lon[2].denominator);
                    }
                    else {
                        lat = Lat[0] + Lat[1] / 60 + Lat[2] / 3600;
                        lon = Lon[0] + Lon[1] / 60 + Lon[2] / 3600;
                    }
                    console.log(LonRef);
                    if (LatRef == "S") {
                        lat = -lat;
                    }
                    if (LonRef == "W") {
                        lon = -lon;
                    }
                    latitude = lat.toFixed(6);
                    longitude = lon.toFixed(6);
                    sf.Lat = latitude;
                    sf.Lon = longitude;
                    /*photoedTime=photoedTime.replace(':','-');
                    couverinfo.Phototime=photoedTime.replace(':','-')*/
                }
                else {
                    alert("This photo does not have location information, it cannot be uploaded");
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
            resolve([latitude, longitude, photoedTime]);
        });
    };
    StreamflowPage.prototype.presentAlert = function (title, content) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: content,
            buttons: ['OK']
        });
        alert.present();
    };
    StreamflowPage.prototype.upload = function () {
        var _this = this;
        if (this.sfinfo.Lat && this.sfinfo.Lon) {
            this.loader = this.loading.create({
                duration: 60000,
                content: 'Uploading infomation. Please wait...'
            });
            this.loader.onDidDismiss(function () {
                _this.presentAlert("Time out", "Time out. No connection to server.");
            });
            this.loader.present();
            this.service.uploadStreamflow(this.sfinfo)
                .subscribe(function (resp) {
                _this.loader.onDidDismiss(function () {
                    console.log("Connection success");
                });
                _this.loader.dismiss();
                if (resp == "200") {
                    _this.presentAlert("Operation success", "Thank you for your contribution!");
                    _this.Image = "";
                }
                else {
                    alert("Bad Request");
                    _this.Image = "";
                }
            }, function (err) {
                _this.loader.dismiss();
                alert("Error happened");
                _this.Image = "";
            });
            this.Image = "";
            this.initCouverinfo();
        }
        else {
            alert("Please Upload full Stream Flow info, Picture with out loaction information will not be able to upload");
            this.cancelUpload();
        }
    };
    StreamflowPage.prototype.cancelUpload = function () {
        this.Image = "";
        this.initCouverinfo();
    };
    StreamflowPage.prototype.initCouverinfo = function () {
        this.sfinfo.Pic = "";
        this.sfinfo.Phototime = "";
        this.sfinfo.Orientation = "";
        this.sfinfo.Description = "";
        this.sfinfo.Area = "";
        this.sfinfo.Level = "";
        this.sfinfo.Lat = null;
        this.sfinfo.Lon = null;
    };
    StreamflowPage.prototype.optionsFn = function () {
        alert(this.sfinfo.Area);
    };
    StreamflowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-streamflow',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\streamflow\streamflow.html"*/'<!--\n\n  Generated template for the CulvertPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="primary">\n\n        <ion-title>Upload Streamflow Image</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <div *ngIf="!Image">\n\n        <div id="upload_button">\n\n            <label>\n\n      <ion-label id="fileChoose" color="primary">\n\n        <input class="ionic-item" type="file" accept="image/*" (change)="changeListener($event)">\n\n       <ion-icon name="albums"></ion-icon>\n\n        <span class="btn btn-primary">&nbsp;Explore Image</span>\n\n      </ion-label>\n\n    </label>\n\n        </div>\n\n    </div>\n\n\n\n    <div *ngIf="Image">\n\n        <div>\n\n            <br><img class="image-client" [src]="Image" *ngIf="Image" height="200" width="200" />\n\n        </div>\n\n        <ion-list>\n\n            <!--<ion-card>\n\n              <ion-item>\n\n                  <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n\n              </ion-item>\n\n          </ion-card>-->\n\n            <ion-card *ngIf="sfinfo.Lat">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Latitude: {{sfinfo.Lat}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="sfinfo.Lon">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; longitude: {{sfinfo.Lon}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="sfinfo.Orientation">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Direction: {{sfinfo.Orientation}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="sfinfo.Phototime">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Photoed Time : {{sfinfo.Phototime}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n\n\n            <!--<ion-card>\n\n              <ion-item>\n\n                  <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n              </ion-item>\n\n          </ion-card>-->\n\n            <!--<ion-item *ngIf="!couverinfo.Phototime">\n\n              <ion-label floating> &nbsp; Click here to select photoed Time</ion-label>\n\n              <ion-datetime displayFormat="YYYY-MM-DD HH:mm" [(ngModel)]="couverinfo.Phototime"></ion-datetime>\n\n          </ion-item>-->\n\n        </ion-list>\n\n\n\n        <!--<button ion-button (click)="uploadCouvert()" clear>Upload Information</button>\n\n      <button ion-button (click)="cancelUpload()" clear>Cancel</button>-->\n\n    </div>\n\n\n\n\n\n\n\n\n\n    <div *ngIf="Image">\n\n        <div *ngIf="sfinfo.Lat">\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{sfinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="sfinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label>Agricultural/Urban:</ion-label>\n\n                    <ion-select [(ngModel)]="sfinfo.Area" placeholder="agricultural">\n\n                        <ion-option value="agricultural">agricultural</ion-option>\n\n                        <ion-option value="urban">urban</ion-option>\n\n                    </ion-select>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label>flow Level:</ion-label>\n\n                    <ion-select [(ngModel)]="sfinfo.Level" placeholder="Chose a level">\n\n                        <ion-option value="low">low</ion-option>\n\n                        <ion-option value="medium">medium</ion-option>\n\n                        <ion-option value="high">high</ion-option>\n\n                        <ion-option value="extreme">extreme</ion-option>\n\n                    </ion-select>\n\n                </ion-item>\n\n            </ion-card>\n\n            <button ion-button (click)="upload()" clear>Upload Information</button>\n\n        </div>\n\n        <div *ngIf="!sfinfo.Lat">\n\n            <ion-card>\n\n                <ion-item>\n\n                    <label>This photo does not have location information, it cannot be uploaded</label>\n\n                </ion-item>\n\n            </ion-card>\n\n        </div>\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>\n\n    </div>\n\n\n\n</ion-content>\n\n<ion-footer>\n\n    <div style="text-align: center;font-size: 100%">\n\n        <p>*Please turn on your location settings before using this app or upload the images having location tags from gallery.</p>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\streamflow\streamflow.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], StreamflowPage);
    return StreamflowPage;
}());

//# sourceMappingURL=streamflow.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_models__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_orientation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, platform, service, geolocation, loading, deviceOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.service = service;
        this.geolocation = geolocation;
        this.loading = loading;
        this.deviceOrientation = deviceOrientation;
        this.url = "http://159.89.127.33:443/";
        this.loadingmark = "Loading Information Marks...";
        this.couvertinfoList = [];
        this.basicinfoList = [];
        this.sfinfoList = [];
        this.djinfoList = [];
        this.couverinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["b" /* CouvertInfoModel */];
        this.MyLocationMap = new Map();
        this.markerList = new Array();
        /*this.MyLocationMarker=new google.maps.Marker*/
    }
    MapPage_1 = MapPage;
    MapPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPage');
        console.log(this.mapRef);
        this.showMap();
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
    };
    MapPage.prototype.changeMap = function () {
        if (this.currentMap == "Basic") {
            this.removeMarkers();
            this.loadBasic();
            this.loadingmark = "Basic Map";
        }
        else if (this.currentMap == "Culvert") {
            this.removeMarkers();
            this.loadCouverts();
            this.loadingmark = "Culvert Map";
        }
        else if (this.currentMap == "Stream Flow") {
            this.removeMarkers();
            this.loadStreamflow();
            this.loadingmark = "Stream Flow Map";
        }
        else if (this.currentMap == "Debirs Jams") {
            this.removeMarkers();
            this.loadDebrisjams();
            this.loadingmark = "Debirs Jams Map";
        }
        else if (this.currentMap == "All") {
            this.loadAll();
            this.loadingmark = "DWS MAP General";
        }
    };
    MapPage.prototype.getLocation = function (couverinfo) {
        var loading = this.loading.create({
            content: 'Getting your location,Please wait...'
        });
        loading.present();
        this.geolocation.getCurrentPosition().then(function (resp) {
            couverinfo.Lat = resp.coords.latitude; // resp.coords.latitude
            couverinfo.Lon = resp.coords.longitude; // resp.coords.longitude
            loading.dismiss();
        }).catch(function (error) {
            console.log('Failed getting your location', error);
            loading.dismiss();
            alert("Failed to get your location");
        });
    };
    MapPage.prototype.loadAll = function () {
        this.removeMarkers();
        this.loadBasic();
        this.loadCouverts();
        this.loadStreamflow();
        this.loadDebrisjams();
        return true;
    };
    MapPage.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    MapPage.prototype.showMap = function () {
        var location = new google.maps.LatLng(52.132854, -106.631401);
        var lat;
        var lon;
        var options = {
            center: location,
            zoom: 10
        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        /*this.gotoMyPosition();*/
        this.gotoMYpostionWeb();
        this.loadBasic();
        this.loadCouverts();
        this.loadStreamflow();
        this.loadDebrisjams();
        this.loadingmark = "DWS MAP General";
    };
    MapPage.prototype.reload = function () {
        this.navCtrl.push(MapPage_1);
    };
    MapPage.prototype.gotoMYpostionWeb = function () {
        console.log("hello");
        this.loader = this.loading.create({
            duration: 5000,
            content: 'Getting your location, it may take a minute. Please wait...',
            dismissOnPageChange: true
        });
        this.loader.onDidDismiss(function () {
            alert("Cannot get your location");
        });
        var lat, lon;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    heading: position.coords.accuracy
                };
                lat = pos.lat.toFixed(6);
                console.log(lat);
                localStorage.setItem('Lat', lat);
                lon = pos.lng.toFixed(6);
                localStorage.setItem('Lon', lon);
            }, function () {
                alert("Cannot get your current location");
            });
        }
        else {
            alert("Your broswer do not support geolocation.");
        }
        var myLat = localStorage.getItem('Lat');
        var myLon = localStorage.getItem('Lon');
        if (myLat && myLon) {
            this.loader.onDidDismiss(function () {
                console.log("Into your location");
            });
            this.loader.dismiss();
            console.log("setting");
            var pos = new google.maps.LatLng(myLat, myLon);
            this.map.setCenter(pos);
            if (this.MyLocationMap.get('currentPosMarker')) {
                this.MyLocationMap.get('currentPosMarker').setMap(null);
            }
            var MyPos = "assets/icon/bluecircle.png";
            var marker = new google.maps.Marker({
                position: pos,
                map: this.map,
                icon: MyPos
            });
            this.MyLocationMap.set('currentPosMarker', marker);
            var infowindow = new google.maps.InfoWindow;
            marker.addListener('click', function () {
                infowindow.setContent('Your server location.');
                infowindow.open(this.map, marker);
            });
        }
    };
    MapPage.prototype.gotoMyPosition = function () {
        var _this = this;
        this.loader = this.loading.create({
            duration: 5000,
            content: 'Getting your location, it may take a minute. Please wait...',
            dismissOnPageChange: true
        });
        this.loader.onDidDismiss(function () {
            alert("Cannot get your location");
        });
        this.loader.present();
        var lat, lon;
        var options = {
            enableHighAccuracy: true
        };
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* LocationService */].getMyLocation(options).then(function (myLocation) {
            lat = myLocation.latLng.lat;
            lon = myLocation.latLng.lng;
            _this.loader.onDidDismiss(function () {
                console.log("Into your location");
            });
            _this.loader.dismiss();
            var location = new google.maps.LatLng(lat, lon);
            _this.map.setCenter(location);
            /*var infowindow = new google.maps.InfoWindow
            infowindow.setPosition(location);
            infowindow.setContent('You are here');
            infowindow.open(this.map);*/
            if (_this.MyLocationMap.get('currentPosMarker')) {
                _this.MyLocationMap.get('currentPosMarker').setMap(null);
            }
            var MyPos = "assets/icon/bluecircle.png";
            var marker = new google.maps.Marker({
                position: location,
                map: _this.map,
                icon: MyPos
            });
            _this.MyLocationMap.set('currentPosMarker', marker);
            var infowindow = new google.maps.InfoWindow;
            marker.addListener('click', function () {
                infowindow.setContent('Your are here');
                infowindow.open(this.map, marker);
            });
            /*this.MyLocationMarker= new google.maps.Marker({
              position: location,
              map: this.map,
            });
            var infowindow = new google.maps.InfoWindow
            this.MyLocationMarker.addListener('click', function() {
              infowindow.setContent('Your Location');
              infowindow.open(this.map,this.MyLocationMarker)
            });*/
        }).catch(function (err) {
            alert(err);
            _this.loader.dismiss();
        });
    };
    MapPage.prototype.addMarker = function (position, map, culvert) {
        var culvertIcon = "assets/icon/pinkdot.png";
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
                url: culvertIcon,
                scaledSize: new google.maps.Size(38, 38)
            }
        });
        /*var infowindow = new google.maps.InfoWindow({
          content: content
        });*/
        var infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
        var content = '<a href="' + this.url + culvert.LowPic + '" target="_blank">Low End Image</a>'
            + '<br><br><a href="' + this.url + culvert.HighPic + '" target="_blank">High End Image</a>:&nbsp;&nbsp;&nbsp;'
            + '<br><br>Low End Latitude:&nbsp;&nbsp;&nbsp;' + culvert.LowLat
            + '<br><br>Low End Longitude:&nbsp;&nbsp;&nbsp;' + culvert.LowLon
            + '<br><br>High End Latitude:&nbsp;&nbsp;&nbsp;' + culvert.HighLat
            + '<br><br>High End Longitude:&nbsp;&nbsp;&nbsp;' + culvert.HighLon
            + '<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;' + culvert.Uploader;
        if (culvert.Description) {
            content = content + '<br><br>Description:&nbsp;&nbsp;&nbsp;' + culvert.Description;
        }
        if (culvert.Orientation) {
            content = content + '<br><br>Direction:&nbsp;&nbsp;&nbsp;' + culvert.Orientation;
        }
        marker.addListener('click', function () {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });
        this.markerList.push(marker);
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
    };
    MapPage.prototype.addBasicMarker = function (position, map, basic) {
        console.log(position);
        console.log(basic);
        var BasicIcon = "assets/icon/bluedot.png";
        var marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: {
                url: BasicIcon,
                scaledSize: new google.maps.Size(43, 43)
            }
        });
        /*var infowindow = new google.maps.InfoWindow({
          content: content
        });*/
        var infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
        var content = '<a href="' + this.url + basic.Pic + '" target="_blank">Image</a>'
            + '<br><br>Latitude:&nbsp;&nbsp;&nbsp;' + basic.Lat
            + '<br><br>Longitude:&nbsp;&nbsp;&nbsp;' + basic.Lon
            + '<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;' + basic.Uploader;
        if (basic.Description) {
            content = content + '<br><br>Description:&nbsp;&nbsp;&nbsp;' + basic.Description;
        }
        if (basic.Orientation) {
            content = content + '<br><br>Direction:&nbsp;&nbsp;&nbsp;' + basic.Orientation;
        }
        marker.addListener('click', function () {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });
        this.markerList.push(marker);
    };
    MapPage.prototype.addSfMarker = function (position, map, sf) {
        var SfIcon = "assets/icon/greendot.png";
        var marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: {
                url: SfIcon,
                scaledSize: new google.maps.Size(33, 33)
            }
        });
        /*var infowindow = new google.maps.InfoWindow({
          content: content
        });*/
        var infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
        var content = '<a href="' + this.url + sf.Pic + '" target="_blank">Image</a>'
            + '<br><br>Latitude:&nbsp;&nbsp;&nbsp;' + sf.Lat
            + '<br><br>Longitude:&nbsp;&nbsp;&nbsp;' + sf.Lon
            + '<br><br>Agricultural/Urban:&nbsp;&nbsp;&nbsp;' + sf.Area
            + '<br><br>Flow Level:&nbsp;&nbsp;&nbsp;' + sf.Level
            + '<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;' + sf.Uploader;
        if (sf.Description) {
            content = content + '<br><br>Description:&nbsp;&nbsp;&nbsp;' + sf.Description;
        }
        if (sf.Orientation) {
            content = content + '<br><br>Direction:&nbsp;&nbsp;&nbsp;' + sf.Orientation;
        }
        marker.addListener('click', function () {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });
        this.markerList.push(marker);
    };
    MapPage.prototype.addDjMarker = function (position, map, dj) {
        var DjIcon = "assets/icon/yellowdot.png";
        var marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: {
                url: DjIcon,
                scaledSize: new google.maps.Size(28, 28)
            }
        });
        /*var infowindow = new google.maps.InfoWindow({
          content: content
        });*/
        var infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
        var content = '<a href="' + this.url + dj.Pic + '" target="_blank">Image</a>'
            + '<br><br>Latitude:&nbsp;&nbsp;&nbsp;' + dj.Lat
            + '<br><br>Longitude:&nbsp;&nbsp;&nbsp;' + dj.Lon
            + '<br><br>Direction:&nbsp;&nbsp;&nbsp;' + dj.Direction
            + '<br><br>Uploaded by:&nbsp;&nbsp;&nbsp;' + dj.Uploader;
        if (dj.Description) {
            content = content + '<br><br>Description:&nbsp;&nbsp;&nbsp;' + dj.Description;
        }
        if (dj.Orientation) {
            content = content + '<br><br>Direction:&nbsp;&nbsp;&nbsp;' + dj.Orientation;
        }
        marker.addListener('click', function () {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });
        this.markerList.push(marker);
    };
    MapPage.prototype.removeMarkers = function () {
        for (var i = 0; i < this.markerList.length; i++) {
            this.markerList[i].setMap(null);
        }
    };
    MapPage.prototype.resizePic = function (base64, callback) {
        var maxWidth = 200;
        var maxHeight = 200;
        var reslut;
        // Create and initialize two canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var canvasCopy = document.createElement("canvas");
        var copyContext = canvasCopy.getContext("2d");
        // Create original image
        var img = new Image();
        img.src = base64;
        var result;
        var resizeimg = img.onload = function () {
            // Determine new ratio based on max size
            var ratio = 1;
            if (img.width > maxWidth) {
                ratio = maxWidth / img.width;
            }
            else if (img.height > maxHeight) {
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
            base64 = canvas.toDataURL();
            callback(canvas.toDataURL());
        };
    };
    MapPage.prototype.loadBasic = function () {
        var _this = this;
        var loading = this.loading.create({
            dismissOnPageChange: true,
            content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
        });
        this.service.getAllBasic()
            .subscribe(function (resp) {
            if (resp) {
                resp.forEach(function (element) {
                    _this.basicinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["a" /* BasicInfoModel */];
                    _this.basicinfo.Description = element.Description;
                    _this.basicinfo.Uploader = element.Uploader;
                    _this.basicinfo.Phototime = element.Phototime;
                    _this.basicinfo.Lat = element.Lat;
                    _this.basicinfo.Lon = element.Lon;
                    _this.basicinfo.Pic = element.Pic;
                    _this.basicinfo.Orientation = element.Orientation;
                    _this.basicinfoList.push(_this.basicinfo);
                    var position = new google.maps.LatLng(_this.basicinfo.Lat, _this.basicinfo.Lon);
                    _this.addBasicMarker(position, _this.map, _this.basicinfo);
                });
                /*console.log(resp)
                console.log(this.couvertinfoList) */
                loading.dismiss();
            }
            else {
                console.log("no result");
            }
        }, function (err) {
            alert("Connot connect to couverts server");
            console.log("Cannot connect to couverts server");
        });
        return this.basicinfoList;
    };
    MapPage.prototype.loadCouverts = function () {
        var _this = this;
        var loading = this.loading.create({
            dismissOnPageChange: true,
            content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
        });
        this.service.getAllCouvert()
            .subscribe(function (resp) {
            if (resp) {
                resp.forEach(function (element) {
                    _this.couverinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["b" /* CouvertInfoModel */];
                    _this.couverinfo.Description = element.Description;
                    _this.couverinfo.Uploader = element.Uploader;
                    _this.couverinfo.Phototime = element.Phototime;
                    _this.couverinfo.LowLat = element.LowLat;
                    _this.couverinfo.LowLon = element.LowLon;
                    _this.couverinfo.LowPic = element.LowPic;
                    _this.couverinfo.HighLat = element.HighLat;
                    _this.couverinfo.HighLon = element.HighLon;
                    _this.couverinfo.HighPic = element.HighPic;
                    _this.couverinfo.Orientation = element.Orientation;
                    _this.couvertinfoList.push(_this.couverinfo);
                    var position = new google.maps.LatLng(_this.couverinfo.HighLat, _this.couverinfo.HighLon);
                    _this.addMarker(position, _this.map, _this.couverinfo);
                });
                /*console.log(resp)
                console.log(this.couvertinfoList) */
                loading.dismiss();
            }
            else {
                console.log("no result");
            }
        }, function (err) {
            alert("Connot connect to couverts server");
            console.log("Cannot connect to couverts server");
        });
        return this.couvertinfoList;
    };
    MapPage.prototype.loadStreamflow = function () {
        var _this = this;
        var loading = this.loading.create({
            dismissOnPageChange: true,
            content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
        });
        this.service.getAllStreamflow()
            .subscribe(function (resp) {
            if (resp) {
                resp.forEach(function (element) {
                    _this.sfinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["d" /* StreamflowInfoModel */];
                    _this.sfinfo.Description = element.Description;
                    _this.sfinfo.Uploader = element.Uploader;
                    _this.sfinfo.Phototime = element.Phototime;
                    _this.sfinfo.Lat = element.Lat;
                    _this.sfinfo.Lon = element.Lon;
                    _this.sfinfo.Pic = element.Pic;
                    _this.sfinfo.Orientation = element.Orientation;
                    _this.sfinfo.Area = element.Area;
                    _this.sfinfo.Level = element.Level;
                    _this.sfinfoList.push(_this.sfinfo);
                    var position = new google.maps.LatLng(_this.sfinfo.Lat, _this.sfinfo.Lon);
                    _this.addSfMarker(position, _this.map, _this.sfinfo);
                });
                /*console.log(resp)
                console.log(this.couvertinfoList) */
                loading.dismiss();
            }
            else {
                console.log("no result");
            }
        }, function (err) {
            alert("Connot connect to couverts server");
            console.log("Cannot connect to couverts server");
        });
        return this.sfinfoList;
    };
    MapPage.prototype.loadDebrisjams = function () {
        var _this = this;
        var loading = this.loading.create({
            dismissOnPageChange: true,
            content: 'Loading couverts, it may takes a minute.&nbsp;  Please wait...'
        });
        this.service.getAllDebrisjams()
            .subscribe(function (resp) {
            if (resp) {
                resp.forEach(function (element) {
                    _this.djinfo = new __WEBPACK_IMPORTED_MODULE_3__models_models__["c" /* DebrisjamsInfoModel */];
                    _this.djinfo.Description = element.Description;
                    _this.djinfo.Uploader = element.Uploader;
                    _this.djinfo.Phototime = element.Phototime;
                    _this.djinfo.Lat = element.Lat;
                    _this.djinfo.Lon = element.Lon;
                    _this.djinfo.Pic = element.Pic;
                    _this.djinfo.Orientation = element.Orientation;
                    _this.djinfo.Direction = element.Direction;
                    _this.djinfoList.push(_this.djinfo);
                    var position = new google.maps.LatLng(_this.djinfo.Lat, _this.djinfo.Lon);
                    _this.addDjMarker(position, _this.map, _this.djinfo);
                });
                /*console.log(resp)
                console.log(this.couvertinfoList) */
                loading.dismiss();
            }
            else {
                console.log("no result");
            }
        }, function (err) {
            alert("Connot connect to couverts server");
            console.log("Cannot connect to couverts server");
        });
        return this.djinfoList;
    };
    MapPage.prototype.ionViewWillLeave = function () {
        console.log("Looks like I'm about to leave :(");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapPage.prototype, "mapRef", void 0);
    MapPage = MapPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\map\map.html"*/'<!--\n\n  Generated template for the MapPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="primary">\n\n        <ion-title>{{loadingmark}}\n\n            <ion-icon name="ios-pin-outline" (click)="gotoMYpostionWeb()" style="float: right;"></ion-icon>\n\n        </ion-title>\n\n\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n        <ion-card>\n\n                <ion-item>\n\n                   <ion-label>Current Map:</ion-label>\n\n                   <ion-select [(ngModel)]="currentMap" placeholder="All" style=" margin: auto;" (ionChange)="changeMap()">\n\n                        <ion-option value="All">All</ion-option>\n\n                        <ion-option value="Basic">Basic</ion-option>\n\n                        <ion-option value="Culvert">Culvert</ion-option>\n\n                        <ion-option value="Stream Flow">Stream Flow</ion-option>\n\n                        <ion-option value="Debirs Jams">Debris Jams</ion-option>\n\n                       </ion-select>\n\n                  </ion-item>\n\n            </ion-card>\n\n        \n\n    <div #map id="map"></div>\n\n</ion-content>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\map\map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_orientation__["a" /* DeviceOrientation */]])
    ], MapPage);
    return MapPage;
    var MapPage_1;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/basic/basic.module": [
		296,
		6
	],
	"../pages/culvert/culvert.module": [
		297,
		5
	],
	"../pages/debris-jams/debris-jams.module": [
		298,
		4
	],
	"../pages/login/login.module": [
		299,
		3
	],
	"../pages/map/map.module": [
		300,
		2
	],
	"../pages/signup/signup.module": [
		301,
		1
	],
	"../pages/streamflow/streamflow.module": [
		302,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 167;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ApiProvider = /** @class */ (function () {
    function ApiProvider(http) {
        this.http = http;
        this.url = 'http://localhost:9000';
        this.url2 = 'http://10.0.2.2:9000';
        console.log('Hello ApiProvider Provider');
    }
    ApiProvider.prototype.get = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.get(this.url + '/' + endpoint, reqOpts);
    };
    ApiProvider.prototype.getAndroid = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.get(this.url2 + '/' + endpoint, reqOpts);
    };
    ApiProvider.prototype.post = function (endpoint, body, reqOpts) {
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    };
    ApiProvider.prototype.postAndroid = function (endpoint, body, reqOpts) {
        return this.http.post(this.url2 + '/' + endpoint, body, reqOpts);
    };
    ApiProvider.prototype.put = function (endpoint, body, reqOpts) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    };
    ApiProvider.prototype.delete = function (endpoint, reqOpts) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    };
    ApiProvider.prototype.patch = function (endpoint, body, reqOpts) {
        return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
    };
    ApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ApiProvider);
    return ApiProvider;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_api__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(http, api) {
        this.http = http;
        this.api = api;
        this.url = "http://159.89.127.33:443/v1/";
        /*urlAndroid="http://10.0.2.2:9000/"*/
        this.urlAndroid = "http://167.99.185.11:9005/";
        console.log('Hello ServiceProvider Provider');
    }
    ServiceProvider.prototype.signup = function (username, pwd) {
        var params = JSON.stringify({
            Username: username,
            Pwdhash: pwd
        });
        var seq = this.http.post(this.url + 'user', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'text' });
        return seq;
    };
    ServiceProvider.prototype.login = function (username, pwd) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("verify", username + "|" + pwd);
        var seq = this.http.get(this.url + 'user', { responseType: 'text', params: params });
        return seq;
    };
    ServiceProvider.prototype.signupAndroid = function (username, pwd) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("username", username)
            .append("pwd", pwd);
        console.log(params.toString());
        var seq = this.http.post(this.urlAndroid + 'login', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return seq;
    };
    ServiceProvider.prototype.loginAndroid = function (username, pwd) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            .append("username", username)
            .append("pwd", pwd);
        var seq = this.http.get(this.urlAndroid + 'login', { responseType: 'json', params: params });
        return seq;
    };
    ServiceProvider.prototype.getAllCouvert = function () {
        var seq = this.http.get(this.url + 'culvert_image', { responseType: 'json' });
        return seq;
    };
    ServiceProvider.prototype.getAllBasic = function () {
        var seq = this.http.get(this.url + 'basic_image', { responseType: 'json' });
        return seq;
    };
    ServiceProvider.prototype.getAllStreamflow = function () {
        var seq = this.http.get(this.url + 'streamflow', { responseType: 'json' });
        return seq;
    };
    ServiceProvider.prototype.getAllDebrisjams = function () {
        var seq = this.http.get(this.url + 'debris_jams', { responseType: 'json' });
        return seq;
    };
    ServiceProvider.prototype.uploadCouvert = function (culvert) {
        var params = JSON.stringify({
            Uploader: culvert.Uploader,
            LowLat: culvert.LowLat,
            LowLon: culvert.LowLon,
            LowPic: culvert.LowPic,
            HighLat: culvert.HighLat,
            HighLon: culvert.HighLon,
            HighPic: culvert.HighPic,
            Description: culvert.Description,
            Orientation: culvert.Orientation
        });
        console.log(params.toString());
        var seq = this.http.post(this.url + 'culvert_image', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'text' });
        return seq;
    };
    ServiceProvider.prototype.uploadBasic = function (basic) {
        var params = JSON.stringify({
            Uploader: basic.Uploader,
            Lat: basic.Lat,
            Lon: basic.Lon,
            Pic: basic.Pic,
            Description: basic.Description,
            Orientation: basic.Orientation
        });
        console.log(params.toString());
        var seq = this.http.post(this.url + 'basic_image', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'text' });
        return seq;
    };
    ServiceProvider.prototype.uploadStreamflow = function (sf) {
        var params = JSON.stringify({
            Uploader: sf.Uploader,
            Lat: sf.Lat,
            Lon: sf.Lon,
            Pic: sf.Pic,
            Description: sf.Description,
            Orientation: sf.Orientation,
            Area: sf.Area,
            Level: sf.Level
        });
        console.log(params.toString());
        var seq = this.http.post(this.url + 'streamflow', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'text' });
        return seq;
    };
    ServiceProvider.prototype.uploadDebris = function (dj) {
        var params = JSON.stringify({
            Uploader: dj.Uploader,
            Lat: dj.Lat,
            Lon: dj.Lon,
            Pic: dj.Pic,
            Description: dj.Description,
            Orientation: dj.Orientation,
            Direction: dj.Direction
        });
        console.log(params.toString());
        var seq = this.http.post(this.url + 'debris_jams', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'text' });
        return seq;
    };
    ServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__api_api__["a" /* ApiProvider */]])
    ], ServiceProvider);
    return ServiceProvider;
}());

//# sourceMappingURL=service.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(234);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_culvert_culvert__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_signup_signup__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device_orientation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_basic_basic__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_streamflow_streamflow__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_debris_jams_debris_jams__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_map_map__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_common_http__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_api_api__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_culvert_culvert__["a" /* CulvertPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_basic_basic__["a" /* BasicPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_streamflow_streamflow__["a" /* StreamflowPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_debris_jams_debris_jams__["a" /* DebrisJamsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/basic/basic.module#BasicPageModule', name: 'BasicPage', segment: 'basic', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/culvert/culvert.module#CulvertPageModule', name: 'CulvertPage', segment: 'culvert', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/debris-jams/debris-jams.module#DebrisJamsPageModule', name: 'DebrisJamsPage', segment: 'debris-jams', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/streamflow/streamflow.module#StreamflowPageModule', name: 'StreamflowPage', segment: 'streamflow', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_culvert_culvert__["a" /* CulvertPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_basic_basic__["a" /* BasicPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_streamflow_streamflow__["a" /* StreamflowPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_debris_jams_debris_jams__["a" /* DebrisJamsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_17__providers_api_api__["a" /* ApiProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_service_service__["a" /* ServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["a" /* HttpClient */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_device_orientation__["a" /* DeviceOrientation */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_geolocation__["a" /* Geolocation */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CouvertInfoModel; });
var CouvertInfoModel = /** @class */ (function () {
    function CouvertInfoModel() {
        this.Uploader = "";
        this.LowLon = null;
        this.LowLat = null;
        this.HighLon = null;
        this.HighLat = null;
        this.Phototime = "";
        this.LowPic = "";
        this.HighPic = "";
        this.Description = "";
        this.Orientation = "";
    }
    return CouvertInfoModel;
}());

//# sourceMappingURL=couvertInfo.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoModel; });
var UserInfoModel = /** @class */ (function () {
    function UserInfoModel() {
        this.username = "";
        this.pwd = "";
    }
    return UserInfoModel;
}());

//# sourceMappingURL=userInfo.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicInfoModel; });
var BasicInfoModel = /** @class */ (function () {
    function BasicInfoModel() {
        this.Uploader = "";
        this.Lon = null;
        this.Lat = null;
        this.Phototime = "";
        this.Pic = "";
        this.Description = "";
        this.Orientation = "";
    }
    return BasicInfoModel;
}());

//# sourceMappingURL=basicInfo.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StreamflowInfoModel; });
var StreamflowInfoModel = /** @class */ (function () {
    function StreamflowInfoModel() {
        this.Uploader = "";
        this.Lon = null;
        this.Lat = null;
        this.Phototime = "";
        this.Pic = "";
        this.Description = "";
        this.Orientation = "";
        this.Area = "";
        this.Level = "";
    }
    return StreamflowInfoModel;
}());

//# sourceMappingURL=streamflowInfo.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DebrisjamsInfoModel; });
var DebrisjamsInfoModel = /** @class */ (function () {
    function DebrisjamsInfoModel() {
        this.Uploader = "";
        this.Lon = null;
        this.Lat = null;
        this.Phototime = "";
        this.Pic = "";
        this.Description = "";
        this.Orientation = "";
        this.Direction = "";
    }
    return DebrisjamsInfoModel;
}());

//# sourceMappingURL=debrisjamsInfo.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__couvertInfo__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userInfo__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basicInfo__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__streamflowInfo__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__debrisjamsInfo__ = __webpack_require__(268);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__couvertInfo__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__userInfo__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__basicInfo__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__streamflowInfo__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__debrisjamsInfo__["a"]; });






//# sourceMappingURL=models.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signup_signup__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_models__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, service, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.geolocation = geolocation;
        this.User = new __WEBPACK_IMPORTED_MODULE_3__models_models__["e" /* UserInfoModel */];
        this.home = __WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */];
        this.Signuppage = __WEBPACK_IMPORTED_MODULE_0__signup_signup__["a" /* SignupPage */];
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signup = function () {
        var _this = this;
        if (this.User.username != "" && this.User.pwd != "") {
            this.service.signup(this.User.username, this.User.pwd)
                .subscribe(function (data) {
                console.log(data);
                if (data == "200") {
                    localStorage.setItem('CurrentUser', _this.User.username);
                    _this.navCtrl.setRoot(_this.home);
                    _this.navCtrl.popToRoot;
                }
                else if (data == "400") {
                    alert("username has already existed");
                }
            }, function (err) {
                console.log(err.error);
            });
            /* .subscribe((resp) => {
    
                console.log("hello");
                alert(resp)
                //this.img.ID=uuid;
               
                
              }, (err) => {
                
                console.log(err);
              });*/
        }
    };
    LoginPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude; // resp.coords.latitude
            _this.lon = resp.coords.longitude; // resp.coords.longitude
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        console.log("click");
        if (this.User.username != "" && this.User.pwd != "") {
            if (!this.User.username.includes("/")
                && !this.User.pwd.includes("/")
                && !this.User.username.includes(" ")
                && !this.User.pwd.includes(" ")
                && !this.User.username.includes("$")
                && !this.User.pwd.includes("$")
                && !this.User.username.includes('\\')
                && !this.User.pwd.includes('\\')
                && !this.User.username.includes("#")
                && !this.User.pwd.includes("#")
                && !this.User.username.includes("-")
                && !this.User.pwd.includes("-")
                && !this.User.username.includes("&")
                && !this.User.pwd.includes("&")
                && !this.User.username.includes("+")
                && !this.User.pwd.includes("+")
                && !this.User.username.includes("_")
                && !this.User.pwd.includes("_")
                && !this.User.username.includes("(")
                && !this.User.pwd.includes("(")
                && !this.User.username.includes(")")
                && !this.User.pwd.includes(")")) {
                this.service.login(this.User.username, this.User.pwd)
                    .subscribe(function (data) {
                    console.log(data);
                    if (data == "matched") {
                        localStorage.setItem('CurrentUser', _this.User.username);
                        _this.getLocation();
                        _this.navCtrl.setRoot(_this.home);
                        _this.navCtrl.popToRoot;
                    }
                    else if (data == "not matched") {
                        alert("Password not matched");
                    }
                    else if (data == "not existed") {
                        alert("no such a user");
                    }
                    else {
                        alert("connection error");
                    }
                }, function (err) {
                    alert(err.error);
                });
            }
            else {
                alert("Username and password should not contain slash, space, $, \\, #, +, -, (, )");
            }
        }
    };
    LoginPage.prototype.gotoSignup = function () {
        this.navCtrl.push(this.Signuppage);
    };
    LoginPage.prototype.test = function () {
        this.getLocation();
        this.navCtrl.setRoot(this.home);
        this.navCtrl.popToRoot;
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n    <ion-navbar color="primary">\n\n        <ion-title>Login</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    <ion-list>\n\n\n\n        <ion-item>\n\n            <ion-label stacked>Username</ion-label>\n\n            <ion-input type="text" [(ngModel)]="User.username"></ion-input>\n\n        </ion-item>\n\n\n\n        <ion-item>\n\n            <ion-label stacked>Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="User.pwd"></ion-input>\n\n        </ion-item>\n\n\n\n    </ion-list>\n\n\n\n    <div style="text-align: center"> <button ion-button outline (click)="login()" full>Login</button><br><button ion-button (click)="gotoSignup()" clear>click here to signup</button></div>\n\n\n\n    <!-- <button ion-button outline (click)="signup()">sign up</button>-->\n\n    <!--<button ion-button outline (click)="test()">test</button>-->\n\n    <div style="text-align: center"><img src="assets/imgs/Image-1.jpg"></div>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_debris_jams_debris_jams__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_streamflow_streamflow__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basic_basic__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__culvert_culvert__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_service_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_models__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__map_map__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_device_orientation__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, service, loading, camera, geolocation, deviceOrientation, alertCtrl) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.loading = loading;
        this.camera = camera;
        this.geolocation = geolocation;
        this.deviceOrientation = deviceOrientation;
        this.alertCtrl = alertCtrl;
        this.login = __WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */];
        this.couvertinfoList = [];
        this.map = __WEBPACK_IMPORTED_MODULE_9__map_map__["a" /* MapPage */];
        this.basic = __WEBPACK_IMPORTED_MODULE_2__basic_basic__["a" /* BasicPage */];
        this.culvert = __WEBPACK_IMPORTED_MODULE_3__culvert_culvert__["a" /* CulvertPage */];
        this.sf = __WEBPACK_IMPORTED_MODULE_1__pages_streamflow_streamflow__["a" /* StreamflowPage */];
        this.dj = __WEBPACK_IMPORTED_MODULE_0__pages_debris_jams_debris_jams__["a" /* DebrisJamsPage */];
        this.couverinfo = new __WEBPACK_IMPORTED_MODULE_8__models_models__["b" /* CouvertInfoModel */];
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.currentUser = localStorage.getItem('CurrentUser');
        this.couverinfo.Uploader = this.currentUser;
        var test;
        /*this.loader = this.loading.create({
          content: 'Loading...',})
        this.loader.present().then(()=>{
            this.service.getAllCouvert()
            .subscribe((resp:any)=>{
             if (resp){
                resp.forEach(element => {
                  this.couverinfo= new CouvertInfoModel
                  this.couverinfo.Description=element.Description
                  this.couverinfo.Uploader=element.Uploader
                  this.couverinfo.Phototime=element.Phototime
                  this.couverinfo.Lat=element.Lat
                  this.couverinfo.Lon=element.Lon
                  this.couvertinfoList.push(this.couverinfo)
                  
                });
                this.loader.dismiss();
    
             }else{
               this.loader.dismiss()
               console.log("no result")
             }
            },err=>{
              this.loader.dismiss();
              alert("error")
            })
        })
        console.log(this.couvertinfoList)*/
    };
    /*presentAlert(title,content) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: content,
        buttons: ['OK']
      });
      alert.present();
    }
    GetDirection(Ovalue:number,Direction:string){
      if(Ovalue==0||Ovalue==360){
          Direction="North  "+String(Ovalue)+"°";
      }else if(0<Ovalue&&Ovalue<90){
          Direction="NorthEast  "+String(Ovalue)+"°";
      }else if(Ovalue==90){
          Direction="East  "+String(Ovalue)+"°"
      }else if(Ovalue>90&&Ovalue<180){
          Direction="SouthEast  "+String(Ovalue)+"°"
      }else if(Ovalue==180){
          Direction="South  "+String(Ovalue)+"°"
      }else if(Ovalue>180&&Ovalue<270){
          Direction="SouthWest  "+String(Ovalue)+"°"
      }else if(Ovalue==270){
        Direction="West  "+String(Ovalue)+"°"
      }else if(Ovalue>270&&Ovalue<360){
        Direction="NorthWest  "+String(Ovalue)+"°"
      }else{
        Direction="out of range"
      }
  
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
          this.couverinfo.Uploader=localStorage.getItem('CurrentUser')
          this.couverinfo.Phototime=this.getCurrentTime()
          this.couverinfo.LowPic=imageData;
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
         }, (err) => {
          // Handle error
         });
        let loading = this.loading.create({
          showBackdrop: true,
          enableBackdropDismiss: true,
          content: 'Getting location, it may take a minute. Please wait...'
        });
        loading.present();
        LocationService.getMyLocation().then((myLocation: MyLocation)=>{
           this.couverinfo.LowLat=myLocation.latLng.lat;
           this.couverinfo.LowLon=myLocation.latLng.lng;
           this.deviceOrientation.getCurrentHeading().then(
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
             this.couverinfo.Orientation=Direction
              loading.dismiss();
            },err=>{
              loading.dismiss();
             
              this.presentAlert("Orientation failed","Cannot detect your device current direction.")
            }
          )
           loading.dismiss();
         }).catch(err=>{
           this.presentAlert("Location failed","Cannot get your device current location.")
           loading.dismiss();
        })
       }
      changeListener($event) : void {
        this.readThis($event.target);
      }
      
     async readThis(inputValue: any) {
        var file= inputValue.files[0];
       var result=await this.getExifData(file,this.couverinfo)
    
        var myReader:FileReader = new FileReader();
      
        myReader.onloadend = (e) => {
          this.base64Image = myReader.result;
        
          var str=this.base64Image.split('base64,');
          this.couverinfo.LowPic=str[1];
        }
        myReader.readAsDataURL(file);
      }
    getExifData(file,couverinfo){
      return new Promise(resolve => {
        var latitude,longitude,photoedTime
        EXIF.getData(file, function() {
          var Lat = EXIF.getTag(this, "GPSLatitude");
          var LatRef=EXIF.getTag(this,'GPSLatitudeRef')
          var Lon = EXIF.getTag(this, 'GPSLongitude');
          var LonRef=EXIF.getTag(this,'GPSLongitudeRef')
          photoedTime=EXIF.getTag(this,'DateTimeOriginal');
          if(Lat&&Lon){
            if(typeof(Lat[0].numerator)!="undefined"){
             console.log(Lat[0].numerator)
              var lat=Lat[0].numerator/Lat[0].denominator
              +Lat[1].numerator/(60*Lat[1].denominator)
              +Lat[2].numerator/(3600*Lat[2].denominator)
        
              var lon=Lon[0].numerator/Lon[0].denominator
              +Lon[1].numerator/(60*Lon[1].denominator)
              +Lon[2].numerator/(3600*Lon[2].denominator)
            }else{
            
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
            couverinfo.Lat=latitude;
            couverinfo.Lon=longitude;
            photoedTime=photoedTime.replace(':','-');
            couverinfo.Phototime=photoedTime.replace(':','-')
            
          }else{
            alert("Your picture do not have location information, Please describe photoed location and time in the Description section.")
            couverinfo.Photoedtime="2018-01-01 00:00:00"
           
          }
         
      });
       resolve([latitude,longitude,photoedTime]);
      });
    }
    getOrientation(){
      this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {console.log(data)},
      (error: any) => console.log(error)
  
    );}
    getCurrentTime(){
      var date = new Date();
      var seperator1 = "-";``
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var Smonth,SstrDate
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        Smonth = "0" + month;
      }else{
        Smonth=month
      }
      if (strDate >= 0 && strDate <= 9) {
        SstrDate = "0" + strDate;
      }else{
        SstrDate=strDate
      }
      var currentdate = date.getFullYear() + seperator1 + Smonth + seperator1 + SstrDate
              + " " + date.getHours() + seperator2 + date.getMinutes()
              + seperator2 + date.getSeconds();
              console.log(currentdate)
      return currentdate;
    }
    getLocation(couverinfo){
      this.geolocation.getCurrentPosition().then((resp) => {
        couverinfo.Lat=resp.coords.latitude// resp.coords.latitude
        couverinfo.Lon=resp.coords.longitude// resp.coords.longitude
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }
    uploadCouvert(){
     
      if(this.couverinfo.LowLat&&this.couverinfo.LowLon){
        this.loader = this.loading.create({
          duration:5000,
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
          this.base64Image=""
        }else{
          alert("Bad Request")
          this.base64Image=""
        }
      },err=>{
        this.loader.dismiss();
        console.log(err)
        this.base64Image=""
      })
      this.base64Image=""
        this.initCouverinfo();
      }else{
  
       
       if(this.couverinfo.Phototime&&this.couverinfo.Description){
        this.doUpload();
        this.initCouverinfo();
       }else{
         this.presentAlert("Notificaton","You must select a photoed time and add description for the data without location and time information.")
       }
       
        
      }
      
    }
    doUpload(){
      this.loader = this.loading.create({
        duration:5000,
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
       this.presentAlert("Thank you","Thank you, but data without location information cannot be shown on the map.")
        this.base64Image=""
      }else{
        alert("Bad Request")
        this.base64Image=""
      }
    },err=>{
      this.loader.dismiss();
      console.log(err)
      this.base64Image=""
    })
      this.initCouverinfo();
    }
    cancelUpload(){
      this.base64Image=""
      this.initCouverinfo();
    }
    initCouverinfo(){
      this.couverinfo.LowPic=""
      this.couverinfo.Phototime=""
      this.couverinfo.Orientation=""
      this.couverinfo.Description=""
      this.couverinfo.LowLat=null
      this.couverinfo.LowLon=null
  
    }*/
    HomePage.prototype.logout = function () {
        this.navCtrl.setRoot(this.login);
        this.navCtrl.popToRoot();
    };
    HomePage.prototype.gotomap = function () {
        this.navCtrl.push(this.map);
    };
    HomePage.prototype.gotoBasic = function () {
        this.navCtrl.push(this.basic);
    };
    HomePage.prototype.gotoSf = function () {
        this.navCtrl.push(this.sf);
    };
    HomePage.prototype.gotoDebris = function () {
        this.navCtrl.push(this.dj);
    };
    HomePage.prototype.gotoCulvert = function () {
        this.navCtrl.push(this.culvert);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\home\home.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n\n        <ion-title>\n\n            Welcome {{currentUser}}\n\n            <button ion-button clear small (click)="logout()" style="float: right;" color="light">logout</button>\n\n\n\n        </ion-title>\n\n\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n    <button id="map" ion-button full (click)="gotomap()" round><ion-icon name="map"  large>\n\n        </ion-icon>&nbsp;        Map     </button><br><br>\n\n    <button id="basic" ion-button full (click)="gotoBasic()" round><ion-icon name="map"  large>\n\n        </ion-icon>&nbsp;  Upload Basic Image</button><br><br>\n\n    <button id="culvert" ion-button full (click)="gotoCulvert()" round><ion-icon name="map"  large>\n\n        </ion-icon>&nbsp;  Upload Culvert</button><br><br>\n\n    <button id="sf" ion-button full (click)="gotoSf()" round><ion-icon name="map"  large>\n\n        </ion-icon>&nbsp;  Upload Streamflow</button><br><br>\n\n    <button id="dj" ion-button full (click)="gotoDebris()" round><ion-icon name="map"  large>\n\n        </ion-icon>&nbsp;  Upload Debris Jams</button><br><br>\n\n    <!-- <button id="picbutton" ion-button round (click)="takePicture()" clear><ion-icon name="camera"  large>\n\n        </ion-icon>&nbsp; Upload by camera</button><br><br>-->\n\n    <!--<div id="upload_button">\n\n            <label>\n\n            <ion-label id="fileChoose" color="primary">\n\n              <input class="ionic-item" type="file" accept="image/*" (change)="changeListener($event)">\n\n             <ion-icon name="albums"></ion-icon>\n\n              <span class="btn btn-primary">&nbsp;UPLOAD FROM STORAGE</span>\n\n            </ion-label>\n\n          </label>\n\n        </div>-->\n\n\n\n    <!--<div *ngIf="base64Image">\n\n        <div>\n\n            <br><img class="image-client" [src]="base64Image" *ngIf="base64Image" />\n\n        </div>\n\n        <ion-list>\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Uploader : {{couverinfo.Uploader}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Lat">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Latitude: {{couverinfo.Lat}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Lon">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; longitude: {{couverinfo.Lon}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Orientation">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Direction: {{couverinfo.Orientation}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-card *ngIf="couverinfo.Phototime">\n\n                <ion-item>\n\n                    <ion-label> &nbsp; Photoed Time : {{couverinfo.Phototime}}</ion-label>\n\n                </ion-item>\n\n            </ion-card>\n\n\n\n            <ion-card>\n\n                <ion-item>\n\n                    <ion-input type="text" [(ngModel)]="couverinfo.Description" placeholder="Add description..." clearOnEdit></ion-input>\n\n                </ion-item>\n\n            </ion-card>\n\n            <ion-item *ngIf="!couverinfo.Phototime">\n\n                <ion-label floating> &nbsp; Click here to select photoed Time</ion-label>\n\n                <ion-datetime displayFormat="YYYY-MM-DD HH:mm" [(ngModel)]="couverinfo.Phototime"></ion-datetime>\n\n            </ion-item>\n\n        </ion-list>\n\n\n\n        <button ion-button (click)="uploadCouvert()" clear>Upload Information</button>\n\n        <button ion-button (click)="cancelUpload()" clear>Cancel</button>\n\n    </div>-->\n\n\n\n</ion-content>\n\n<ion-footer>\n\n    <div style="text-align: center;font-size: 100%">\n\n        <p>*Please turn on your location settings before using this app or upload the images having location tags from gallery.</p>\n\n    </div>\n\n</ion-footer>'/*ion-inline-end:"D:\DWS V1\DWS-DoubleEnd\couvertWeb\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_service_service__["a" /* ServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_device_orientation__["a" /* DeviceOrientation */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map