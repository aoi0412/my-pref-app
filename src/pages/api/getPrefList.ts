import { apiResult, errorResponce, prefData } from '@/types'
import { ifError } from 'assert'
import axios, { AxiosError, AxiosResponse } from 'axios'

type Props = {
  ifError: (e: errorResponce) => void
  ifSuccess: (res: prefData[]) => void
  after: () => void
}

export const getPrefList = (result: Props) => {
  const url =
    'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  return axios
    .get(url, {
      headers: {
        'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY,
      },
    })
    .then((res: AxiosResponse<apiResult<prefData[]>>) => {
      if (res.status !== 200) {
        result.ifError({
          statusCode: `${res.status}`,
          message: res.statusText,
          description: 'APIがうまく動きませんでした',
        })
      } else if (res.data.statusCode) {
        result.ifError({
          statusCode: res.data.statusCode,
          message: res.data.message,
          description: res.data.description
            ? res.data.description
            : '',
        })
      }
      if (res.data.result) {
        result.ifSuccess(res.data.result)
      }
    })
    .catch((e: AxiosError<{ error: string }>) => {
      ifError({
        statusCode: e.code ? e.code : '',
        message: e.message,
        description: '',
      })
    })
    .finally(result.after)
}
