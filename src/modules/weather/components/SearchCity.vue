<script setup lang="ts">
import { AppAutoCompliteInput } from '../../../components';
import { computed } from 'vue';
import { useCitiesStore, useSearchStore } from '../store';

const searchStore = useSearchStore();
const citiesStore = useCitiesStore();

const citiesList = computed(() =>
	searchStore.listCities?.map((item) => ({
		label: `${item.name} | ${item.sys.country}`,
		key: item.id,
		value: item.id
	}))
)

const onInputHandle = (e: any) => {
	searchStore.setSearchValue(e.target.value);
};

const onSelectHandle = (id: number) => {
	citiesStore.selectCity(id);
	searchStore.setSearchValue('');
}

</script>

<template>
	<div class="search-city">
		<app-auto-complite-input placeholder="Search City" :data="citiesList" :value="searchStore.searchValue"
			@input="onInputHandle" @select="onSelectHandle" />
	</div>
</template>

<style lang="scss" scoped></style>