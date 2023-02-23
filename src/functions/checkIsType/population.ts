import { populationData, populationResult } from '@/types'

export const isPopulationResult = (
  data: object
): data is populationResult => {
  return (
    'boundaryYear' in data &&
    typeof data.boundaryYear === 'number' &&
    'data' in data &&
    Array.isArray(data.data) &&
    'label' in data.data[0] &&
    typeof data.data[0].label === 'string' &&
    'data' in data.data[0] &&
    Array.isArray(data.data[0].data) &&
    isPopulationData(data.data[0].data[0])
  )
}

export const isPopulationData = (
  data: any
): data is populationData => {
  return (
    'year' in data &&
    'value' in data &&
    typeof data.year === 'string' &&
    typeof data.value === 'number'
  )
}
