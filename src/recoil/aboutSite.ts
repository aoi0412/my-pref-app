import { atom } from 'recoil'

export const aboutSiteIsVisibleAtom = atom<boolean>({
  key: 'aboutSiteIsVisibleAtom',
  default: false,
})
