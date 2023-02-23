import { currentTypeAtom, gainedPrefListAtom, graphDataAtom } from '@/recoil/graph'
import { prefButtonDataAtom, selectedPrefAtom } from '@/recoil/prefButton'
import { graphData, prefButtonData, prefData } from '@/types'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getPopulation } from '../api/getPopulation'

export const usePrefButton = (buttonId: number): [prefButtonData, () => void] => {
  const [data, setData] = useRecoilState(prefButtonDataAtom(buttonId))
  const [gainedPrefList, setGainedPrefList] = useRecoilState(gainedPrefListAtom)
  const currentType = useRecoilValue(currentTypeAtom)
  const [graphData, setGraphData] = useRecoilState(graphDataAtom(currentType ? currentType : ''))
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

    // console.log('data:', data)
    // console.log('gainedPrefList', gainedPrefList)
    // console.log('currentType', currentType)
    // console.log('graphData', graphData)
    // console.log('selectedPrefList', selectedPrefList)
  }

  return [data, onPress]
}

type Props = {
  prefData: prefData
  graphData: graphData[]
  setGraphData: (data: graphData[]) => void
}
const getPopulationData = ({ prefData, graphData, setGraphData }: Props) => {
  const population = getPopulation({
    prefCode: prefData.prefCode,
    //TODO:エラーハンドリング
    ifError: (error) => {
      console.error('Error:', error.message)
    },
    after: () => {},
  })
  console.log('population is', population)
  if (typeof population !== 'undefined') {
    let tmp: graphData[] = [...graphData]
    population.data.forEach((typeData) => {
      tmp.forEach((data, index) => {
        data[prefData.prefName] = typeData.data[index].value
      })
      setGraphData(tmp)
    })
  }
}
