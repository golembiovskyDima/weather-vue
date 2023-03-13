<script setup lang="ts">
import { useCitiesStore, useFavoritesStore } from "../store";
import { CityWeatherCard, AppConfirm } from "../../../components";
import { ref } from "vue";
import { CityWeather } from "../../../types";

const citiesStore = useCitiesStore();
const favoritesStore = useFavoritesStore();

const confirm = ref<InstanceType<typeof AppConfirm> | null>(null);

const toogleToFavorites = (item: CityWeather) => {
  if (favoritesStore.isInFavorites(item.id)) {
    favoritesStore.removeFromFavorites(item.id);
  } else {
    favoritesStore.addToFavorites(item);
  }
};

const removeItem = (id: number) => {
  if (confirm.value) {
    confirm.value
      .show({
        title: "Remove",
        message: "Are you sure you want to delete?",
      })
      .then(() => {
        citiesStore.removeFromList(id);
      });
  }
};
</script>

<template>
  <div class="list-cities">
    <city-weather-card
      v-for="city in citiesStore.list"
      :key="city.id"
      :item-data="city"
      :is-favorites="favoritesStore.isInFavorites(city.id)"
      has-action-type="remove"
      @remove-item="removeItem(city.id)"
      @toggle-is-favorites="toogleToFavorites(city)"
      @switch-forecast-period="citiesStore.changeForecastType(city.id)"
    />
  </div>
  <teleport to="body">
    <app-confirm ref="confirm" />
  </teleport>
</template>

<style lang="scss" scoped>
.list-cities {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
