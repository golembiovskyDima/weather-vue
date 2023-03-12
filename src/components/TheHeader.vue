<script setup lang="ts">
import AppContainer from './AppContainer.vue';

</script>

<template>
	<header>
		<app-container>
			<div class="header-box">
				<router-link class="logo-wrapp" :to="{ name: 'home' }">
					<img src="../assets/logo.webp" class="logo" alt="Weather Logo" />
				</router-link>
				<nav>
					<router-link to="/">
						home
					</router-link>
					<router-link to="/favorites">
						favorites
					</router-link>
				</nav>
			</div>
		</app-container>
	</header>
</template>

<style lang="scss" scoped>
header {
	height: 68px;
	border-bottom: 1px solid rgba(84, 84, 84, .48);

	.header-box {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo-wrapp {
		display: flex;

		.logo {
			width: 80px;
			height: 60px;
			object-fit: cover;

			&:hover {
				filter: drop-shadow(16px -14px 16px #fdbc2492);
			}
		}
	}


	nav {
		display: flex;
		align-items: center;
		column-gap: 20px;
		font-size: 18px;

		a {
			color: #eb6e4b;
			font-weight: 500;
			text-decoration: none;

			&:hover {
				transform: scale(1.04);
			}
		}
	}
}
</style>