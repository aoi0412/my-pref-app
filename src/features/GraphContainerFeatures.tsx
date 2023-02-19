import GraphContainer from '@/components/GraphContainer'
import { selectedPref } from '@/types'

const GraphContainerFeatures = () => {
  const isVisible = true
  const selectedList: selectedPref[] = [
    { prefName: 'prefname', prefCode: 9 },
  ]
  return (
    <GraphContainer
      isVisible={isVisible}
      selectedAnyPref={selectedList.length > 0}
    >
      <div>rechart.js</div>
    </GraphContainer>
  )
}

export default GraphContainerFeatures
