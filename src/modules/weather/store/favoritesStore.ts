import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useToast } from "../../../composables";
import { localStorageService } from "../../../services";
import { CityWeather } from "../../../types";
import api from "../api";
import { getFourDaysForecast } from "./citiesStore";

const MAX_LENGTH_LIST = 5;

export const useFavoritesStore = defineStore('favorites', () => {
	const toast = useToast();
	// state
	const list = ref<CityWeather[]>([]);

	// getters
	const listIds = computed(() => list.value.map((item) => item.id));
	const isInFavorites = (id: number) => listIds.value.includes(id);

	// actions
	const addToFavorites = (item: CityWeather) => {
		if (item.id) {
			if (list.value.length == MAX_LENGTH_LIST) {
				toast.warning({
					title: 'List limit',
					message: 'Maximum number of favorites = 5',
				})
			} else {
				list.value = [...list.value, item];

			}
		}
	}

	const removeFromFavorites = (id: number) => {
		if (isInFavorites(id)) {
			list.value = list.value.filter((item) => item.id !== id);
		}
	}

	const initFavorites = async () => {
		if (!list.value.length) {
			const favoritesIds: number[] = localStorageService.getItem('favoritesIds');
			if (favoritesIds?.length) {
				list.value = await Promise.all(getFavorites(favoritesIds));
			}
		}
	}

	const getFavorites = (ids: number[]): Promise<CityWeather>[] => {
		const fetchCity = async (id: number) => {
			const resp = await api.getCity({ id });
			const forecast = await api.getForecast({ id })
			return {
				...resp,
				forecast,
				forecastType: 1,
			};
		}

		return ids.map(async (id) => await fetchCity(id))
	}

	const changeForecastType = async (id: number) => {
		if (isInFavorites(id)) {
			try {
				const cityItem = list.value.find((item) => item.id === id)

				if (cityItem) {
					cityItem.forecastType = cityItem?.forecastType === 1 ? 5 : 1;
					const isOneDay = cityItem.forecastType === 1;

					const forecast = await api.getForecast({ id, isOneDay });

					cityItem.forecast = isOneDay ? forecast : getFourDaysForecast(forecast);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}



	watch(listIds, (newVal) => {
		if (newVal.length) {
			localStorageService.setItem('favoritesIds', newVal);
		} else {
			localStorageService.removeItem('favoritesIds');
		}
	})


	return {
		list,
		listIds,
		isInFavorites,
		initFavorites,
		addToFavorites,
		removeFromFavorites,
		changeForecastType,
	}
})