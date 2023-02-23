import PrefButton from '@/components/PrefButton'
import { prefButtonDataAtom } from '@/recoil/prefButton'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

type Props = {
  buttonId: number
}

const PrefButtonFeatures = ({ buttonId }: Props) => {
  //TODO 個別にボタンを変更する関数をここに置く
  const [data, setData] = useRecoilState(
    prefButtonDataAtom(buttonId)
  )
  useEffect
  return <PrefButton {...data}>{data.prefName}</PrefButton>
}

export default PrefButtonFeatures
