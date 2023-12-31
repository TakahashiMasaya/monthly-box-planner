<template>
  <div>
    <h1>Test Page</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['test'],
});

onMounted(() => {
  console.log('mounted!?')
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
})
</script>