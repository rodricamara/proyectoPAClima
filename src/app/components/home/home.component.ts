import {Component, OnInit} from '@angular/core';
import {CiudadesService, IPaises} from '../../../services/services';
import {ClimaModel, PaisesModel, ProvModel} from '../../modules/clima.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  title = 'Bienvenido a la APP del Clima';
  ciudadIngresada: string;
  datos: ClimaModel = new ClimaModel();
  paises: PaisesModel[] = new Array<PaisesModel>();
  pais: string;
  prov: string;
  pro: ProvModel[] = new Array<ProvModel>();


  constructor(private objCiudadService: CiudadesService) {
  }

  getDatosCiudad() {
    this.objCiudadService.getDatosCiudad(this.ciudadIngresada)
      .then((data) => (this.datos = data));
  }

  ngOnInit() {
    this.objCiudadService.getPaises()
      .then((data) => (this.paises = data));

    this.objCiudadService.getProvinciasAr()
      .then((data) => (this.pro = data));
  }

  onChangeVal(val) {
    this.ciudadIngresada = (val + ',AR');
    this.getDatosCiudad();
  }

}
