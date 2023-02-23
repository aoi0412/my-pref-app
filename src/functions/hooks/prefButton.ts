import { addDataToEachPopulationSelector, gainedPrefListAtom } from '@/recoil/graph'
import { prefButtonDataAtom, selectedPrefAtom } from '@/recoil/prefButton'
import { populationResult, prefButtonData, prefData } from '@/types'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { getPopulation } from '../api/getPopulation'
import { isPopulationResult } from '../checkIsType/population'

export const usePrefButton = (buttonId: number): [prefButtonData, () => void] => {
  const [data, setData] = useRecoilState(prefButtonDataAtom(buttonId))
  const [gainedPrefList, setGainedPrefList] = useRecoilState(gainedPrefListAtom)
  const addDataToEachPopulation = useSetRecoilState(addDataToEachPopulationSelector)
  const [selectedPrefList, setSelectedPrefList] = useRecoilState(selectedPrefAtom)
  const onPress = () => {
    // 人口構成データを取得していなかった場合APIを叩いてデータを格納する&取得済み都道府県リストを更新
    if (!gainedPrefList.some((_) => _.prefCode === data.prefCode)) {
      getPopulationData({
        prefData: data,
        setGraphData: addDataToEachPopulation,
      })

      let tmp = [...gainedPrefList]
      tmp.push({
        prefCode: data.prefCode,
        prefName: data.prefName,
      })
      setGainedPrefList(tmp)
    }

    // 選択都道府県リストとボタンの状態を更新
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
    console.log('selectedPrefList', selectedPrefList)
  }

  return [data, onPress]
}

type Props = {
  prefData: prefData
  setGraphData: (data: { populationResult: populationResult; prefData: prefData }) => void
}

const getPopulationData = ({ prefData, setGraphData }: Props) => {
  getPopulation(
    prefData.prefCode
    //TODO:エラーハンドリング
  ).then((data) => {
    if (isPopulationResult(data)) {
      setGraphData({
        prefData: prefData,
        populationResult: data,
      })
    } else {
      console.log('setError')
    }
  })
}
