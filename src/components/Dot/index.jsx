import React, { PropTypes } from 'react'

const Dot = ({
  cx, cy, r, dataKey, dataValue,
  onMouseOver, onMouseOut
}) =>
  <circle
    className="dot"
    r={r}
    cx={cx}
    cy={cy}
    fill="#7dc7f4"
    stroke="#3f5175"
    strokeWidth="5px"
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    data-key={dataKey}
    data-value={dataValue}
  />

Dot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  r: PropTypes.number,
  dataKey: PropTypes.number,
  dataValue: PropTypes.number,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
}

Dot.defaultProps = {
  onMouseOver() {},
  onMouseOut() {}
}

export default Dot