import { css } from '@emotion/css'
import GraphContainerFeatures from './GraphContainerFeatures'
import PrefButtonList from './PrefButtonList'

const GraphLayout = () => {
  return (
    <div className={styles.container}>
      <GraphContainerFeatures />
      <PrefButtonList />
    </div>
  )
}

const styles = {
  container: css`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `,
}

export default GraphLayout
