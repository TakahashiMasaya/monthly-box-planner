<template>
  <div
    v-if="showType === 'selectYear'"
    class="select-year"
  >
    <h2 class="text-3xl font-bold">
      Select year to create monthly calendar.
    </h2>
    <p class="p-2">
      This app is compatible with Chrome(strongly recommended) and Firefox.
    </p>
    <u-button-group
      orientation="horizontal"
      size="xl"
    >
      <u-select
        v-model="year"
        :options="yearList"
      />
      <u-button @click="createMonthly">
        create calendar
      </u-button>
    </u-button-group>
  </div>
  <div v-else>
    <div
      v-for="month in 12"
      :key="month"
      class="page"
    >
      <Month
        :year="year"
        :month="month"
      />
    </div>
    <u-button-group
      orientation="horizontal"
      size="xl"
      class="fixed bottom-10 left-10 print:hidden"
      shadows="shadow-xl"
    >
      <u-button
        icon="pepicons-print:printer"
        block
        class="ext-2xl"
        @click="showPrint"
      >
        print
      </u-button>
      <u-button
        icon="pepicons:arrow-left"
        block
        class="ext-2xl"
        @click="showType = 'selectYear'"
      >
        back
      </u-button>
    </u-button-group>
  </div>
  <u-button
    v-if="isDark"
    :icon="'i-heroicons-moon'"
    size="xl"
    variant="solid"
    class="fixed bottom-10 right-10 print:hidden"
    @click="isDark = !isDark"
  />
  <u-button
    v-else
    :icon="'i-heroicons-sun'"
    size="xl"
    variant="solid"
    class="fixed bottom-10 right-10 print:hidden"
    @click="isDark = !isDark"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const colorMode = useColorMode()
const year = ref<number>(dayjs().year())
const yearList = Array.from({ length: 10 }, (_, i) => year.value + i)
const showType = ref<'selectYear' | 'createdYear'>('selectYear')
// const isDark = computed({
//   get() {
//     return colorMode.value === 'dark'
//   },
//   set() {
//     colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
//   },
// })
const isDark = ref(false)

// 印刷
const showPrint = () => {
  window.print()
}
// カレンダー表示
const createMonthly = () => {
  showType.value = 'createdYear'
}
watch(isDark, () => {
  colorMode.preference = isDark.value ? 'dark' : 'light'
})
onMounted(() => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  isDark.value = colorMode.value === 'dark'
})
</script>

<style scoped>
body {
  font-family: 'Yu Gothic', sans-serif;
  * {
    box-sizing: border-box;
  }
}

.select-year {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

@page {
  size: A4 portrait;
  margin: 0;
}

.page {
  width: 210mm;
  height: 297mm;
  box-sizing: border-box;
  padding: 10mm;
}
.page:not(:first-child) {
  page-break-before: always;
}
</style>
