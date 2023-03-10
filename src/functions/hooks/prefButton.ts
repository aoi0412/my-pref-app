import { currentGraphDataAtom, currentTypeAtom, gainedPrefListAtom, yearLabelListAtom } from '@/recoil/graph'
import { prefButtonDataAtom, prefPopulationDataAtomFamily, selectedPrefAtom } from '@/recoil/prefButton'
import { populationResult, prefButtonData, prefData, prefPopulationData } from '@/types'
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil'
import { getPopulation } from '../api/getPopulation'
import { isPopulationResult } from '../checkIsType/population'
import { isPrefData } from '../checkIsType/prefButton'
import { setRandomColor } from '../Utils/getRandomColor'

export const usePrefButton = (buttonId: number): [prefButtonData, () => void] => {
  const [data, setData] = useRecoilState(prefButtonDataAtom(buttonId))
  const [gainedPrefList, setGainedPrefList] = useRecoilState(gainedPrefListAtom)
  const [selectedPrefList, setSelectedPrefList] = useRecoilState(selectedPrefAtom)
  const setPrefPopulationData = useRecoilCallback(
    ({ set }) =>
      (data: { populationResult: populationResult; prefData: prefData }) => {
        if (
          typeof data !== 'undefined' &&
          'populationResult' in data &&
          'prefData' in data &&
          isPopulationResult(data.populationResult) &&
          isPrefData(data.prefData)
        ) {
          let tmpPrefPopulationData: prefPopulationData = {}
          let tmpLabels: number[] = []
          const color = setRandomColor()
          data.populationResult.data.forEach((typeData) => {
            tmpLabels = []
            let tmpDataList: number[] = []
            typeData.data.forEach((population) => {
              tmpLabels.push(population.year)
              tmpDataList.push(population.value)
            })
            tmpPrefPopulationData[typeData.label] = {
              label: data.prefData.prefName,
              data: tmpDataList,
              borderColor: color,
              backgroundColor: color,
            }
          })
          let graphData = { ...currentGraphData }
          let dataSets = [...graphData.datasets]
          dataSets.push(tmpPrefPopulationData[currentGraphType])
          graphData.datasets = dataSets
          graphData.labels = tmpLabels
          setCurrentGraphData(graphData)
          set(yearLabelListAtom, tmpLabels)
          set(prefPopulationDataAtomFamily(data.prefData.prefCode), tmpPrefPopulationData)
        }
      }
  )
  const currentGraphType = useRecoilValue(currentTypeAtom)
  const prefPopulationData = useRecoilValue(prefPopulationDataAtomFamily(buttonId))
  const [currentGraphData, setCurrentGraphData] = useRecoilState(currentGraphDataAtom)
  const yearLabel = useRecoilValue(yearLabelListAtom)

  const onPress = async () => {
    // ?????????????????????????????????????????????????????????
    if (selectedPrefList.some((_) => _.prefCode === data.prefCode)) {
      setData({ ...data, isPressed: false })
      let tmp = [...selectedPrefList]
      setSelectedPrefList(tmp.filter((_) => _.prefCode !== data.prefCode))

      //??????????????????????????????????????????
      let graphData = { ...currentGraphData }
      let dataSets = [...graphData.datasets]
      dataSets = dataSets.filter((_) => _.label !== data.prefName)
      graphData.datasets = dataSets
      graphData.labels = yearLabel
      setCurrentGraphData(graphData)
    } else {
      // ?????????????????????????????????????????????????????????API????????????????????????????????????&??????????????????????????????????????????
      if (!gainedPrefList.some((_) => _.prefCode === data.prefCode)) {
        getPopulationData({
          prefData: { prefCode: data.prefCode, prefName: data.prefName },
          setPrefPopulationData: setPrefPopulationData,
        })
        let tmp = [...gainedPrefList]
        tmp.push({
          prefCode: data.prefCode,
          prefName: data.prefName,
        })
        setGainedPrefList(tmp)
      } else {
        //??????????????????????????????????????????
        let graphData = { ...currentGraphData }
        let dataSets = [...graphData.datasets]
        dataSets.push(prefPopulationData[currentGraphType])
        graphData.datasets = dataSets
        graphData.labels = yearLabel
        setCurrentGraphData(graphData)
      }
      setData({ ...data, isPressed: true })
      let tmp = [...selectedPrefList]
      tmp.push({
        prefCode: data.prefCode,
        prefName: data.prefName,
      })
      setSelectedPrefList(tmp)
    }
  }

  return [data, onPress]
}

type Props = {
  prefData: prefData
  setPrefPopulationData: (data: { populationResult: populationResult; prefData: prefData }) => void
}
const getPopulationData = async ({ prefData, setPrefPopulationData }: Props) => {
  const data = await getPopulation(prefData.prefCode)
  if (isPopulationResult(data)) {
    setPrefPopulationData({
      prefData: prefData,
      populationResult: data,
    })
  }
}
