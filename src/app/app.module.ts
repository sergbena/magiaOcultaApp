import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {IonicStorageModule} from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContenidoPage } from "../pages/contenido/contenido";
import { PortadaPage } from "../pages/portada/portada";
import { LocalesPage} from "../pages/locales/locales";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContenidoPage,
    PortadaPage,
    LocalesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContenidoPage,
    PortadaPage,
    LocalesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
