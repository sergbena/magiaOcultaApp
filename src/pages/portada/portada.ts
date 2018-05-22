import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AlertController} from "ionic-angular";
import { LocalesPage} from "../locales/locales";

/**
 * Generated class for the PortadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portada',
  templateUrl: 'portada.html',
})
export class PortadaPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public alertctl: AlertController) {

    this.platform.registerBackButtonAction(()=>{
      let al= alertctl.create({
        title:'Confirmar',
        message:'¿Desea cerrar la aplicación?',
        buttons:[{
          text: 'Aceptar',
          handler: ()=>{
            platform.exitApp();
          }
        },{
          text:'cancelar',
          role: 'cancel'
        }]
      });
      al.present();

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortadaPage');
  }

  changeBlog(){
    this.navCtrl.setRoot(HomePage);
  }

  changeLocal(){
    this.navCtrl.setRoot(LocalesPage);
  }

}
