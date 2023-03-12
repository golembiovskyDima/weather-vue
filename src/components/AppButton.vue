<script setup lang="ts">

const props = defineProps({
	label: {
		type: String,
		default: "Button",
	},
	variant: {
		type: String,
		default: "primary",
	},
	disabled: {
		type: Boolean,
		required: false,
	},
	rounded: {
		type: Boolean,
		required: false,
	},
	outlined: {
		type: Boolean,
		required: false,
	},
	icon: {
		type: String,
		required: false,
	},
	size: {
		type: String,
		default: "md",
		validator: (value: string) => ["sm", "md", "lg"].includes(value),
	},
	isWeight: {
		type: Boolean,
		default: false,
	},
	isUppercase: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['click']);

const onClick = () => {
	emit("click");
};

</script>

<template>
	<button :class="[
		'btn',
		`btn_${variant}`,
		`btn_${size}`,
		{ btn_rounded: rounded },
		{ btn_outlined: outlined },
		{ btn_icon: icon },
		{ btn_weight: isWeight },
		{ btn_is_uppercase: isUppercase },
	]" :disabled="disabled" @click="onClick">
		<span v-if="icon">
			<font-awesome-icon :icon="icon" />
		</span>
		<span v-else>{{ label }}</span>
	</button>
</template>

<style lang="scss" scoped>
a {
	display: block;
}

.btn {
	padding: 8px 20px;
	min-height: 32px;
	color: #fff;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	transition: 0.2s;
	font-family: "Museo Cyrl";

	&_primary {
		background: rgb(73, 176, 249);
		transition: 0.2s all ease;

		&:enabled:hover {
			box-shadow: 0px 0px 15px 2px rgba(73, 176, 249, 0.503);
			transition: 0.4s all ease;
		}
	}

	&_secondary {
		background: #48484a;
		transition: 0.2s all ease;

		&:enabled:hover {
			box-shadow: 0px 0px 15px 2px #48484aa3;
			transition: 0.4s all ease;
		}
	}

	&_cancel {
		background: inherit;
		border: 1px solid rgba(248, 16, 16, 0.918);
		color: rgba(248, 16, 16, 0.918);

		&:enabled:hover {
			box-shadow: 0px 0px 15px 2px rgba(248, 16, 16, 0.22);
			transition: 0.3s all ease;
		}
	}

	&:disabled {
		opacity: 0.6;
		cursor: default;
	}

	&_rounded {
		border-radius: 15px;
	}

	&_outlined {
		background: transparent;
		color: #000;

		&:hover {
			color: #fff;
		}
	}

	&_icon {
		padding: 0;
		width: 32px;
		height: 32px;
	}

	&_sm {
		min-height: 32px;
		padding: 8px 20px;
		font-size: 16px;
	}

	&_md {
		min-height: 40px;
		padding: 8px 25px;
		font-size: 18px;
	}

	&_lg {
		min-height: 46px;
		padding: 8px 30px;
		font-size: 20px;
	}

	&_is_weight {
		font-weight: 700;
	}

	&_is_uppercase {
		text-transform: uppercase;
	}
}
</style>