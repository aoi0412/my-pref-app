import PrefButton from '@/components/PrefButton'
import { prefButtonDataAtom } from '@/recoil/prefButton'
import { useRecoilState } from 'recoil'

type Props = {
  buttonId: number
}

const PrefButtonFeatures = ({ buttonId }: Props) => {
  //TODO 個別にボタンを変更する関数をここに置く
  const [data, setData] = useRecoilState(
    prefButtonDataAtom(buttonId)
  )
  console.log('button', buttonId, 'is:', data)
  return <PrefButton {...data}>{data.prefName}</PrefButton>
}

export default PrefButtonFeatures
