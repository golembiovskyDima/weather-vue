export type ForecastParams = {
    id?: number,
    coords?: CoordsParams
    isOneDay?: boolean
}

export type CityParams = {
    id?: number,
    coords?: CoordsParams
}

export type CoordsParams = {
    lat: number,
    lon: number,
}

