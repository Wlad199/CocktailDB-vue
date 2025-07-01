<template>
	<Header />
	<Coctails />
	<BrowseCoctail />
	<Footer />
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Coctails from "./components/Cocktails.vue";
import BrowseCoctail from "./components/BrowseCoctail.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore()

onMounted(() => {
	store.dispatch('fetchCoctails')
})

</script>

<style scoped></style>