import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-infoevento',
  templateUrl: 'infoevento.html',
})
export class InfoeventoPage {

  evento: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiRestProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.getEventoInfo();
  }

  getEventoInfo(ev?) {
    this.storage.get('evento').then(
      res => {
        this.evento = res;
      }
    ).catch();
  }

}
