import { prefDataListAtom } from '@/recoil/prefButton'
import { prefButtonData, prefData } from '@/types'
import { css } from '@emotion/css'
import { useRecoilValue } from 'recoil'
import PrefButtonFeatures from './PrefButtonFeatures'

const PrefButtonList = () => {
  const prefDataList = useRecoilValue(prefDataListAtom)
  return (
    <div className={styles.listContainer}>
      {prefDataList.map((prefData: prefData) => (
        <PrefButtonFeatures
          buttonId={prefData.prefCode}
          key={prefData.prefCode}
        />
      ))}
    </div>
  )
}

const styles = {
  listContainer: css`
    overflow-y: scroll;
    height: 80vh;
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
