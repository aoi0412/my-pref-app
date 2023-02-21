import {
  apiResult,
  errorResponse,
  populationResult,
} from '@/types'
import axios, { AxiosError, AxiosResponse } from 'axios'

type Props = {
  prefCode: number
  ifError: (e: errorResponse) => void
  ifSuccess: (res: populationResult) => void
  after: () => void
}

export const getPopulation = (props: Props) => {
  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${props.prefCode}`
  if (process.env.NEXT_PUBLIC_RESAS_API_KEY) {
    axios
      .get(url, {
        headers: {
          'X-API-KEY':
            process.env.NEXT_PUBLIC_RESAS_API_KEY,
        },
      })
      .then(
        (
          res: AxiosResponse<apiResult<populationResult>>
        ) => {
          if (res.status !== 200) {
            props.ifError({
              statusCode: `${res.status}`,
              message: res.statusText,
              description: 'APIがうまく動きませんでした',
            })
          } else if (res.data.statusCode) {
            props.ifError({
              statusCode: res.data.statusCode,
              message: res.data.message,
              description: res.data.description
                ? res.data.description
                : '',
            })
          }
          if (res.data.result) {
            props.ifSuccess(res.data.result)
          }
        }
      )
      .catch((e: AxiosError<{ error: string }>) => {
        props.ifError({
          statusCode: e.code ? e.code : '',
          message: e.message,
          description: '',
        })
      })
  } else {
    props.ifError({
      statusCode: '',
      message: 'APIキーが正しくありません',
      description: '正しいAPIキーを設定してください',
    })
  }
}
