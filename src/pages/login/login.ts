import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { RegistroPage } from '../registro/registro';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  todo: FormGroup;
  evento: any;
  // evento: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private api: ApiRestProvider,
    private barcodeScanner: BarcodeScanner,
    private storage: Storage,
    public loadingCtrl: LoadingController) {

    this.todo = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

    // this.evento = this.scanEventCode();
  }

  ionViewDidLoad() {
  }

  async registroAsistente() {

    let alert = this.alertCtrl.create({
      title: 'Registro de asistente',
      message: `Antes de registrarte debes escanear el código QR del evento al que deseas asistir. 
      Presiona OK para escanerlo y proceder con el registro`,

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.scanEventCode().then(e => {
              this.navCtrl.push(RegistroPage, { evento: this.evento });
            });
          }
        }
      ]
    });
    alert.present();
  }

  async scanEventCode() {
    this.evento = await this.barcodeScanner.scan().then(barcodeData => {

      return barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async loginForm() {
    if (!this.evento) {
      this.showToast('No se escaneó el evento', 2000);
      return;
    }
    const data = this.todo.value;
    data.evento = this.evento;

    const loader = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });
    loader.present();
    this.api.loginUsuario(data).subscribe(
      (res: any) => {
        this.storage.set('usuario', res.data).then(re => {

          this.navCtrl.push(TabsPage).then(r => {

            const index = this.navCtrl.getActive().index;
            this.navCtrl.remove(0, index);

          });
        }).catch(e => console.log(e));

        loader.dismiss();

      }, error => {
        loader.dismiss();
        this.showToast("Contraseña o correo incorrectos.", 2000);
      });

  }


  showToast(mensaje: string, duracion: number) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: duracion
    });

    toast.present();
  }

  showRegistro() {
    console.log('Registro');

    // this.navCtrl.push(this.registro);

  }

}
