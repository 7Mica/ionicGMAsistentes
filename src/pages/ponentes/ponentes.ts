import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { Storage } from '@ionic/storage';
import { HOST } from '../../config/config';

/**
 * Generated class for the PonentesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ponentes',
  templateUrl: 'ponentes.html',
})
export class PonentesPage {

  ponentes: any[] = [];
  hostimage = HOST + 'usuarioevento/img/';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiRestProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private toast: ToastController) {

  }


  ionViewDidLoad() {
    this.getPonentes();
  }

  async getPonentes(event?) {

    const loader = this.loadingCtrl.create({
      content: 'Cargando ponentes...'
    });
    loader.present();

    this.api.getPonentes(await this.storage.get('usuario').then(r => r.usuario.evento)).subscribe(
      (res: any) => {
        this.ponentes = res.data;
        console.log(res);
        

        if (event) {

          event.complete();
        }
        loader.dismiss();
      },

      error => {
        loader.dismiss();
        this.toast.create({ message: 'Ocurrió un error en la petición', duration: 3000 });
      }
    );
  }

}
