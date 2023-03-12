<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { ConfirmOptions } from "../types";
import { AppButton } from '.'

const isOpen = ref(false);
const okButton = ref("");
const cancelButton = ref("");
const title = ref("");
const message = ref("");
let reslovePromise: ((arg: boolean) => void) | null = null;
let rejectPromise: (() => void) | null = null;

const show = (options: ConfirmOptions) => {
	isOpen.value = true;
	title.value = options.title;
	message.value = options.message;
	okButton.value = options?.okButton ?? "Yes";
	cancelButton.value = options?.cancelButton ?? "No";

	return new Promise((reslove, reject) => {
		reslovePromise = reslove;
		rejectPromise = reject;
	});
};

const onConfirm = () => {
	if (reslovePromise) {
		isOpen.value = false;
		reslovePromise(true);
	}
};

const onCancel = () => {
	if (rejectPromise) {
		isOpen.value = false;
		rejectPromise()
	}
};


defineExpose({
	show
})
</script>
<template>
	<div v-show="isOpen" class="confirm">
		<div class="content">
			<div class="confirm-header">
				<h2>{{ title }}</h2>
			</div>
			<div class="confirm-body">
				<p>{{ message }}</p>
			</div>
			<div class="confirm-btns">
				<app-button :label="okButton" @click="onConfirm" />
				<app-button variant="cancel" :label="cancelButton" @click="onCancel" />
			</div>
		</div>
	</div>
</template>

    
<style lang="scss" scoped>
.confirm {
	z-index: 1000;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.176);
}

.content {
	min-height: 100px;
	border-radius: 8px;
	overflow: hidden;
	width: 80%;
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 500px;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.confirm-header {
		position: relative;
		height: 50px;
		padding-right: 50px;
		padding-left: 15px;
		display: flex;
		color: white;
		align-items: center;
		background-color: rgba(73, 176, 249, 0.503);
	}

	.confirm-body {
		padding: 15px;
	}

	.confirm-btns {
		display: flex;
		justify-content: flex-end;
		padding: 15px;
		column-gap: 20px;
	}
}
</style>
    
    