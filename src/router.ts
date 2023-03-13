import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { MainLayout } from "./layouts";
import { Favorites, Home } from "./views";

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: MainLayout,
		children: [
			{
				path: '',
				component: Home,
				name: 'home'
			},
			{
				path: 'favorites/',
				component: Favorites,
				name: 'favorites'
			},
		]
	},
]

export default createRouter({
	history: createWebHistory('/weather-vue/'),
	routes
})