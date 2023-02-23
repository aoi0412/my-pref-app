import { apiResult, errorResponse, populationResult } from '@/types'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { isPopulationResult } from '../checkIsType/population'

export const getPopulation = async (prefCode: number): Promise<errorResponse | populationResult> => {
  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`
  let result: errorResponse | populationResult = {
    statusCode: `null`,
    message: '上手く動作しませんでした',
    description: 'APIがうまく動きませんでした',
  }
  await axios
    .get(url, {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY,
      },
    })
    .then((res: AxiosResponse<apiResult<populationResult>>) => {
      console.log('res is', res)
      if (res.status !== 200) {
        return {
          statusCode: `${res.status}`,
          message: res.statusText,
          description: 'APIがうまく動きませんでした',
        }
      } else if (res.data.statusCode) {
        return {
          statusCode: res.data.statusCode,
          message: res.data.message,
          description: res.data.description ? res.data.description : '',
        }
      }
      if (res.data.result) {
        if (isPopulationResult(res.data.result)) {
          result = res.data.result
        }
      }
      return 'error'
    })
    .catch((e: AxiosError<{ error: string }>) => {
      return {
        statusCode: e.code ? e.code : '',
        message: e.message,
        description: '',
      }
    })
  return result
}
