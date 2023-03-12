<script setup lang="ts">
import { onMounted } from 'vue';
import { AppContainer, TheHeader, AppLoader, AppToasts } from '../components';
import { useRootStore } from '../store/rootStore';

const rootStore = useRootStore();

onMounted(() => {
	rootStore.getCurrentLocation();
})

</script>
<template>
	<app-loader v-show="rootStore.isLoading" />
	<the-header></the-header>
	<main>
		<app-toasts />
		<app-container>
			<router-view></router-view>
		</app-container>
	</main>
</template>
<style lang="scss" scoped>
main {
	padding-top: 60px;
	padding-bottom: 60px;
}
</style>