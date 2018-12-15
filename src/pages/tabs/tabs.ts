import { Component } from '@angular/core';
import { MapasPage } from '../mapas/mapas';
import { MenuPage } from '../menu/menu';
import { ConferenciasPage } from '../conferencias/conferencias';
import { CalendarioPage } from '../calendario/calendario';
import { PonentesPage } from '../ponentes/ponentes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CalendarioPage;
  tab2Root = PonentesPage;
  tab3Root = ConferenciasPage;
  tab4Root = MapasPage;
  tab5Root = MenuPage;
  constructor() {

  }
}
