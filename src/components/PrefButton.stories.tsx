import { ComponentMeta, ComponentStory } from '@storybook/react'
import PrefButton from './PrefButton'

export default {
  title: 'Elements',
  component: PrefButton,
} as ComponentMeta<typeof PrefButton>

export const prefButton: ComponentStory<typeof PrefButton> = (args) => (
  <div
    style={{
      backgroundColor: '#ebf3ff',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <PrefButton
      onPress={() => console.log('pressed!!')}
      data={{ isPressed: false, isVisible: true, prefName: 'aiueo', prefCode: 12 }}
    />
  </div>
)
