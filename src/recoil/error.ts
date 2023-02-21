import { atom, selector } from 'recoil'
import { changePrefButtonListView } from './prefButton'

const errorAtom = atom<string | null>({
  key: 'errorAtom',
  default: null,
})

export const errorSelector = selector<string | null>({
  key: 'changeButtonListVisible',
  get: ({ get }) => {
    return get(errorAtom)
  },
  set: ({ set, get }, newValue) => {
    if (typeof newValue === 'string') {
      set(errorAtom, newValue)
      //すべての都道府県ボタンコンポーネントを表示・非表示
      changePrefButtonListView({ get, set }, false)
    }
  },
})
