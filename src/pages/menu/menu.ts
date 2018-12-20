import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { MarcasPage } from '../marcas/marcas';
import { InfoeventoPage } from '../infoevento/infoevento';
import { CroquisPage } from '../croquis/croquis';
import { AyudaPage } from '../ayuda/ayuda';
import { ContactoPage } from '../contacto/contacto';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
    private app: App) {
  }

  ionViewDidLoad() {
  }

  pushCroquis(evento: any) {
    this.navCtrl.push(CroquisPage);
  }

  pushAyuda(evento: any) {
    this.navCtrl.push(AyudaPage);
  }

  pushContacto(evento: any) {
    this.navCtrl.push(ContactoPage);
  }

  pushMarcas(evento: any) {
    this.navCtrl.push(MarcasPage);
  }

  pushInfoEvento(evento: any) {
    this.navCtrl.push(InfoeventoPage);
  }

  cerrarSesion() {

    let alert = this.alertCtrl.create({
      title: 'Atención!',
      message: `¿Deseas cerrar sesión?`,

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            const loader = this.loadingCtrl.create({
              content: 'Cargando conferencias...'
            });

            loader.present();

            this.storage.clear().then(res => {
              this.app.getRootNav().setRoot(LoginPage);
              this.navCtrl.popToRoot();
              loader.dismiss();

            },
              error => {
                loader.dismiss();
                this.toast.create({ message: 'Ocurrió un error', duration: 3000 }).present();

              }
            );
          }
        }
      ]
    });
    alert.present();
  }
}
