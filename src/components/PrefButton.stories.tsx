import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import PrefButton from './PrefButton'

export default {
  title: 'Elements',
  component: PrefButton,
  argTypes: {
    isPressed: { control: 'boolean' },
    children: { control: 'text' },
  },
} as ComponentMeta<typeof PrefButton>

export const prefButton: ComponentStory<
  typeof PrefButton
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
    <PrefButton {...args} />
  </div>
)
