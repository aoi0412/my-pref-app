import GraphContainer from '@/components/GraphContainer'
import { currentGraphDataAtom, currentTypeAtom, graphIsVisibleAtom } from '@/recoil/graph'
import { selectedPrefAtom } from '@/recoil/prefButton'
import { useRecoilValue } from 'recoil'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
}
const GraphContainerFeatures = () => {
  const isVisible = useRecoilValue(graphIsVisibleAtom)
  const graphData = useRecoilValue(currentGraphDataAtom)
  const selectedPref = useRecoilValue(selectedPrefAtom)

  return (
    <GraphContainer isVisible={isVisible} selectedAnyPref={selectedPref.length > 0}>
      <Line options={options} data={graphData} height={200} width={300} />
    </GraphContainer>
  )
}

export default GraphContainerFeatures
