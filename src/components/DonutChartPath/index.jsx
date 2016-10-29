import React, { PropTypes } from 'react'
import * as d3 from 'd3'
const { abs } = Math

class DonutChartPath extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    pie: PropTypes.func,
    color: PropTypes.func
  }

  componentWillMount() {
    const { height } = this.props
    let radius = height

    let outerRadius = radius/2
    let innerRadius = radius/3.3

    this.arc = d3.arc()
                 .outerRadius(outerRadius)
                 .innerRadius(innerRadius)

    this.transform = `translate(${abs(radius/2)},${abs(radius/2)})`
  }

  createChart = () => {
    const { pie, data, color } = this.props

    return pie(data).map(
      (d, i) =>
        <path
          fill={color(i)}
          d={this.arc(d)}
          key={i}
        />
    )
  }

  render() {
    return (
      <g transform={this.transform}>
        {this.createChart()}
      </g>
    )
  }
}

export default DonutChartPath