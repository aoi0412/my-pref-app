import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import React from 'react'
import GraphContainer from './GraphContainer'

export default {
  title: 'Elements',
  component: GraphContainer,
  argTypes: {
    isVisible: { control: 'boolean' },
    selectedAnyPref: { control: 'boolean' },
  },
} as ComponentMeta<typeof GraphContainer>

export const graphContainer: ComponentStory<
  typeof GraphContainer
> = (args) => (
  <div
    style={{
      backgroundColor: '#ebf3ff',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <GraphContainer {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        contents
      </div>
    </GraphContainer>
  </div>
)
