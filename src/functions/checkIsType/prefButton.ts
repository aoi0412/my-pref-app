import { prefButtonData, prefData } from '@/types'

export const isPrefButtonData = (
  data: object
): data is prefButtonData => {
  return (
    'isVisible' in data &&
    'isPressed' in data &&
    'prefName' in data &&
    'prefCode' in data
  )
}

export const isPrefData = (
  data: object
): data is prefData => {
  return 'prefName' in data && 'prefCode' in data
}
