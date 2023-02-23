import { getPopulation } from '@/functions/api/getPopulation'
import { isGraphData } from '@/functions/checkIsType/graph'
import { isPopulationResult } from '@/functions/checkIsType/population'
import { isPrefData } from '@/functions/checkIsType/prefButton'
import { dataset, graphData, populationResult, populationType, prefData } from '@/types'
import { atom, atomFamily, selector, useRecoilCallback } from 'recoil'

export const graphDataAtomFamily = atomFamily<graphData, populationType>({
  key: 'graphDataAtom',
  default: {
    labels: [],
    datasets: [],
  },
})

export const populationTypeListAtom = atom<populationType[]>({
  key: 'populationTypeListAtom',
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

//TODO：いらなくなったら消す
// // グラフに表示する人口構成の種類を変更する
// export const changePopulationTypeSelector = selector<populationType>({
//   key: 'changePopulationTypeSelector',
//   get: ({ get }) => {
//     return get(currentTypeAtom)
//   },
//   set: ({ set, get }, newValue) => {
//     // 現在選択している人口構成を変更
//     // 変更後の人口構成のデータをグラフステートに格納
//     if (typeof newValue === 'string') {
//       set(currentTypeAtom, newValue)
//       const graphData = get(graphDataAtomFamily(newValue))
//       set(currentGraphDataAtom, graphData)
//     }
//   },
// })

// 各人口構成にデータを格納する
type Props = {
  populationResult: populationResult
  prefData: prefData
}
export const addDataToEachPopulationSelector = selector<Props | undefined>({
  key: 'addDataToEachPopulation',
  get: ({ get }) => {
    return undefined
  },
  set: ({ set, get }, newValue) => {
    if (
      typeof newValue !== 'undefined' &&
      'populationResult' in newValue &&
      'prefData' in newValue &&
      isPopulationResult(newValue.populationResult) &&
      isPrefData(newValue.prefData)
    ) {
      newValue.populationResult.data.forEach((typeData) => {
        let tmpDatasets = [...get(graphDataAtomFamily(typeData.label)).datasets]
        let labels: number[] = []
        let dataList: number[] = []
        typeData.data.forEach((population) => {
          labels.push(population.year)
          dataList.push(population.value)
        })
        const dataset: dataset = {
          label: newValue.prefData.prefName,
          data: dataList,
        }
        tmpDatasets.push(dataset)
        let tmpGraphData: graphData = {
          labels: labels,
          datasets: tmpDatasets,
        }
        set(graphDataAtomFamily(typeData.label), tmpGraphData)
      })
    }
  },
})
