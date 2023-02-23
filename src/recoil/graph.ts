import { getPopulation } from '@/functions/api/getPopulation'
import { isPopulationResult } from '@/functions/checkIsType/population'
import { isPrefData } from '@/functions/checkIsType/prefButton'
import { graphData, prefData } from '@/types'
import { atom, atomFamily, selector } from 'recoil'

type dataType = string

export const graphDataAtom = atomFamily<graphData[], dataType>({
  key: 'graphDataAtom',
  default: [],
})

export const gainedPrefListAtom = atom<prefData[]>({
  key: 'gainedPrefList',
  default: [],
})

export const currentTypeAtom = atom<dataType | undefined>({
  key: 'currentTypeAtom',
  default: '総人口',
})

//グラフデータに選択した都道府県を追加する
export const addDataSelector = selector<prefData | undefined>({
  key: 'addDataSelector',
  get: ({ get }) => {
    return undefined
  },
  set: ({ set, get }, newValue) => {
    if (typeof newValue !== 'undefined' && isPrefData(newValue)) {
      const gainedList = get(gainedPrefListAtom)
      if (gainedList.find((data) => data.prefCode === newValue.prefCode)) {
        const population = getPopulation({
          prefCode: newValue.prefCode,
          //TODO:エラーハンドリング
          ifError: (error) => {},
          after: () => {},
        })
        //TODO:エラーハンドリング
        if (typeof population !== 'undefined')
          population.data.forEach((typeData) => {
            let graphData = get(graphDataAtom(typeData.label))
            graphData.forEach((data, index) => {
              data[newValue.prefName] = typeData.data[index].value
            })
            set(graphDataAtom(typeData.label), graphData)
          })
      }
    }
  },
})
