import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, ViewController } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {InAppBrowser} from "@ionic-native/in-app-browser";
// import { HomePage } from "../home/home";
import { Storage } from "@ionic/storage";
// import { LocalesPage } from "../locales/locales";

/**
 * Generated class for the ContenidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contenido',
  templateUrl: 'contenido.html',
})
export class ContenidoPage {

  data: any;
  visible:boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public iab: InAppBrowser,
              public platform: Platform,
              public storage: Storage,
              public view : ViewController) {
    this.data=this.navParams.data.item;
    // this.visible=false;
    this.storage.get(this.data.id).then((val)=>{
      val ? this.visible=true : this.visible=false;
    });

    this.platform.registerBackButtonAction(()=>{
      view.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContenidoPage');
  }

  openlink(url){
    this.iab.create(url,'_system');
  }

  estrella(item){

    if (this.visible){
      this.storage.remove(item.id);
      this.visible=false;
    }else{
      this.storage.set(item.id,item);
      this.visible=true
    }
  }

}
