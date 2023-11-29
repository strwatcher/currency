import { Meta, StoryObj } from '@storybook/react'
import { BaseInput, BaseInputProps } from './base-input'

export default {
  title: 'ui/BaseInput',
  component: BaseInput,
  argTypes: {
    postfix: {
      type: 'string',
    },
  },
} satisfies Meta<typeof BaseInput>

type Story = StoryObj<typeof BaseInput>

const Render = (args: BaseInputProps) => <BaseInput {...args} />

export const Default: Story = {
  render: Render,
  args: {
    label: 'label',
    input: (className, id) => <input className={className} value="" id={id} />,
  },
}

export const Active: Story = {
  render: Render,
  args: {
    label: 'active',
    input: (className, id) => (
      <input className={className} value="value" id={id} />
    ),
    active: true,
  },
}

export const ErrorEmpty: Story = {
  render: Render,
  args: {
    label: 'error',
    input: (className, id) => <input className={className} value="" id={id} />,
    error: 'Error',
  },
}

export const ErrorWithValue: Story = {
  render: Render,
  args: {
    label: 'error',
    input: (className, id) => (
      <input className={className} value="Value" id={id} />
    ),
    error: 'Error',
    active: true,
  },
}

export const WithPostfix: Story = {
  render: Render,
  args: {
    label: 'With postfix',
    input: (className, id) => <input className={className} id={id} />,
    postfix: '$',
  },
}
