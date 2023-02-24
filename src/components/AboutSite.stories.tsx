import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import React from 'react'
import AboutSite from './AboutSite'

export default {
  title: 'Elements',
  component: AboutSite,
  argTypes: {
    isVisible: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    explanation: { control: 'string' },
  },
} as ComponentMeta<typeof AboutSite>

export const aboutSite: ComponentStory<typeof AboutSite> = (
  args
) => (
  <div
    style={{
      backgroundColor: '#ebf3ff',
      padding: '32px',
      display: 'flex',
      height: '500px',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <AboutSite {...args} />
  </div>
)
