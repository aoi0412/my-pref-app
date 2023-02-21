import Spinner from '@/components/Spinner'
import { isLoadingSelector } from '@/recoil/isLoading'
import { useRecoilValue } from 'recoil'

const SpinnerFeatures = () => {
  const isVisible = useRecoilValue(isLoadingSelector)
  return <Spinner isVisible={isVisible} size={120} />
}

export default SpinnerFeatures
