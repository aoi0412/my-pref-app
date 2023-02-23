import { button } from '@/components/Button.stories'
import PrefButton from '@/components/PrefButton'
import { usePrefButton } from '@/functions/hooks/prefButton'
import { addDataSelector } from '@/recoil/graph'
import { prefButtonDataAtom } from '@/recoil/prefButton'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

type Props = {
  buttonId: number
}

const PrefButtonFeatures = ({ buttonId }: Props) => {
  const [data, onPress] = usePrefButton(buttonId)
  return <PrefButton data={data} onPress={onPress} />
}

export default PrefButtonFeatures
