import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'page-marcas',
  templateUrl: 'marcas.html',
})
export class MarcasPage {
  marcas: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiRestProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {
    this.getMarcas();
  }

  ionViewDidLoad() {

  }

  async getMarcas(ev?) {
    const loader = this.loadingCtrl.create({
      content: 'Cargando información...'
    });
    loader.present();

    this.marcas = await this.storage.get('evento').then(evento => {
      if (ev) ev.complete();

      loader.dismiss();
      return evento.marcas;
    }).catch(error => {
      if (ev) {

        ev.complete();
      }
      loader.dismiss();

      console.log(error);

    });

  }

}
