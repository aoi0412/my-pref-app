import { css, keyframes } from '@emotion/css'
import React from 'react'

type Props = {
  isVisible: boolean
  size: number
}

const Spinner = ({
  isVisible = true,
  size = 40,
}: Props) => {
  const list = new Array(8).fill(0)
  return (
    <div className={styles.container(size, isVisible)}>
      {list.map((a, index) => (
        <div
          key={index}
          className={styles.dotContainer(size, index)}
        >
          <div className={styles.dot(size, index)} />
        </div>
      ))}
    </div>
  )
}

const animation2 = keyframes`
    20% {
      box-shadow: none;
    }
    40%{
      box-shadow: 2px 2px 4px #d0d3d7, -2px -2px 3px #ffffff,
      2px 2px 2px #d0d3d7;
    }
    60%{
      box-shadow: 2px 2px 4px #d0d3d7, -2px -2px 3px #ffffff,
      2px 2px 2px #d0d3d7;
    }
    80% {
      box-shadow: none;
    }
`

const styles = {
  container: (size: number, isVisible: boolean) => css`
    width: ${size * 1.5}px;
    height: ${size * 1.5}px;
    position: 'relative';
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${isVisible ? 1 : 0};
  `,
  dotContainer: (size: number, rotate: number) => css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    transform: rotate(${rotate * 45}deg);
  `,
  dot: (size: number, rotate: number) => css`
    transition: all 0.3s ease-in-out;
    width: ${size / 6}px;
    height: ${size / 6}px;
    transform: rotate(${-rotate * 45}deg);
    background-color: #ebf3ff;
    border-radius: 100px;
    animation: ${animation2} 4s infinite linear;
    animation-delay: ${(-4 * rotate) / 8}s;
  `,
}

export default Spinner
