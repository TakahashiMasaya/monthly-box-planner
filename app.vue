<template>
  <div>
    <div v-for="month in 12" :key="month">
      <Month :year="year" :month="month" />
      <div class="pagebreak"></div>
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
  .pagebreak {
    break-after: page;
  }
}
</style>
