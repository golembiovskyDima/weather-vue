
export type CityWeather = {
    coord: Coord,
    weather: Weather[],
    base: string,
    main: MainInfo,
    visibility: number,
    wind: Wind,
    rain?: Rain,
    snow?: Snow,
    clouds: Clouds,
    dt: number,
    sys: SysInfo,
    id: number,
    name: string,
    forecast?: ForecastItem[],
    forecastType: number,
}

export type SearchCitiWeather = CityWeather & {
    sys: Pick<SysInfo, 'country'>
}

export type SysInfo = {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number,
}

export type MainInfo = {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
}

export type Weather = {
    id: number,
    main: string,
    description: string,
    icon: string,
}

export type Coord = {
    lon: number,
    lat: number
}

export type Wind = {
    speed: number,
    deg: number,
}

export type Rain = {
    '1h': number,
}

export type Snow = {
    '1h': number,
}

export type Clouds = {
    all: number,
}

export type ForecastItem = {
    dt: number,
    temp: number,
    dt_txt?: string,
}

export type ConfirmType = {
    show: (options: ConfirmOptions) => Promise<any>
}

export type ConfirmOptions = {
    title: string,
    message: string,
    okButton?: string,
    cancelButton?: string
}
