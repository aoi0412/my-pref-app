import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import React from 'react'
import Spinner from './Spinner'

export default {
  title: 'Elements',
  component: Spinner,
  argTypes: {
    isVisible: { control: 'boolean' },
    size: { control: 'number' },
  },
} as ComponentMeta<typeof Spinner>

export const spinner: ComponentStory<typeof Spinner> = (
  args
) => (
  <div
    style={{
      backgroundColor: '#ebf3ff',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spinner {...args} />
  </div>
)
