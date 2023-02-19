import { css } from '@emotion/css'
import React from 'react'
import { ReactNode } from 'react'

type Props = {
  isVisible: boolean
  selectedAnyPref: boolean
  children: ReactNode
}

const GraphContainer = ({
  isVisible,
  selectedAnyPref,
  children,
}: Props) => {
  return (
    <div className={styles.container(isVisible)}>
      <div className={styles.selectedContainer(isVisible)}>
        {children}
      </div>
      <div
        className={styles.unSelectedContainer(
          isVisible,
          selectedAnyPref
        )}
      >
        <p className={styles.unSelectedText}>
          都道府県を選択してください
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: (isVisible: boolean) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    padding: 12px;
    border-radius: 12px;
    box-shadow: ${isVisible
        ? '12px 12px 29px #d0d3d7'
        : 'none'},
      ${isVisible ? '-12px -12px 28px #ffffff' : 'none'},
      ${isVisible
        ? '0px 4px 4px rgba(0, 0, 0, 0.25)'
        : 'none'};
    background-color: #ebf3ff;
  `,
  selectedContainer: (isVisible: boolean) => css`
    transition: all 0.3s ease-in-out;
    opacity: ${isVisible ? 1 : 0};
  `,
  unSelectedContainer: (
    isVisible: boolean,
    isSelected: boolean
  ) => css`
    width: 100%;
    height: 100%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 1s ease-in-out;
    background-color: rgba(235, 243, 255, 0.9);
    position: absolute;
    opacity: ${!isSelected && isVisible ? 1 : 0};
    z-index: ${!isSelected && isVisible ? 1 : -1};
  `,
  unSelectedText: css`
    color: rgba(146, 152, 165, 0.67);
    font-size: 16px;
    font-weight: bold;
  `,
}

export default GraphContainer
