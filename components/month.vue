<template>
  <div>
    <div class="monthName">{{ `${props.month}` }}</div>
    <div class="calendar">
      <!-- Add weekday headers -->
      <div class="day weekday" v-for="weekday in weekdays" :key="weekday">
        {{ weekday }}
      </div>
      <!-- Add empty days at the start of the month -->
      <div class="day empty" v-for="n in firstDayOfWeek" :key="`empty-${n}`"></div>
      <!-- Add actual days of the month -->
      <div 
        class="day" 
        v-for="(day, index) in daysInMonth" 
        :key="day"
        :class="{ 
          'saturday': (index + firstDayOfWeek) % 7 === 5, // Saturday is now the 5th day of the week
          'sunday': (index + firstDayOfWeek) % 7 === 6, // Sunday is now the 6th day of the week
          'holiday': isHoliday(day) 
        }"
      >
        {{ day }}
      </div>
      <!-- Add empty days at the end of the month -->
      <div class="day empty" v-for="n in ((7 * 6) - firstDayOfWeek - daysInMonth)" :key="`empty-end-${n}`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  year: number,
  month: number,
}>()

const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const firstDayOfWeek = computed(() => {
  const day = new Date(props.year, props.month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday to 6 and shift other days by 1
});

const daysInMonth = computed(() => new Date(props.year, props.month, 0).getDate());

const isHoliday = (day: number) => day === 1;
</script>

<style lang="scss" scoped>
.monthName {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding: 1rem 0;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 2rem repeat(6, 1fr);
  gap: 0;
  padding: 0;
  background-color: #f8f8f8;
  border-radius: 1em;
  height: 842px;

  .day {
    display: flex;
    justify-content: left;
    height: auto;
    background-color: #fff;
    border: 1px solid #555555;
    border-right: none;
    border-bottom: none;
    padding: 0 1rem;
    font-weight: bold;
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
    height: 2rem;
    justify-content: center;
    align-items: center;
  }

  .today {
    background-color: #007bff;
    color: #fff;
  }
}
</style>