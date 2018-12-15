import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    LoginPage,
  ],
  entryComponents: [
    LoginPage
  ],
  providers: [
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(LoginPage),
    IonicStorageModule.forRoot()
  ],
})
export class LoginPageModule {}
