import { css } from '@emotion/css'
import { ReactNode } from 'react'
import CloseIcon from '../../public/close.svg'
import QuestionMarkIcon from '../../public/questionMark.svg'
type Props = {
  isVisible: boolean
  isOpen: boolean
  explanation: string
  image: ReactNode
  onPress: () => void
  onClose: () => void
}

const AboutSite = ({
  isVisible,
  isOpen,
  explanation,
  image,
  onPress,
  onClose,
}: Props) => {
  console.log(isOpen)
  return (
    <div className={styles.component(isOpen)}>
      <div
        onClick={onPress}
        className={styles.modalContainer(isVisible, isOpen)}
      >
        <button
          onClick={onClose}
          className={styles.closeButton(
            isVisible && isOpen
          )}
        >
          <CloseIcon />
        </button>

        <div
          className={styles.imageContainer(
            isVisible && isOpen
          )}
        >
          {image}
        </div>
        <p
          className={styles.explanation(
            isVisible && isOpen
          )}
        >
          {explanation}
        </p>
        <div
          className={styles.questionMarkIcon(
            isVisible && !isOpen
          )}
        >
          <QuestionMarkIcon />
        </div>
      </div>
    </div>
  )
}

const styles = {
  component: (isOpen: boolean) => css`
    transition: all 1s ease-in-out;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: ${isOpen ? 2 : 0};
  `,
  modalContainer: (
    isVisible: boolean,
    isOpen: boolean
  ) => css`
    transition: all 0.6s ease-in-out
      ${isOpen ? '0s' : '0.3s'};
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    border: none;
    width: ${isOpen ? '80%' : '4px'};
    height: ${isOpen ? '80%' : '4px'};
    border-radius: 32px;
    box-shadow: ${isVisible
      ? '10px 10px 20px #d0d3d7, -8px -8px 16px #ffffff'
      : 'none'};
    background-color: #ebf3ff;
    :active {
      transition: all 0.3s ease-in-out;
      ${!isOpen && 'box-shadow: none;'}
    }
  `,
  closeButton: (isVisible: boolean) => css`
    position: absolute;
    top: 16px;
    right: 16px;
    transition: all 0.3s ease-in-out
      ${isVisible ? '0.4s' : '0s'};
    border: none;
    box-shadow: ${isVisible
        ? '10px 10px 20px #d0d3d7'
        : 'none'},
      ${isVisible ? '-8px -8px 16px #ffffff' : 'none'};
    opacity: ${isVisible ? 1 : 0};
    border-radius: 100px;
    width: 50px;
    height: 50px;
    background-color: #ebf3ff;
    z-index: 100;
    :active {
      transition: all 0.3s ease-in-out;
      box-shadow: none;
    }
  `,
  questionMarkIcon: (isVisible: boolean) => css`
    transition: all 0.2s ease-in-out
      ${isVisible ? '1s' : '0s'};
    opacity: ${isVisible ? 1 : 0};
    position: absolute;
    width: 12px;
    height: 12px;
  `,
  imageContainer: (isVisible: boolean) => css`
    transition: all 0.3s ease-in-out
      ${isVisible ? '0.6s' : '0s'};
    box-shadow: inset 8px 8px 16px #d0d3d7,
      inset -8px -8px 16px #ffffff;
    width: 100%;
    height: 200px;
    border-radius: 16px;
    margin: 24px 0px;
    opacity: ${isVisible ? 1 : 0};
  `,
  explanation: (isVisible: boolean) => css`
    transition: all 0.3s ease-in-out
      ${isVisible ? '0.6s' : '0s'};
    color: rgba(146, 152, 165, 0.67);
    font-weight: bold;
    margin: 0px 20px;
    text-align: center;
    opacity: ${isVisible ? 1 : 0};
  `,
}

export default AboutSite
