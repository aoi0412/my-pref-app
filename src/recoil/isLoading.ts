import { atom, selector } from 'recoil'
import { changePrefButtonListView } from './prefButton'

const isLoadingAtom = atom<boolean>({
  key: 'isLoadingAtom',
  default: true,
})

export const isLoadingSelector = selector<boolean>({
  key: 'changeButtonListVisible',
  get: ({ get }) => {
    return get(isLoadingAtom)
  },
  set: ({ set, get }, newValue) => {
    if (
      typeof newValue === 'boolean' &&
      newValue !== get(isLoadingAtom)
    ) {
      set(isLoadingAtom, newValue)
      //すべての都道府県ボタンコンポーネントを表示・非表示
      changePrefButtonListView({ get, set }, newValue)
    }
  },
})
