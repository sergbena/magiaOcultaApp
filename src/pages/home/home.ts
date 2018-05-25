import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {ContenidoPage} from "../contenido/contenido";
import { Platform } from "ionic-angular";
import { PortadaPage } from "../portada/portada";
import { Storage } from "@ionic/storage";
import { LocalesPage} from "../locales/locales";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // post:any;
  text:any;
  apikey:any;
  id: any;
  urlp:any;
  num:number;
  entradas: any;
  start:any;
  fail:any=false;
// +'&maxResults=nº'
  constructor(public navCtrl: NavController,
              public http: Http,
              public navParams: NavParams,
              public platform: Platform,
              public storage: Storage) {

    this.num=10;
    this.start=1;
    this.text='';
    this.apikey='AIzaSyBNN7-6wt2Q70lYYarsgMRONogdwHjcpo0';
    this.id='306636982241939522';
    // this.urlp='https://www.blogger.com/feeds/'+this.id+'/posts/default?alt=json&max-results='+this.num+'&key='+this.apikey+'&start-index='+this.start;
    this.urlp=this.createUrl(this.id,this.num,this.apikey,this.start);
    this.entradas=[];

  }

  ionViewWillEnter(){
    this.platform.registerBackButtonAction(()=>{
      this.navCtrl.setRoot(PortadaPage);
    });
  }

  ionViewDidLoad(){

    this.http.get(this.urlp).map(res=>res.json()).subscribe(data=>{
      this.fail=false;
      // console.log(data.feed.entry);

      for( var datos of data.feed.entry){
        // console.log(datos.link[4].href);
        var campos={};
        var fecha=this.getFecha(datos.published.$t);
        var cate=this.getCategorias(datos.category);
        var img=this.getImagen(datos.media$thumbnail);
        var blog=datos.link[4].href;
        var idb=datos.id.$t;
        // var comment=this.getUrlComent(datos.link[0]);

        campos={
          'id':idb,
          'titulo': datos.title.$t,
          'contenido': datos.content.$t,
          'imagen': img,
          'publicado': fecha,
          'categorias' : cate,
          'blog': blog
        };

        this.entradas.push(campos);
      }
      // console.log(this.entradas);

    },
      err=>{
        this.fail=true;
      });
  }

  doInfinite(infiniteScroll){
    // console.log('doInfinite');
    this.start+=10;
    var direccion=this.createUrl(this.id,this.num,this.apikey,this.start);

    setTimeout(()=>{
      this.http.get(direccion).map(res=>res.json()).subscribe(data=>{
          this.fail=false;
        // console.log(data.feed.entry);
        for( var datos of data.feed.entry){
          var campos={};
          var fecha=this.getFecha(datos.published.$t);
          var cate=this.getCategorias(datos.category);
          var img=this.getImagen(datos.media$thumbnail);
          var blog=datos.link[4].href;
          var idb=datos.id.$t;
          // var comment=this.getUrlComent(datos.link[0]);

          campos={
            'id':idb,
            'titulo': datos.title.$t,
            'contenido': datos.content.$t,
            'imagen': img,
            'publicado': fecha,
            'categorias' : cate,
            'blog': blog
          };

          this.entradas.push(campos);
        }
        // console.log(this.entradas);
      },
        err=>{
          this.fail=true;
        });
      infiniteScroll.complete();
    },500);

  }

  getFecha (fecha){
    if (fecha){
      var f=fecha.split('T');
      var realojo=f[0].split('-');
      var publicacion= realojo[2]+'/'+realojo[1]+'/'+realojo[0];
      return publicacion;
    }else{
      return ""
    }

  }

  cambiar(item){
    this.navCtrl.push(ContenidoPage,{'item':item});
  }

  getCategorias(item){

    if(item){
      var cate=[];
      for(var t of item){
        cate.push(t.term);
      }
      return cate;
    }else {
      return "";
    }

  }

  getImagen(item){
    if(item) return item.url;
    else return 'assets/imgs/default.png';
  }

  createUrl(id,num,key,init){
    return 'https://www.blogger.com/feeds/'+id+'/posts/';
    // return 'https://www.blogger.com/feeds/'+id+'/posts/default?alt=json&max-results='+num+'&key='+key+'&start-index='+init;
  }

  changeLocal(){
    this.navCtrl.setRoot(LocalesPage);
  }

}
