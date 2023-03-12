<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import { ToastItemType } from '.';
import { useToastStore } from '../../store/toastStore';

const props = defineProps({
	item: {
		type: Object as PropType<ToastItemType>,
		required: true
	}
})

const toastStore = useToastStore();

const timer = ref<ReturnType<typeof setTimeout> | null>(null);

onMounted(() => {
	timer.value = setTimeout(() => {
		toastStore.removeToast(props.item.title)
	}, props.item.depay ?? 4000)
})

</script>

<template>
	<div :class="['toast-item', item.type]">
		<h3 class="header">{{ item.title }}</h3>
		<div class="message">{{ item.message }}</div>
	</div>
</template>

<style lang="scss">
.toast-item {
	width: 380px;
	min-height: 120px;
	display: flex;
	color: #fff;
	margin-bottom: 10px;
	border-radius: 5px;
	padding: 15px;
	flex-direction: column;

	&.success {
		background-color: #089908b3;
	}

	&.error {
		background-color: #ff0000af;
	}

	&.warning {
		background-color: #ee8f0ac9;
	}

	&.info {
		background-color: #49b0f980;
	}

	.header {
		margin-bottom: 10px;
		margin-top: 0;
	}

}
</style>