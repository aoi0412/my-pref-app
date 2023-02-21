import { prefButtonData, prefData } from '@/types'

// APIで取得した都道府県データをボタンで使うデータ形式に変換する

export const prefDataToButtonData = (
  data: prefData
): prefButtonData => {
  return {
    isPressed: false,
    isVisible: false,
    prefCode: data.prefCode,
    prefName: data.prefName,
  }
}
