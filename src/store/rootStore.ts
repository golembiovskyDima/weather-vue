import { defineStore } from "pinia";
import { ref } from "vue";
import { locationService } from "../services";

type LocationType = {
    lat: number,
    lon: number
}

export const useRootStore = defineStore('root', () => {
    // state
    const isLoading = ref(false);
    const currentLocation = ref<LocationType | null>(null);

    // actions
    const setLoading = (value: boolean) => isLoading.value = value
    const getCurrentLocation = async () => {
        isLoading.value = true
        try {
            currentLocation.value = await locationService.getCurrentLocation();
        } finally {
            isLoading.value = false
        }

    }

    return {
        isLoading,
        currentLocation,
        setLoading,
        getCurrentLocation
    }
})