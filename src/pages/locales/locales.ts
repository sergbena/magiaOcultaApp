import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from "ionic-angular";
import { ContenidoPage} from "../contenido/contenido";
import { PortadaPage} from "../portada/portada";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";

/**
 * Generated class for the LocalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locales',
  templateUrl: 'locales.html',
})
export class LocalesPage {

  entradas:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public storage: Storage) {
    this.entradas=[];

    this.storage.keys().then((val)=>{
      for (var v of val){
        this.storage.get(v).then((dat)=>{
          this.entradas.push(dat);
        });
      }
    });

  }

  ionViewWillEnter(){
    this.platform.registerBackButtonAction(()=>{
      this.navCtrl.setRoot(PortadaPage);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalesPage');
  }

  cambiar(item){
    this.navCtrl.push(ContenidoPage,{'item':item});
  }

  changeHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
