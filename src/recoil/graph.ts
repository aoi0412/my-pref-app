import { getPopulation } from '@/functions/api/getPopulation'
import { isPopulationResult } from '@/functions/checkIsType/population'
import { isPrefData } from '@/functions/checkIsType/prefButton'
import { graphData, prefData } from '@/types'
import { atom, atomFamily, selector } from 'recoil'
import { selectedPrefAtom } from './prefButton'

type dataType = string

export const graphDataAtom = atom<graphData[]>({
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
// export const addDataSelector = selector<prefData | undefined>({
//   key: 'addDataSelector',
//   get: ({ get }) => {
//     return undefined
//   },
//   set: ({ set, get }, newValue) => {
//     if (typeof newValue !== 'undefined' && isPrefData(newValue)) {
//       getPopulation(
//         newValue.prefCode
//         //TODO:エラーハンドリング
//       ).then((data) => {
//         get(selectedPrefAtom)
//         if (isPopulationResult(data)) {
//           data.data.forEach((typeData) => {
//             // let graphData = get(graphDataAtom(typeData.label))
//             let tmpGraphData: graphData[] = []
//             if (true) {
//               typeData.data.forEach((data) => {
//                 let tmp: graphData = {
//                   year: data.year,
//                 }
//                 tmp[newValue.prefName] = data.value
//                 tmpGraphData.push(tmp)
//               })
//             } else {
//               // typeData.data.forEach((data) => {
//               //   let tmp: graphData = { ...data }
//               //   const value = typeData.data.find((_) => _.year === data.year)?.value
//               //   tmp[newValue.prefName] = value ? value : 0
//               //   tmpGraphData.push(tmp)
//               // })
//             }
//             set(graphDataAtom, tmpGraphData)
//           })
//         } else {
//           console.log('setError', data)
//         }
//       })
//     }
//   },
// })
