<template>
  <div class="container">
    <div class="header">
      <span>{{ `${props.month}` }}</span>
      <span>{{ props.year }}</span>
    </div>
    <div class="calendar">
      <!-- Add weekday headers -->
      <div
        v-for="weekday in weekdays"
        :key="weekday"
        class="day weekday"
      >
        {{ weekday }}
      </div>
      <!-- Add empty days at the start of the month -->
      <div
        v-for="n in firstDayOfWeek"
        :key="`empty-${n}`"
        class="day empty"
      />
      <!-- Add actual days of the month -->
      <div
        v-for="(day, index) in daysInMonth"
        :key="day"
        class="day"
        :class="{
          saturday: (index + firstDayOfWeek) % 7 === 5, // Saturday is now the 5th day of the week
          sunday: (index + firstDayOfWeek) % 7 === 6, // Sunday is now the 6th day of the week
          holiday: isHoliday(day),
        }"
      >
        {{ day }}
      </div>
      <!-- Add empty days at the end of the month -->
      <div
        v-for="n in ((7 * 6) - firstDayOfWeek - daysInMonth)"
        :key="`empty-end-${n}`"
        class="day empty"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import pkg from '@holiday-jp/holiday_jp'
import dayjs from 'dayjs'

const { between } = pkg

const props = defineProps<{
  year: number
  month: number
}>()

const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const firstDayOfWeek = computed(() => {
  const day = new Date(props.year, props.month - 1, 1).getDay()
  return day === 0 ? 6 : day - 1 // Convert Sunday to 6 and shift other days by 1
})

const daysInMonth = computed(() => new Date(props.year, props.month, 0).getDate())

const isHoliday = (day: number): boolean => {
  const holidays = between(new Date(`${props.year}-01-01`), new Date(`${props.year}-12-31`))
  return holidays.some(holiday => dayjs(holiday.date).format('YYYY-MM-DD') === dayjs(`${props.year}-${props.month}-${day.toString()}`).format('YYYY-MM-DD'))
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: inherit;
}
.header {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1.5rem repeat(6, 1fr);
  gap: 0;
  padding: 0;
  height: 100%;
  .day {
    display: flex;
    justify-content: left;
    height: auto;
    background-color: #fff;
    border: 1px solid #555555;
    border-right: none;
    border-bottom: none;
    padding: 0 0.1rem;
    font-weight: bold;
    color: #999999;
    &.saturday, &.sunday, &.holiday {
      color: #555555;
    }
    &:not(.weekday) {
      background-image:
      linear-gradient(0deg, #eee 1px, transparent 1px),
      linear-gradient(90deg, #eee 1px, transparent 1px);
      background-size: 20% 12.5%; /* This creates a 5x5 grid. Adjust as needed. */
    }
    &:nth-child(7n) {
      border-right: 1px solid #555555;
    }
    &:nth-last-child(-n+7) {
      border-bottom: 1px solid #555555;
    }
  }

  .weekday {
    background-color: #ddd;
    color: #555;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
  }

  .today {
    background-color: #007bff;
    color: #fff;
  }
}
</style>
