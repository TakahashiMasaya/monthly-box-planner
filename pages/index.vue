<template>
  <div>
    <h1>Home page</h1>
    <nuxt-link to="test">to test</nuxt-link>
    <div @click="click">to test by ts</div>
  </div>
</template>

<script setup lang="ts">
const click = async () => {
  console.log('click')
  await navigateTo('/test', { replace: true }) 
}
</script>
