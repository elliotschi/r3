import React, { PropTypes } from 'react'
import { pick } from 'ramda'

const Bar = (props) => (
  <rect {...pick(['x', 'y', 'width', 'height'], props)} />
)

Bar.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Bar