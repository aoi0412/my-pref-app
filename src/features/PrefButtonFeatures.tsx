import PrefButton from '@/components/elements/PrefButton'
import { prefButtonData } from '@/types'

const PrefButtonFeatures = (data: prefButtonData) => {
  //TODO 個別にボタンを変更する関数をここに置く
  return <PrefButton {...data}>{data.prefName}</PrefButton>
}

export default PrefButtonFeatures
