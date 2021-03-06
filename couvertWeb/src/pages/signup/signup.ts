import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserInfoModel} from "../../models/models"
import {ServiceProvider} from "../../providers/service/service"
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public User: UserInfoModel
  public home: any
  public ConfirmPWD:string
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service:ServiceProvider) {
      this.User= new UserInfoModel
      this.home=HomePage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signup(){
    if(this.User.username!=""&&this.User.pwd!=""){
      if(this.User.pwd==this.ConfirmPWD){
        if(!this.User.username.includes("/")
        &&!this.User.pwd.includes("/")
        &&!this.User.username.includes(" ")
        &&!this.User.pwd.includes(" ")
        &&!this.User.username.includes("$")
        &&!this.User.pwd.includes("$")
        &&!this.User.username.includes('\\')
        &&!this.User.pwd.includes('\\')
        &&!this.User.username.includes("#")
        &&!this.User.pwd.includes("#")
        &&!this.User.username.includes("-")
        &&!this.User.pwd.includes("-")
        &&!this.User.username.includes("&")
        &&!this.User.pwd.includes("&")
        &&!this.User.username.includes("+")
        &&!this.User.pwd.includes("+")
        &&!this.User.username.includes("_")
        &&!this.User.pwd.includes("_")
        &&!this.User.username.includes("(")
        &&!this.User.pwd.includes("(")
        &&!this.User.username.includes(")")
        &&!this.User.pwd.includes(")")){
          this.service.signup(this.User.username,this.User.pwd)
        .subscribe(data=>{
          console.log(data)
          if(data==this.User.username){
            localStorage.setItem('CurrentUser',this.User.username)
              this.navCtrl.setRoot(this.home)
              this.navCtrl.popToRoot
          }else if (data=="existed"){
            alert("username has already existed")
          }
        },err=>{
          console.log(err.error)
        })
        }else{
          alert("Username and password should not contain slash, space, $, \\, #, +, -, (, )")
        }
        
      }else{
        alert("Password and Confirm Password are not matched, Please check again.")
      }
          
        /* .subscribe((resp) => {

            console.log("hello");
            alert(resp)
            //this.img.ID=uuid;
           
            
          }, (err) => {
            
            console.log(err);
          });*/
    }else{
      alert("Username and Password cannot be null.")
    }
  }
}
