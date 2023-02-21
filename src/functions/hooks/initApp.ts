import { errorSelector } from '@/recoil/error'
import { isLoadingSelector } from '@/recoil/isLoading'
import {
  prefDataListAtom,
  prefDataListSelector,
} from '@/recoil/prefButton'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { getPrefList } from '../api/getPrefList'

export const useInitApp = () => {
  const setIsLoading = useSetRecoilState(isLoadingSelector)
  const setPrefDataList = useSetRecoilState(
    prefDataListSelector
  )
  const setError = useSetRecoilState(errorSelector)
  useEffect(() => {
    getPrefList({
      ifError: (e) => {
        setError(e.message)
      },
      ifSuccess: (res) => {
        setPrefDataList(res)
        setIsLoading(false)
      },
    })
  }, [])
}
