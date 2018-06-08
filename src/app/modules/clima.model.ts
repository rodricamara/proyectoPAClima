export class ClimaModel {

  id: number;
  name: string;
  climaMain: ClimaMainModel;
  climaSys: ClimaSysModel;
  climaWeather: ClimaWeatherModel;

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

export class ClimaWeatherModel {
  main: string;
  description: string;
  icon: string;

  constructor() {
  }
}

export class ProvModel {

  state: string;

  constructor() {
  }
}

export class PaisesModel {
  name: string;

  constructor() {
  }
}


