import { prefDataListAtom } from '@/recoil/prefButton'
import { prefButtonData, prefData } from '@/types'
import { css } from '@emotion/css'
import { useRecoilValue } from 'recoil'
import PrefButtonFeatures from './PrefButtonFeatures'

const PrefButtonList = () => {
  const prefDataList = useRecoilValue(prefDataListAtom)
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.listContainer}>
        {prefDataList.map((prefData: prefData) => (
          <PrefButtonFeatures buttonId={prefData.prefCode} key={prefData.prefCode} />
        ))}
      </div>
    </div>
  )
}

const styles = {
  scrollContainer: css`
    width: 90vw;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* IE, Edge 対応 */
    scrollbar-width: thin;
    scrollbar-color: #17585d #ccc;
    z-index: 1000;
    padding: 24px;
    scroll-behavior: smooth;

    ::-webkit-scrollbar {
      width: 16px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 100px;
      margin: 24px;
    }
    ::-webkit-scrollbar-track-piece {
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(146, 152, 165, 0.67);
      border-radius: 100px;
      width: 130px;
      box-shadow: 8px 8px 16px #d0d3d7, -6px -6px 12px #ffffff, 8px 8px 8px #d0d3d7;
    }
    ::-webkit-scrollbar-corner {
      background: #ebf3ff;
      border-radius: 100px;
    }
  `,
  listContainer: css`
    width: 1500px;
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
