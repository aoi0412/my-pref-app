import { apiResult, errorResponse, prefData } from '@/types'
import { ifError } from 'assert'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { after } from 'node:test'

type Props = {
  ifError: (e: errorResponse) => void
  ifSuccess: (res: prefData[]) => void
  after: () => void
}

export const getPrefList = (result: Props) => {
  const url =
    'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  if (process.env.NEXT_PUBLIC_RESAS_API_KEY) {
    return axios
      .get(url, {
        headers: {
          'X-API-KEY':
            process.env.NEXT_PUBLIC_RESAS_API_KEY,
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
        result.ifError({
          statusCode: e.code ? e.code : '',
          message: e.message,
          description: '',
        })
      })
      .finally(result.after)
  } else {
    result.ifError({
      statusCode: '',
      message: 'APIキーが正しくありません',
      description: '正しいAPIキーを設定してください',
    })
  }
}
