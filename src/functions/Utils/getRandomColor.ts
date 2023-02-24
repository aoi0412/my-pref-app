export const setRandomColor = () => {
  const code = '0123456789ABCDEF'
  let str = '#'

  for (let i = 0; i < 6; i += 1) {
    str += code[Math.floor(Math.random() * code.length)]
  }
  str += '66'

  return str
}
