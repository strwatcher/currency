import type { Meta, StoryObj } from '@storybook/react'
import { IconSwitchHorizontal } from '@tabler/icons-react'
import { Button, type ButtonProps } from './button'

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Button>

const render = (args: ButtonProps) => <Button {...args} />

export const Default: Story = {
  render,
  args: {
    children: 'Button',
  },
}

export const IconButton: Story = {
  render,
  args: {
    children: <IconSwitchHorizontal />,
  },
}

export const LightVariant: Story = {
  render,
  args: {
    children: <IconSwitchHorizontal />,
    variant: 'light',
  },
}
