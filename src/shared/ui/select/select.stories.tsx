import type { Meta, StoryObj } from '@storybook/react'
import { Select, type SelectProps } from './select'
const meta: Meta<typeof Select> = {
  title: 'ui/Select',
  component: Select,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Select>

const render = (args: SelectProps) => <Select {...args} />

export const Default: Story = {
  render,
  args: {
    value: 'USD',
    data: ['RUB', 'EUR', 'USD'],
    label: 'Currency',
  },
}
