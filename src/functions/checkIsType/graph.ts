import { dataset, graphData } from '@/types'

export const isGraphData = (data: object): data is graphData => {
  return (
    'labels' in data &&
    'datasets' in data &&
    Array.isArray(data.labels) &&
    typeof data.labels[0] === 'number' &&
    Array.isArray(data.datasets) &&
    isDataset(data.datasets[0])
  )
}

const isDataset = (data: any): data is dataset => {
  return (
    'label' in data &&
    'data' in data &&
    typeof data.label === 'string' &&
    Array.isArray(data.data) &&
    typeof data.data[0] === 'number'
  )
}
