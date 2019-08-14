import styled from 'styled-components'

import Box from './Box'

const Button = styled(Box)`
  border: none;
  cursor: pointer;
  display: inline-block;
`

Button.defaultProps = {
  as: 'button'
}

Button.displayName = 'Button'

export default Button
