import { prefButtonData } from '@/types'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'
import {
  prefButtonDataAtom,
  prefDataListAtom,
} from './prefButton'

export const isLoadingAtom = atom({
  key: 'isLoadingAtom',
  default: true,
})
