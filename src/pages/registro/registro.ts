import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiRestProvider } from '../../providers/api-rest/api-rest';


/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  evento: any;
  registroForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private api: ApiRestProvider,
    public loadingCtrl: LoadingController) {

    this.evento = navParams.get('evento');

    this.registroForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      appaterno: new FormControl(null, [Validators.required]),
      apmaterno: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      emailConfirm: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    }, { validators: [this.checkPasswords, this.checkEmails] });
  }

  ionViewDidLoad() {

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.passwordConfirm.value;

    return pass === confirmPass ? null : { notSamePassword: true }
  }

  checkEmails(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.email.value;
    let confirmPass = group.controls.emailConfirm.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  registroFormSubmit() {

    const data: any = this.registroForm.value;
    data.evento = this.evento;
    data.rol = 'ASISTENTE';

    const loader = this.loadingCtrl.create({
      content: 'Enviando petición...'
    });
    loader.present();

    this.api.registrarUsuarioEvento(data).subscribe(
      res => {
        this.registroForm.reset();
        this.toastCtrl.create({ message: 'Usuario creado correctamente.', duration: 3000 }).present();
        loader.dismiss();
        this.navCtrl.pop();
      },
      error => {
        loader.dismiss();
        this.toastCtrl.create({ message: error.error.body, duration: 3000 }).present();

      }
    );

  }

}
