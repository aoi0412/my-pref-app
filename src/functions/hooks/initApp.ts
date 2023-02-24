import { errorSelector } from '@/recoil/error'
import { isLoadingAtom } from '@/recoil/isLoading'
import { prefButtonDataAtom, prefDataListAtom, prefDataListSelector } from '@/recoil/prefButton'
import { prefButtonData } from '@/types'
import { useEffect } from 'react'
import { selector, useRecoilState, useSetRecoilState } from 'recoil'
import { getPrefList } from '../api/getPrefList'

export const useInitApp = () => {
  //TODO:どうにかしてrecoil/isLoadingでexportしたい
  const isLoadingSelector = selector<boolean>({
    key: 'changeButtonListVisible',
    get: ({ get }) => {
      const tmp = get(isLoadingAtom)
      return false
    },
    set: ({ set, get }, newValue) => {
      set(isLoadingAtom, newValue)
      //すべての都道府県ボタンコンポーネントを表示・非表示
      // changePrefButtonListView({ get, set }, !newValue)
      get(prefDataListAtom).forEach((prefData) => {
        const prefButtonData: prefButtonData = get(prefButtonDataAtom(prefData.prefCode))
        set(prefButtonDataAtom(prefData.prefCode), {
          ...prefButtonData,
          isVisible: !newValue as boolean,
        })
      })
    },
  })

  const [a, b] = useRecoilState(isLoadingAtom)
  const [isLoading, setIsLoading] = useRecoilState(isLoadingSelector)
  const setPrefDataList = useSetRecoilState(prefDataListSelector)
  const setError = useSetRecoilState(errorSelector)
  useEffect(() => {
    setIsLoading(true)
    getPrefList({
      ifError: (e) => {
        console.error('Error', e.message)
        setError(e.message)
      },
      ifSuccess: (res) => {
        setPrefDataList(res)
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      },
      after: () => {},
    })
  }, [])
  return isLoading
}
