<template>
	<ScaleLoader
		style="margin-top: 150px;"
		:loading="true"
		:height="spinnerHeight"
		:width="spinnerWidth"
		:radius="spinnerRadius"
		:margin="spinnerMargin"
		:color="spinnerColor" />
</template>

<script setup>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';
import { ref } from "vue";

const spinnerColor = ref('#fdbb00')
const spinnerHeight = ref('80px')
const spinnerWidth = ref('40px')
const spinnerRadius = ref('2px')
const spinnerMargin = ref('2px')
</script>

<style scoped lang='scss'></style>