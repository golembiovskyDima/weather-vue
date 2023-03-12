import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useToast } from "../../../composables";
import { useRootStore } from "../../../store/rootStore";
import { CityWeather, ForecastItem } from "../../../types";
import api from "../api";
import { CoordsParams } from "../api/types";

const MAX_LENGTH_LIST = 5;

export const getFourDaysForecast = (data: ForecastItem[]): ForecastItem[] => {
	const res = data.reduce((acc, current) => {
		if (current.dt_txt) {
			const key = `d_${current.dt_txt?.split(' ')[0].split('-')[2]}`
			const temps = acc[key] ? [...acc[key].temps, current.temp] : [current.temp]

			return { ...acc, [key]: { dt: current.dt, temps } }
		}
		return acc
	}, {} as any)

	return Object.keys(res).map(key => ({
		dt: res[key].dt,
		temp: res[key].temps.reduce((acc: number, temp: number) => (acc + temp), 0) / res[key].temps.length
	}))
}

const useCitiesStore = defineStore('cities', () => {
	const rootStore = useRootStore();
	const toast = useToast();

	// state
	const list = ref<CityWeather[]>([]);
	const currentCity = ref<CityWeather | null>(null);

	// getters
	const listIds = computed(() => list.value.map((item) => item.id));

	// actions
	const addToList = () => {
		if (currentCity.value) {
			if (list.value.length == MAX_LENGTH_LIST) {
				toast.warning({
					title: 'List limit',
					message: 'Maximum number of cities = 5',
				})
			} else if (listIds.value.includes(currentCity.value.id)) {
				toast.warning({
					title: 'Already added',
					message: 'This city is already on the list',
				})
			} else {
				list.value = [currentCity.value, ...list.value];
				currentCity.value = null;
			}
		}
	}

	const removeFromList = (id: number) => {
		if (listIds.value.includes(id)) {
			list.value = list.value.filter((item) => item.id !== id);
		}
	}

	const selectCity = async (id: number) => {
		rootStore.setLoading(true);
		try {
			const resp = await api.getCity({ id });
			const forecast = await api.getForecast({ id })
			currentCity.value = {
				...resp,
				forecast,
				forecastType: 1,
			};
		} catch (error) {
			console.error(error);
		} finally {
			rootStore.setLoading(false)
		}
	}

	const getLocationCity = async (coords: CoordsParams) => {
		rootStore.setLoading(true);
		try {
			const resp = await api.getCity({ coords });
			const forecast = await api.getForecast({ coords })
			currentCity.value = {
				...resp,
				forecast,
				forecastType: 1,
			};
		} catch (error) {
			console.error(error);
		} finally {
			rootStore.setLoading(false)
		}
	}

	const changeForecastType = async (id: number) => {
		if (listIds.value.includes(id) || currentCity.value?.id === id) {
			try {
				const isSelected = currentCity.value?.id === id;
				const cityItem = isSelected
					? currentCity.value
					: list.value.find((item) => item.id === id)

				if (cityItem) {
					cityItem.forecastType = cityItem?.forecastType === 1 ? 5 : 1
					const isOneDay = cityItem.forecastType === 1

					const forecast = await api.getForecast({ id, isOneDay })

					cityItem.forecast = isOneDay ? forecast : getFourDaysForecast(forecast)
				}
			} catch (error) {
				console.error(error);
			}
		}
	}

	watch(() => rootStore.currentLocation, (newVal) => {
		if (newVal) {
			getLocationCity(newVal);
		}
	})

	return {
		list,
		currentCity,
		addToList,
		removeFromList,
		selectCity,
		changeForecastType,
	}
})

export default useCitiesStore;