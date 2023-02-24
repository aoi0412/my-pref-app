import { graphData, populationType, prefData } from '@/types'
import { atom, atomFamily } from 'recoil'

export const graphIsVisibleAtom = atom<boolean>({
  key: 'graphIsVisibleAtom',
  default: false,
})

export const graphDataAtomFamily = atomFamily<graphData, populationType>({
  key: 'graphDataAtom',
  default: {
    labels: [],
    datasets: [],
  },
})

export const currentGraphDataAtom = atom<graphData>({
  key: 'currentGraphDataAtom',
  default: {
    labels: [],
    datasets: [],
  },
})

export const populationTypeListAtom = atom<populationType[]>({
  key: 'populationTypeListAtom',
  default: [],
})

export const yearLabelListAtom = atom<number[]>({
  key: 'yearLabelListAtom',
  default: [],
})

export const gainedPrefListAtom = atom<prefData[]>({
  key: 'gainedPrefList',
  default: [],
})

export const currentTypeAtom = atom<populationType>({
  key: 'currentTypeAtom',
  default: '総人口',
})
