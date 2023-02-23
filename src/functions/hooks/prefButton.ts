import { currentTypeAtom, gainedPrefListAtom, graphDataAtom } from '@/recoil/graph'
import { prefButtonDataAtom, selectedPrefAtom } from '@/recoil/prefButton'
import { graphData, prefButtonData, prefData } from '@/types'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getPopulation } from '../api/getPopulation'
import { isPopulationResult } from '../checkIsType/population'

export const usePrefButton = (buttonId: number): [prefButtonData, () => void] => {
  const [data, setData] = useRecoilState(prefButtonDataAtom(buttonId))
  const [gainedPrefList, setGainedPrefList] = useRecoilState(gainedPrefListAtom)
  const [graphData, setGraphData] = useRecoilState(graphDataAtom)
  const [selectedPrefList, setSelectedPrefList] = useRecoilState(selectedPrefAtom)
  const onPress = () => {
    // 人口構成データを取得していなかった場合APIを叩いてデータを格納する
    if (!gainedPrefList.some((_) => _.prefCode === data.prefCode)) {
      getPopulationData({
        prefData: data,
        graphData: graphData,
        setGraphData: setGraphData,
      })
      let tmp = [...gainedPrefList]
      tmp.push({
        prefCode: data.prefCode,
        prefName: data.prefName,
      })
      setGainedPrefList(tmp)
    }

    // 選択都道府県リストとボタンの状態を更新
    console.log(
      'fjeiaow',
      selectedPrefList.some((_) => _.prefCode === data.prefCode)
    )
    if (selectedPrefList.some((_) => _.prefCode === data.prefCode)) {
      setData({ ...data, isPressed: false })
      let tmp = [...selectedPrefList]
      setSelectedPrefList(tmp.filter((_) => _.prefCode !== data.prefCode))
    } else {
      setData({ ...data, isPressed: true })
      let tmp = [...selectedPrefList]
      tmp.push({
        prefCode: data.prefCode,
        prefName: data.prefName,
      })
      setSelectedPrefList(tmp)
    }

    console.log('data:', data)
    console.log('gainedPrefList', gainedPrefList)
    console.log('graphData', graphData)
    console.log('selectedPrefList', selectedPrefList)
  }

  return [data, onPress]
}

type Props = {
  prefData: prefData
  graphData: graphData[]
  setGraphData: (data: graphData[]) => void
}

const getPopulationData = ({ prefData, graphData, setGraphData }: Props) => {
  getPopulation(
    prefData.prefCode
    //TODO:エラーハンドリング
  ).then((data) => {
    if (isPopulationResult(data)) {
      const typeData = data.data[0]
      console.log('typeData is', typeData)
      let tmpGraphData: graphData[] = []
      if (graphData.length === 0) {
        typeData.data.forEach((popData) => {
          let tmp: graphData = {
            year: popData.year,
          }
          tmp[prefData.prefName] = popData.value
          tmpGraphData.push(tmp)
        })
      } else {
        graphData.forEach((popData) => {
          let tmp: graphData = { ...popData }
          const value = typeData.data.find((_) => _.year === popData.year)?.value
          tmp[prefData.prefName] = value ? value : 0
          tmpGraphData.push(tmp)
        })
      }
      setGraphData(tmpGraphData)
    } else {
      console.log('setError')
    }
  })
}
