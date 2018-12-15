import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPage } from './registro';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { IonicStorageModule, Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    RegistroPage,
  ],
  providers: [
    HttpClient,
    ApiRestProvider,

  ],
  imports: [
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicPageModule.forChild(RegistroPage),
  ],
})
export class RegistroPageModule {}
