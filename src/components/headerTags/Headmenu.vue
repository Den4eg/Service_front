<template>
	<div id="head-menu">
		<span class="menu-item" v-for="item in menuItems" :key="item.url">
			<router-link
				tag="a"
				:to="item.url"
				class="menu-anchor"
				active-class="active-header-link"
				v-if="currentUser >= item.viewLevel"
				exact
				>{{ item.title }}</router-link
			>
		</span>
	</div>
</template>

<script>
import { eventEmiter } from "../../main";

export default {
	data() {
		return {
			menuItems: [
				{ title: "Главная", url: "/", viewLevel: 3 },
				{ title: "Журнал", url: "/journal", viewLevel: 5 },
				{ title: "История", url: "/history", viewLevel: 3 },
				{ title: "Посетители", url: "/visitors", viewLevel: 3 },
				{ title: "Админка", url: "/admin", viewLevel: 9 },
			],
		};
	},
	computed: {
		currentUser() {
			return eventEmiter.$data.userDetails.permission;
		},
	},
};
</script>

<style scoped>
#head-menu {
	font-family: "Roboto-mono", sans-serif;
	font-size: 18px;
	justify-items: end;
	color: #08aef1;
	letter-spacing: 2px;
}
.menu-item {
	margin-left: 12px;
}

a {
	text-decoration: none;
	color: #08aef1;
	transition: all 0.1s;
}
a:hover {
	color: #d616ac;
}
a:active {
	position: relative;
	text-shadow: 0 0 5px #08aef1 !important;
	top: 1px;
}

.active-header-link {
	color: #d616ac;
}
</style>
