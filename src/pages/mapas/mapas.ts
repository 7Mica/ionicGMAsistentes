import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MapasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mapas',
  templateUrl: 'mapas.html',
})
export class MapasPage {
  isRegistrado = false;
  map: GoogleMap;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage, ) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  async loadMap() {
    const loc = await this.storage.get('evento').then(data => data.mapa);
    if (!loc) {
      this.isRegistrado = false;
      return;
    }
    
    this.isRegistrado = true;
    const lat = await loc.latitude;
    const lng = await loc.longitude;
    // const lat = await parseFloat(await this.storage.get('evento').then(data => { return (data.mapa) ? data.mapa.latidude : 43.0741904 }));
    // const lng = await parseFloat(await this.storage.get('evento').then(data => { return (data.mapa) ? data.mapa.longitude : -89.3809802 }));

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: lat,
          lng: lng,
        },
        zoom: 10,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: lat,
        lng: lng
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

}
