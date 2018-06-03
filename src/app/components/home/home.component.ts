import { Component } from '@angular/core';
import { CiudadesService } from '../../../services/services';
import { ClimaModel } from '../../modules/clima.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  title = 'Bienvenido a la APP del Clima';
  ciudadIngresada: string;
  datos: ClimaModel = new ClimaModel();

  constructor(private objCiudadService: CiudadesService) {
  }

  buscarCiudad() {
    this.objCiudadService.buscarCiudad(this.ciudadIngresada)
    .then((data) => (this.datos = data));
  }
}
