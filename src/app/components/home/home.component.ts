import {Component, OnInit} from '@angular/core';
import {CiudadesService, Paises} from '../../../services/services';
import { ClimaModel } from '../../modules/clima.model';
import { PaisesModel } from '../../modules/paises.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  title = 'Bienvenido a la APP del Clima';
  ciudadIngresada: string;
  datos: ClimaModel = new ClimaModel();
  paises: PaisesModel[] = new Array<PaisesModel>();
  paises2: PaisesModel = new PaisesModel();

  constructor(private objCiudadService: CiudadesService) {
  }

  getDatosCiudad () {
    this.objCiudadService.getDatosCiudad(this.ciudadIngresada)
    .then((data) => (this.datos = data));
  }

  ngOnInit() {
    this.objCiudadService.getPaises()
      .then((data) => (this.paises = data));
  }

}
