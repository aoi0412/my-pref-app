import { prefButtonData } from '@/types'
import { css } from '@emotion/css'
import PrefButtonFeatures from './PrefButtonFeatures'

const PrefButtonList = () => {
  const list: prefButtonData[] = [
    {
      isPressed: true,
      prefName: '都道府県ボタン１',
      isVisible: true,
      prefCode: 0,
    },
    {
      isPressed: false,
      prefName: '都道府県ボタン2',
      isVisible: true,
      prefCode: 0,
    },
    {
      isPressed: true,
      prefName: '都道府県ボタンaaaaaaa',
      isVisible: true,
      prefCode: 0,
    },
    {
      isPressed: false,
      prefName: '都道府',
      isVisible: true,
      prefCode: 0,
    },
  ]
  return (
    <div className={styles.listContainer}>
      {list.map((prefData: prefButtonData) => (
        <PrefButtonFeatures
          key={prefData.prefCode}
          {...prefData}
        />
      ))}
    </div>
  )
}

const styles = {
  listContainer: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 24px;
    gap: 24px;
    z-index: 1;
  `,
}

export default PrefButtonList
