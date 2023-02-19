import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import React from 'react'
import Button from './Button'

export default {
  title: 'Elements',
  component: Button,
} as ComponentMeta<typeof Button>

export const button: ComponentStory<typeof Button> = (
  args
) => <Button />
