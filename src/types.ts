//各都道府県ボタンの状態
export type prefButtonData = {
  isPressed: boolean
  isVisible: boolean
  prefName: string
  prefCode: number
}

//グラフで表示する単一データ
export type graphData = {
  year: number
  ['prefName']: number
}

export type populationTypeData = {
  type: string
  data: graphData[]
}

export type selectedPref = {
  prefName: string
  prefCode: number
}

export type populationTypeList = string[]

export type selectedPopulationType = string

//APIのレスポンスデータ形式

export type apiResult<T> = {
  message: string
  result?: T
  statusCode?: string
  description?: string
}

export type errorResponce = {
  message: string
  statusCode: string
  description: string
}

export type prefData = {
  prefCode: number
  prefName: string
}

export type populationData = {
  year: number
  value: number
}

export type resultData<T> = {
  message: string
  result: T
}

export type populationResult = {
  boundaryYear: number
  data: { label: string; data: populationData[] }[]
}
