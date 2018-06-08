import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClimaModel, ClimaMainModel, ClimaSysModel, ClimaWeatherModel, ProvModel, PaisesModel} from '../app/modules/clima.model';


@Injectable({
  providedIn: 'root',
})
export class CiudadesService {

  apikey = '2f46510f492a73f270b563fcc123ea51';

  constructor(private httpClient: HttpClient) {
  }

  getDatosCiudad(ciudad: string): Promise<ClimaModel> {
    return new Promise((resolve, reject) => {
      let url: string = 'http://api.openweathermap.org/data/2.5/weather?q=' + ciudad + '&lang=es&units=metric&appid=' + this.apikey;
      this.httpClient.get<IDatosCiudad>(url).subscribe((res) => {
        if (res !== null) {
          resolve(this.parseoDatosCiudad(res));
        } else {
          reject();
        }
      });
    });
  }

  getPaises(): Promise<PaisesModel[]> {
    return new Promise((resolve, reject) => {
      let url = 'https://restcountries.eu/rest/v2/all';
      this.httpClient.get<IPaises[]>(url).subscribe((res) => {
        if (res !== null) {
          resolve(this.parsePaises(res));
        } else {
          reject();
        }
      });
    });
  }

  getProvinciasAr(): Promise<ProvModel[]> {
    return new Promise((resolve, reject) => {
      let url = '../assets/provincias.json';
      this.httpClient.get<IProv[]>(url).subscribe((res) => {
        if (res !== null) {
          // console.log(this.parseProv(res));
          //  resolve(this.parseProv(res));
          resolve(res);
        } else {
          reject();
        }
      });
    });
  }

  parseoDatosCiudad(res: IDatosCiudad) {
    let dataTemp: ClimaModel = new ClimaModel();
    dataTemp.id = res.id;
    dataTemp.name = res.name;

    dataTemp.climaMain = new ClimaMainModel();
    dataTemp.climaMain.temp = res.main.temp;
    dataTemp.climaMain.pressure = res.main.pressure;
    dataTemp.climaMain.humidity = res.main.humidity;
    dataTemp.climaMain.temp_min = res.main.temp_min;
    dataTemp.climaMain.temp_max = res.main.temp_max;

    dataTemp.climaSys = new ClimaSysModel;
    dataTemp.climaSys.country = res.sys.country;

    dataTemp.climaWeather = new ClimaWeatherModel;
    dataTemp.climaWeather.icon = res.weather[0].icon;
    dataTemp.climaWeather.description = res.weather[0].description;
    dataTemp.climaWeather.main = res.weather[0].main;



    return dataTemp;
  }

  parsePaises(res: IPaises[]) {
    let arregloPaises: PaisesModel[] = new Array<PaisesModel>();
    let arregloPaisesNombre: PaisesModel = new PaisesModel();
    for (let i = 0; i < res.length; i++) {
      arregloPaisesNombre[i] = res[i].name;
      arregloPaises[i] = (arregloPaisesNombre[i]);
    }
    return arregloPaises;
  }

}

export interface IDatosCiudad {
  id: number;
  name: string;
  codigo: number;
  main: IMain;
  sys: ISys;
  weather: IWeather;
}

export interface IMain {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface ISys {
  country: string;
}

export interface IPaises {
  name: string;
}

export interface IProv {
  state: string;
}

export interface IWeather {
  main: string;
  description: string;
  icon: string;
}

