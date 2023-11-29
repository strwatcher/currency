import { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './text-input'

export default {
  title: 'ui/TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>

type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    label: 'Label',
    value: 'Value',
  },
}
