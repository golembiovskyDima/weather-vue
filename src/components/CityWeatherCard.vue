<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import { CityWeather } from '../types';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

type ActionType = 'add' | 'remove';

const props = defineProps({
	itemData: {
		type: Object as PropType<CityWeather>,
		required: true
	},
	isFavorites: {
		type: Boolean,
		required: true
	},
	hasActionType: {
		type: String as PropType<ActionType>,
	},
});

const emits = defineEmits(['removeItem', 'addItem', 'switchForecastPeriod', 'toggleIsFavorites'])

const isShowChart = ref(false);
const forecastPeriod = ref(props.itemData.forecastType);

const currentDt = new Date(props.itemData.dt * 1000).toLocaleString();
const iconUrl = computed(() => `https://openweathermap.org/img/wn/${props.itemData.weather[0].icon}.png`);

const labels = computed(() => (
	props.itemData.forecast?.map(item => {
		const date = new Date(item.dt * 1000);
		return props.itemData.forecastType === 1 ? date.getHours() + ':00' : date.toLocaleDateString()
	}) ?? []
))

const datasets = computed(() => (
	[{
		data: props.itemData.forecast?.map(item => item.temp) ?? [],
		fill: false,
		borderColor: 'rgb(199, 207, 46)',
	}]
))

const chartData = computed(() => ({
	labels: labels.value,
	datasets: datasets.value
}))

const options = {
	responsive: true,
	maintainAspectRatio: false,
}

watch(forecastPeriod, () => {
	emits('switchForecastPeriod')
})

</script>

<template>
	<div class="city-weather-card">
		<div class="header">
			<h3>{{ `${itemData?.name} | ${itemData?.sys.country}` }}</h3>
			<div class="rigth">
				<div class="date">{{ currentDt }}</div>
				<font-awesome-icon class="is-favorites" :icon="isFavorites ? 'fa-solid fa-star' : 'fa-regular fa-star'"
					size="lg" @click="emits('toggleIsFavorites')" />

				<font-awesome-icon v-if="hasActionType === 'remove'" class="to-list" icon="fa-solid fa-minus" size="lg"
					@click="emits('removeItem'), itemData.id" />

				<font-awesome-icon v-if="hasActionType === 'add'" class="to-list" icon="fa-solid fa-plus" size="lg"
					@click="emits('addItem'), itemData.id" />
			</div>
		</div>
		<div class="main">
			<div class="weather-icon">
				<img :src="iconUrl" alt="weather-icon">
			</div>
			<div class="temp">{{ Math.round(itemData.main.temp) }}°C</div>
		</div>
		<div class="info">
			<div>
				Feels like {{ Math.round(itemData.main.feels_like) }}°C.
				<span class="description">{{ itemData.weather[0].description }}</span>
			</div>
		</div>

		<div class="toggle-show-chart" @click="isShowChart = !isShowChart">
			{{ isShowChart ? 'Hide' : 'Show' }} Forecast
		</div>
		<div class="forecast-period">
			<span v-for="item in [1, 5]" :key="item" :class="{ active: itemData.forecastType === item }"
				@click="forecastPeriod = item">{{ item === 1 ? '24h' : '5d' }}</span>
		</div>
		<div class="chart" v-show="itemData.forecast?.length && isShowChart">
			<Line :data="chartData" :width="800" :height="300" :options="options" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.city-weather-card {
	border: 1px solid #00000056;
	padding: 20px;
	border-radius: 20px;
	display: flex;
	flex-wrap: wrap;

	.header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 10px 0;

		h3 {
			margin: 0;
		}

		.rigth {
			display: flex;
			align-items: center;
			column-gap: 20px;

			.to-list {
				cursor: pointer;
				transition: all .3s linear;

				&:hover {
					transform: scale(1.15);
				}
			}

			.is-favorites {
				color: #ffd400;
				transition: all .3s linear;
				cursor: pointer;

				&:hover {
					transform: scale(1.15);
				}
			}

			.date {
				font-style: italic;
				color: rgba(113, 113, 113, 0.514)
			}
		}

	}

	.main {
		width: 100%;
		display: flex;

		.temp {
			font-weight: 700;
			font-size: 32px;
		}
	}

	.forecast-period {
		display: flex;
		column-gap: 15px;

		span:not(.active) {
			text-decoration: underline;
			cursor: pointer;
			color: blue
		}
	}

	.toggle-show-chart {
		display: flex;
		width: 100%;
		justify-content: end;
		cursor: pointer;
		text-decoration: underline;
	}

	.info {
		width: 100%;

	}

	.chart {
		width: 100%;
		height: 400px;
	}

}
</style>