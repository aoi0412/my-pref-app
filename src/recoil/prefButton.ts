import { atom, atomFamily, selector } from 'recoil'
import {
  prefButtonData,
  prefData,
  recoilSelectSetFunc,
} from '../types'

type buttonId = number

// 各ボタンの状態を管理
export const prefButtonDataAtom = atomFamily<
  prefButtonData,
  buttonId
>({
  key: 'prefButtonDataAtom',
  default: {
    isVisible: false,
    isPressed: false,
    prefName: '',
    prefCode: -1,
  },
})

// 都道府県データ一覧を管理
export const prefDataListAtom = atom<prefData[]>({
  key: 'prefDataListAtom',
  default: [],
})

// 都道府県データ一覧が変更されたときボタンデータを追加する
export const prefDataListSelector = selector<prefData[]>({
  key: 'prefButtonDataSelector',
  get: ({ get }) => {
    return get(prefDataListAtom)
  },
  set: ({ set }, newValue) => {
    if (Array.isArray(newValue)) {
      set(prefDataListAtom, newValue)
      newValue.forEach((prefData) => {
        const tmp: prefButtonData = {
          isPressed: false,
          isVisible: false,
          prefName: prefData.prefName,
          prefCode: prefData.prefCode,
        }
        set(prefButtonDataAtom(prefData.prefCode), tmp)
      })
    }
  },
})

// すべての都道府県ボタンの表示・非表示の切り替え
export const changePrefButtonListView: recoilSelectSetFunc<
  boolean
> = ({ set, get }, newValue) => {
  get(prefDataListAtom).forEach((prefData) => {
    const prefButtonData: prefButtonData = get(
      prefButtonDataAtom(prefData.prefCode)
    )
    set(prefButtonDataAtom(prefData.prefCode), {
      ...prefButtonData,
      isVisible: newValue as boolean,
    })
  })
}
