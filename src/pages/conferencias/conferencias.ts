import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-conferencias',
  templateUrl: 'conferencias.html',
})
export class ConferenciasPage {

  conferencias: any[] = [];
  conferenciasParaManana: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiRestProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {  }

  ionViewDidLoad() {
    this.getConferencias();
    this.getInfoEvento();
  }

  async getInfoEvento() {
    const loader = this.loadingCtrl.create({
      content: 'Cargando información...'
    });
    loader.present();
    this.api.getEventoInfo(await this.storage.get('usuario').then(item => item.usuario.evento)).subscribe(
      (res: any) => {
        console.log(res);
        this.storage.set('evento', res.data);
        loader.dismiss();
      }
    );
  }

  async getConferencias(event?) {
    const loader = this.loadingCtrl.create({
      content: 'Cargando conferencias...'
    });
    loader.present();

    this.api.getConferencias(await this.storage.get('usuario').then(item => item.usuario.evento)).subscribe(
      (res: any) => {
        this.conferencias = res.conferencias.filter(conferencia => {

          if (new Date(conferencia.fecha).getDate() === new Date().getDate() &&
            new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
            new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {

            return conferencia;
          }
        });

        this.conferenciasParaManana = res.conferencias.filter(conferencia => {

          if (new Date(conferencia.fecha).getDate() === new Date().getDate() + 1 &&
            new Date(conferencia.fecha).getMonth() === new Date().getMonth() &&
            new Date(conferencia.fecha).getFullYear() === new Date().getFullYear()) {

            return conferencia;
          }
        });
        if (event) {

          event.complete();
        }
        loader.dismiss();
      },
      error => {
        if (event) {

          event.complete();
        }
        loader.dismiss();
        console.log(error);

      }
    );
  }

}
