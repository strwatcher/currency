import { Meta, StoryObj } from '@storybook/react'
import { NumberInput, NumberInputProps } from './number-input'

export default {
  title: 'ui/NumberInput',
  component: NumberInput,
} satisfies Meta<typeof NumberInput>

type Story = StoryObj<typeof NumberInput>

const render = (args: NumberInputProps) => {
  return <NumberInput {...args} />
}
export const Default: Story = {
  render,
  args: {
    label: 'Number input',
  },
}
