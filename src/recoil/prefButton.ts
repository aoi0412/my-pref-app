import { isPrefData } from '@/functions/checkIsType/prefButton'
import { atom, atomFamily, selector } from 'recoil'
import { prefButtonData, prefData, prefPopulationData, recoilSelectSetFunc } from '../types'

type buttonId = number

// 各ボタンの状態を管理
export const prefButtonDataAtom = atomFamily<prefButtonData, buttonId>({
  key: 'prefButtonDataAtom',
  default: {
    isVisible: false,
    isPressed: false,
    prefName: '',
    prefCode: -1,
  },
})

export const prefPopulationDataAtomFamily = atomFamily<prefPopulationData, buttonId>({
  key: 'prefPopulationDataAtomFamily',
  default: {},
})

//選択されている都道府県ボタンを管理
export const selectedPrefAtom = atom<prefData[]>({
  key: 'selectedPrefAtom',
  default: [],
})

// 都道府県データ一覧を管理
export const prefDataListAtom = atom<prefData[]>({
  key: 'prefDataListAtom',
  default: [],
})

// 都道府県ボタンが押されたときに選択済み都道府県とボタン情報を変更する
export const selectedPrefButtonSelector = selector<prefData[]>({
  key: 'pressPrefButtonSelector',
  get: ({ get }) => {
    return get(selectedPrefAtom)
  },
  set: ({ set, get }, newValue) => {
    if (isPrefData(newValue)) {
      let buttonData = get(prefButtonDataAtom(newValue.prefCode))
      let tmp = get(selectedPrefAtom)
      if (buttonData.isPressed) {
        tmp = tmp.filter((data) => data.prefCode === newValue.prefCode)
      } else {
        tmp.push(newValue)
      }
      set(prefButtonDataAtom(newValue.prefCode), {
        ...buttonData,
        isPressed: !buttonData.isPressed,
      })
      set(selectedPrefAtom, tmp)
    }
  },
})

// 都道府県データ一覧が変更されたときボタンデータを追加する
export const prefDataListSelector = selector<prefData[]>({
  key: 'prefButtonDataSelector',
  get: ({ get }) => {
    return get(prefDataListAtom)
  },
  set: ({ set, get }, newValue) => {
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
export const changePrefButtonListView: recoilSelectSetFunc<boolean> = ({ set, get }, newValue) => {
  get(prefDataListAtom).forEach((prefData) => {
    const prefButtonData: prefButtonData = get(prefButtonDataAtom(prefData.prefCode))
    set(prefButtonDataAtom(prefData.prefCode), {
      ...prefButtonData,
      isVisible: newValue as boolean,
    })
  })
}
