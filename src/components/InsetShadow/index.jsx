import React, { PropTypes } from 'react'

const InsetShadow = ({ id, stdDeviation, floodColor, floodOpacity }) => (
  <defs>
    <filter id={id}>
      <feOffset dx="0" dy="0" />
      <feGaussianBlur
        is
        stdDeviation={stdDeviation}
        result="offset-blur"
      />
      <feComposite
        is
        operator="out"
        in="SourceGraphic"
        in2="offset-blur"
        result="inverse"
      />
      <feFlood
        is
        flood-color={floodColor}
        flood-opacity={floodOpacity}
        result="color"
      />
      <feComposite
        is
        operator="in"
        in="color"
        in2="reverse"
        result="shadow"
      />
      <feComposite
        is
        operator="over"
        in="shadow"
        in2="SourceGraphic"
      />
    </filter>
  </defs>
)

InsetShadow.propTypes = {
  id: PropTypes.string,
  stdDeviation: PropTypes.string,
  floodColor: PropTypes.string,
  floodOpacity: PropTypes.string
}

export default InsetShadow
