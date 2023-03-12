<script setup lang="ts">
import { CityWeatherCard } from '../../../components'
import { useFavoritesStore } from '../store';
import { CityWeather } from '../../../types';

const favoritesStore = useFavoritesStore();

const toogleToFavorites = (item: CityWeather) => {
	if (favoritesStore.isInFavorites(item.id)) {
		favoritesStore.removeFromFavorites(item.id);
	} else {
		favoritesStore.addToFavorites(item);
	}
}


</script>

<template>
	<div class="favorites-list" v-if="favoritesStore.list.length">
		<city-weather-card 
			v-for="city in favoritesStore.list" 
			:key="city.id" 
			:item-data="city" 
			:is-favorites="true"
			@toggle-is-favorites="toogleToFavorites(city)"
			@switch-forecast-period="favoritesStore.changeForecastType(city.id)" 
		/>
	</div>
</template>

<style lang="scss" scoped>
.favorites-list {
	display: flex;
	flex-direction: column;
	row-gap: 20px;
}
</style>