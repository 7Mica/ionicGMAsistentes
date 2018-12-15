import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

  conferencias: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiRestProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {

    this.getConferencias();
  }

  ionViewDidLoad() {
  }

  async getConferencias(event?) {
    const loader = this.loadingCtrl.create({
      content: 'Cargando horarios...'
    });

    loader.present();
    this.api.getConferencias(await this.storage.get('usuario').then(item => item.usuario.evento)).subscribe(
      (res: any) => {
        this.conferencias = res.conferencias.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        if (event) {

          event.complete();
        }
        loader.dismiss();
      },
      error => {
        loader.dismiss();
        console.log(error);

      }
    );
  }

}
