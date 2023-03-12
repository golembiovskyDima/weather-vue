<script setup lang="ts">
import { useToastStore } from '../../store/toastStore';
import AppToastItem from './AppToastItem.vue';

const toastStore = useToastStore();

</script>

<template>
	<div class="toasts-wrapper">
		<transition-group name="list">
			<app-toast-item v-for="item in toastStore.tosatsList" :item="item" :key="item.title" />
		</transition-group>
	</div>
</template>

<style lang="scss">
.toasts-wrapper {
	position: fixed;
	right: 0;
	top: 80px;
	width: 400px;
	display: flex;
	flex-direction: column;
}

.list-enter-active,
.list-leave-active {
	transition: all 0.4s linear;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(300px);
}
</style>