import React, { PropTypes } from 'react'
import Dot from '../Dot'

const renderDots = ({ xScale, yScale, restProps }) => ({ day, count }, index) => {
  const circleProps = {
    cx: xScale(day),
    cy: yScale(count),
    r: 2,
    key: index,
    dataKey: day,
    dataValue: count,
    ...restProps
  }

  return <Dot {...circleProps} />
}

const Dots = ({ data, xScale, yScale, restProps }) => (
  <g>
    {
      data.map(renderDots({ xScale, yScale, restProps }))
    }
  </g>
)

Dots.propTypes = {
  data: PropTypes.array,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  restProps: PropTypes.object
}

export default Dots
