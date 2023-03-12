<script setup lang="ts">
import { computed, PropType } from 'vue';

export type AutoCompleteItem = {
	label: string,
	key: string | number,
	value: any
}

const props = defineProps({
	data: {
		type: Array as PropType<AutoCompleteItem[]>
	},
	value: String,
	placeholder: String,
});

const emits = defineEmits(['input', 'select']);

const isOpen = computed(() => props.data?.length);

const onSelect = (item: AutoCompleteItem) => {
	emits('select', item);
}
</script>

<template>
	<div :class="['autocomplete', { 'is-open': isOpen }]">
		<input :placeholder="placeholder" class="form-control" type="text" :value="value"
			@input="(e) => emits('input', e)" />
		<ul v-show="data?.length" class="dropdown-menu">
			<li v-for="item in data" :key="item.key" @click="onSelect(item.value)">
				{{ item.label }}
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.autocomplete {
	position: relative;
	width: 100%;
	max-width: 400px;

	&.is-open {
		input {
			border-bottom: none;
			border-radius: 4px 4px 0 0;
			border-color: #000000e2;

			&:focus-visible {
				border-bottom: none;
			}
		}
	}

	input {
		width: 100%;
		height: 40px;
		padding: 10px;
		font-size: 18px;
		outline: none;
		border: 1px solid #00000071;
		border-radius: 4px;

		&:focus-visible {
			border-color: #000000e2;
		}
	}

	.dropdown-menu {
		background-color: #fff;
		width: 100%;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 40px;
		text-decoration: none;
		list-style: none;
		border-radius: 0 0 4px 4px;
		border: 1px solid #000000e2;
		border-top: none;

		li {
			padding: 5px 10px;
			cursor: pointer;
			font-weight: 400;

			&:hover {
				font-weight: 600;
			}
		}
	}


}
</style>