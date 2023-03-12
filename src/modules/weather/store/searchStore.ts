import { defineStore } from "pinia";
import { ref, watch } from "vue";
import api from "../api";
import { SearchCitiWeather } from "../../../types";
import { helper } from "../../../utils";

export const useSearchStore = defineStore('search', () => {
	// state
	const isLoading = ref(false);
	const searchValue = ref<string>('');
	const listCities = ref<SearchCitiWeather[]>([]);

	// getters

	// actions
	const setSearchValue = (value: string) => searchValue.value = value;

	const getCities = async (val: string) => {
		if (!val || val.length < 3) {
			listCities.value = [];
		} else {
			isLoading.value = true;
			try {
				const resp = await api.findCites(val);
				listCities.value = resp;
			} catch (error) {
				console.error(error);
			}
			isLoading.value = false;
		}

	}

	const getCityWithDepay = helper.debounce((val: string) => {
		getCities(val);
	}, 350)

	watch(searchValue, (newVal) => {
		getCityWithDepay(newVal);
	})


	return {
		searchValue,
		listCities,
		setSearchValue,
		getCities,
	}
})