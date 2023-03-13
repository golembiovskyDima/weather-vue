<script setup lang="ts">
import { CityWeatherCard } from "../../../components";
import { useFavoritesStore, useCitiesStore } from "../store";

const citiesStore = useCitiesStore();
const favoritesStore = useFavoritesStore();

const toogleToFavorites = () => {
  if (citiesStore.currentCity) {
    if (favoritesStore.isInFavorites(citiesStore.currentCity.id)) {
      favoritesStore.removeFromFavorites(citiesStore.currentCity.id);
    } else {
      favoritesStore.addToFavorites(citiesStore.currentCity);
    }
  }
};
</script>

<template>
  <div class="selected-city" v-if="citiesStore.currentCity">
    <city-weather-card
      :is-favorites="favoritesStore.isInFavorites(citiesStore.currentCity.id)"
      :item-data="citiesStore.currentCity"
      has-action-type="add"
      @add-item="citiesStore.addToList"
      @switch-forecast-period="citiesStore.changeForecastType(citiesStore.currentCity!.id)"
      @toggle-is-favorites="toogleToFavorites"
    />
  </div>
</template>

<style lang="scss" scoped>
.selected-city {
  padding: 10px 0;
  margin: 20px 0;
}
</style>
