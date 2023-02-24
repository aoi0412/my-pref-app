import Spinner from '@/components/Spinner'
import { isLoadingAtom } from '@/recoil/isLoading'
import { useRecoilValue } from 'recoil'

const SpinnerFeatures = () => {
  const isVisible = useRecoilValue(isLoadingAtom)
  return <Spinner isVisible={isVisible} size={120} />
}

export default SpinnerFeatures
