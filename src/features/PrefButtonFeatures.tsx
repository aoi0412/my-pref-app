import PrefButton from '@/components/PrefButton'
import { usePrefButton } from '@/functions/hooks/prefButton'

type Props = {
  buttonId: number
}

const PrefButtonFeatures = ({ buttonId }: Props) => {
  const [data, onPress] = usePrefButton(buttonId)
  return <PrefButton data={data} onPress={onPress} />
}

export default PrefButtonFeatures
