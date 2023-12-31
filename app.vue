<template>
  <div>
    <div class="page" v-for="month in 12" :key="month">
      <Month :year="year" :month="month" />
    </div>
  </div>
</template>

<script setup lang="ts">
const year = 2024
</script>

<style lang="scss">
body {
  font-family: 'Yu Gothic', sans-serif;
  * {
    box-sizing: border-box;
  }
}

@page {
    size: A4 portrait;
    margin: 0mm;
}

.page{
	width: 210mm;
	height: 297mm;
	box-sizing: border-box;
	padding: 10mm;
  page-break-after: always;
}
</style>
