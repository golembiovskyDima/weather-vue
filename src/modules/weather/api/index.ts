import axios from "../../../api"
import { CityWeather, ForecastItem, SearchCitiWeather } from "../../../types";
import { dateHelper } from "../../../utils";
import { CityParams, ForecastParams } from "./types";

const findCites = async (searchValue: string): Promise<SearchCitiWeather[]> => {
	try {
		const resp = await axios.get('/find', { params: { q: searchValue } });
		return resp.data.list
	} catch (e) {
		throw e
	}
}

const getCity = async ({ id, coords }: CityParams): Promise<CityWeather> => {
	try {
		const resp = await axios.get('/weather', { params: { id, ...coords } });
		return resp.data
	} catch (e) {
		throw e
	}
}

const getForecast = async ({ id, coords, isOneDay = true }: ForecastParams): Promise<ForecastItem[]> => {
	try {
		const cnt = dateHelper.getCntForForecast(isOneDay ? 1 : 4);
		const resp = await axios.get('/forecast', { params: { id, cnt, ...coords } });
		return resp.data.list.map((item: any) => ({
			dt: item.dt,
			temp: item.main.temp,
			dt_txt: item.dt_txt,
		}))
	} catch (e) {
		throw e
	}
}

export default {
	findCites,
	getCity,
	getForecast,
}