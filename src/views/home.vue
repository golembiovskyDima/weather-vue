<script setup lang="ts">
import { SearchCity, SelectedCity, ListCities } from '../modules/weather/components';
import { useCitiesStore } from '../modules/weather/store';

const citiesStore = useCitiesStore();

</script>

<template>
    <search-city />

    <selected-city />

    <div v-if="citiesStore.list.length" class="list">
        <h4>Cities</h4>
        <list-cities />

    </div>
</template>

<style scoped>
.list {
    margin-top: 80px;
}
</style>
