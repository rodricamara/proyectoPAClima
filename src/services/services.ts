import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClimaModel, ClimaMainModel, ClimaSysModel } from '../app/modules/clima.model';

@Injectable({
    providedIn: 'root',
})
export class CiudadesService {

    apikey = '2f46510f492a73f270b563fcc123ea51';

    constructor(private httpClient: HttpClient) {
    }

    buscarCiudad(ciudad: string): Promise<ClimaModel> {
        return new Promise((resolve, reject) => {
            let url: string = 'http://api.openweathermap.org/data/2.5/weather?q=' + ciudad + '&appid=' + this.apikey;
            this.httpClient.get<RespInterface>(url).subscribe((res) => {
                if (res !== null) {
                    this.parseData(res);
                    resolve(this.parseData(res));
                } else {
                    reject();
                }
            });
        });
    }

    parseData(respInter: RespInterface) {
        const dataTemp: ClimaModel = new ClimaModel();
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


