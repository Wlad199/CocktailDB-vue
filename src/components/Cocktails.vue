<template>
	<div className="cocktail__content content-cocktail">
		<div v-if="loadningStatus === 'error'" class="error-message">
			<p>Error 505</p>
			<p>{{ errorMessage }}</p>
		</div>

		<ul v-else-if="loadningStatus === 'sucsess'" class="list">
			<li
				v-for="cocktail in searchCocktail"
				:key="cocktail.idDrink"
				class="item">
				<img :src="cocktail.strDrinkThumb" alt="image">
				<p><span>{{ cocktail.strDrink }}</span></p>
			</li>
		</ul>

		<Spinner v-else />

	</div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Spinner from "./Spinner.vue";

const store = useStore()
const searchCocktail = computed(() => store.getters.search)
const loadningStatus = computed(() => store.state.isLoaded)
const errorMessage = computed(() => store.state.errorMessage)

</script>

<style scoped lang='scss'>
.list {
	display: flex;
	flex-wrap: wrap;
	color: #fff;
}

.nothing {
	color: #fff;
	font-size: 30px;
	margin: 0 auto;
	padding-top: 30px;
	text-align: center;
	line-height: 120%;
}

.item {
	flex: 0 0 20%;
	position: relative;
	padding-bottom: 20%;

	@media (max-width: 767px) {
		flex: 0 0 25%;
		padding-bottom: 25%;
	}

	@media (max-width: 500px) {
		flex: 0 0 50%;
		padding-bottom: 50%;

	}

	p {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(#000, 0.7);
		color: #fff;
		font-size: 20px;
		text-align: center;
		transform: scale(0);
		transition: all 0.3s ease 0s;
		visibility: hidden;

		@media (max-width: 767px) {
			font-size: 14px;
			line-height: 110%;
			width: 100%;
			height: 35%;
			background-color: rgba(#000, 0.4);
			color: #fff;
			text-align: center;
			transform: scale(1);
			visibility: visible;
		}
	}

	&:hover p {
		@media (min-width: 767px) {
			transform: scale(1);
			visibility: visible;
		}
	}
}

img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.error-message {
	font-size: 35px;
	color: #fff;
	margin-top: 50px;
	text-align: center;
	color: red;

	p {
		margin-bottom: 15px;
	}
}
</style>