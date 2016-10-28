import React, { PropTypes } from 'react'
import * as d3 from 'd3'

class Axis extends React.Component {
  static propTypes = {
    orient: PropTypes.string,
    scale: PropTypes.func,
    translate: PropTypes.string
  }

  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis = () => {
    const { orient, scale } = this.props;
    const node = this.axis
    // const axis = d3.axis().orient(orient).ticks(5).scale(scale)
    let axisFn

    switch (orient) {
      case 'bottom':
        axisFn = d3.axisBottom
        break
      case 'left':
        axisFn = d3.axisLeft
        break
      case 'top':
        axisFn = d3.axisTop
        break
      case 'right':
        axisFn = d3.axisRight
        break
      default:
        break
    }
    const axis = axisFn(scale).ticks(5)

    d3.select(node).call(axis)
  }

  render() {
    return (
      <g
        className="axis"
        ref={(node) => { this.axis = node }}
        transform={this.props.translate}
      >
      </g>
    )
  }
}

export default Axis;