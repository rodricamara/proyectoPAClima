
export class ClimaModel {

  id: number;
  name: string;
  climaMain: ClimaMainModel;
  climaSys: ClimaSysModel;

  constructor() {
  }
}

export class ClimaMainModel {

  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;

  constructor() {
  }
}

export class ClimaSysModel {

  country: string;

  constructor() {
  }
}
