import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { ApiRestProvider } from '../providers/api-rest/api-rest';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { RegistroPageModule } from '../pages/registro/registro.module';
import { MapasPage } from '../pages/mapas/mapas';
import { MenuPage } from '../pages/menu/menu';
import { ConferenciasPage } from '../pages/conferencias/conferencias';
import { CalendarioPage } from '../pages/calendario/calendario';
import { PonentesPage } from '../pages/ponentes/ponentes';
import { MarcasPage } from '../pages/marcas/marcas';
import { InfoeventoPage } from '../pages/infoevento/infoevento';
import { CroquisPage } from '../pages/croquis/croquis';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { ContactoPage } from '../pages/contacto/contacto';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapasPage,
    MenuPage,
    ConferenciasPage,
    CalendarioPage,
    PonentesPage,
    MarcasPage,
    InfoeventoPage,
    CroquisPage,
    AyudaPage,
    ContactoPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    IonicStorageModule.forRoot(),
    RegistroPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapasPage,
    MenuPage,
    CalendarioPage,
    ConferenciasPage,
    PonentesPage,
    MarcasPage,
    InfoeventoPage,
    CroquisPage,
    AyudaPage,
    ContactoPage
  ],
  providers: [
    StatusBar,
    HttpClient,
    ApiRestProvider,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
