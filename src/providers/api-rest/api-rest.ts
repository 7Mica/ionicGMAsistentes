import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../../config/config';

/*
  Generated class for the ApiRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ApiRestProvider {


  api = HOST;

  constructor(public http: HttpClient) {
  }

  getConferencias(idevento: string) {
    const url = this.api + 'conferencia/lista/' + idevento;
    return this.http.get(url);

  }

  getMarcas() {
    
  }

  getPonentes(idevento) {
    const url = this.api + 'usuarioevento/ponente/' + idevento;
    return this.http.get(url);
  }

  getEventoInfo(idevento: string) {
    const url = this.api + 'evento/' + idevento;
    return this.http.get(url);
  }

  registrarAsistencia(idusuario, idconferencia, idevento) {
    const url = this.api + `conferencia/asistencia/${idevento}/${idconferencia}/${idusuario}`;

    return this.http.put(url, {});
  }

  registrarUsuarioEvento(data) {
    const url = this.api + `usuarioevento`;

    return this.http.post(url, data);
  }
  // Login de usuario
  loginUsuario(data: any) {
    return this.http.post(this.api + 'login/usuarioevento', data, httpOptions);
  }




}
