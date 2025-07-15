import type { Meta, StoryObj } from '@storybook/vue3'
import Month from './month.vue'

const meta: Meta<typeof Month> = {
  title: 'Month',
  component: Month,
  tags: ['autodocs'],
  argTypes: {
    year: { control: 'number' },
    month: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Month>

export const Default: Story = {
  args: {
    year: 2025,
    month: 7,
  },
}

export const May2024: Story = {
  args: {
    year: 2024,
    month: 5,
  },
}
