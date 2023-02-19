import { css, cx } from '@emotion/css'
import { Inter } from '@next/font/google'
type PrefButtonProps = {
  props?: React.ComponentProps<'button'>
  isVisible?: boolean
  color?: string
  isPressed?: boolean
  children: string
}
const PrefButton = ({
  props,
  isPressed = false,
  isVisible = false,
  children,
}: PrefButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      <div className={styles.inner(isPressed)}>
        <p className={styles.mountColor}>{children}</p>
      </div>
    </button>
  )
}

const styles = {
  button: css`
    transition: all 0.4s ease-in-out;
    background-color: #ebf3ff;
    border: none;
    padding: 2px;
    border-radius: 100px;
    opacity: 0.67;
    font-size: 16px;
    color: rgba(146, 152, 165, 0.67);
    box-shadow: 8px 8px 16px #d0d3d7, -6px -6px 12px #ffffff,
      8px 8px 8px #d0d3d7;
    :active {
      transition: all 0.1s ease-in-out;
      box-shadow: none;
    }
  `,
  inner: (isPressed: boolean) => css`
    transition: all 0.3s ease-in-out;
    border-radius: 100px;
    box-shadow: ${isPressed
        ? 'inset 8px 8px 16px #d0d3d7'
        : 'none'},
      ${isPressed ? 'inset -8px -8px 16px #ffffff' : 'none'};
  `,
  mountColor: css`
    transition: all 0.3s ease-in-out;
    padding: 12px 24px;
    margin: 0;
    font-weight: bold;
    border-radius: 100px;
  `,
}

export default PrefButton
