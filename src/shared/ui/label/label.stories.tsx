import type { Meta, StoryObj } from '@storybook/react'
import { Label, type LabelProps } from './label'
const meta: Meta<typeof Label> = {
  title: 'ui/Label',
  component: Label,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Label>

const render = (args: LabelProps) => <Label {...args} />

export const Default: Story = {
  render,
  args: {
    children: 'Label',
  },
}

export const Error: Story = {
  render,
  args: {
    children: 'Error',
    variant: 'error',
  },
}
