import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClimaModel, ClimaMainModel, ClimaSysModel } from '../app/modules/clima.model';
import {PaisesModel} from '../app/modules/paises.model';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
    providedIn: 'root',
})
export class CiudadesService {

    apikey = '2f46510f492a73f270b563fcc123ea51';

    constructor(private httpClient: HttpClient) {
    }

    getDatosCiudad (ciudad: string): Promise<ClimaModel> {
        return new Promise((resolve, reject) => {
            let url: string = 'http://api.openweathermap.org/data/2.5/weather?q=' + ciudad + '&appid=' + this.apikey;
            this.httpClient.get<RespInterface>(url).subscribe((res) => {
                if (res !== null) {
                    resolve(this.parseData(res));
                } else {
                    reject();
                }
            });
        });
    }

  getPaises(): Promise<PaisesModel[]> {
    return new Promise((resolve, reject) => {
      let url = 'https://restcountries.eu/rest/v2/all';
      this.httpClient.get<Paises[]>(url).subscribe((res) => {
        if (res !== null) {
          resolve(this.parsePaises(res));
        } else {
          reject();
        }
      });
    });
  }

    parseData(respInter: RespInterface) {
        let dataTemp: ClimaModel = new ClimaModel();
        dataTemp.id = respInter.id;
        dataTemp.name = respInter.name;

        dataTemp.climaMain = new ClimaMainModel();
        dataTemp.climaMain.temp = respInter.main.temp - 273;
        dataTemp.climaMain.pressure = respInter.main.pressure;
        dataTemp.climaMain.humidity = respInter.main.humidity;
        dataTemp.climaMain.temp_min = respInter.main.temp_min - 273;
        dataTemp.climaMain.temp_max = respInter.main.temp_max - 273;

        dataTemp.climaSys = new ClimaSysModel;
        dataTemp.climaSys.country = respInter.sys.country;

        return dataTemp;
    }

     parsePaises (res: Paises[]) {
      let arregloPaises: PaisesModel[] = new Array<PaisesModel>();
      let arregloPaisesNombre: PaisesModel = new PaisesModel();
      for (let i = 0; i < res.length ; i++) {
         arregloPaisesNombre[i] = res[i].name;
         arregloPaises[i] = (arregloPaisesNombre[i]);
      }
      return arregloPaises;
    }
}
export interface MainInterface {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  }
  export interface RespInterface {
    id: number;
    name: string;
    codigo: number;
    main: MainInterface;
    sys: SysInterface;
  }
  export interface SysInterface {
    country: string;
  }
  export interface Paises {
  name: string;
  }


