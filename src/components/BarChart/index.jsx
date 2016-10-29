import React, { PropTypes } from 'react'
import * as d3 from 'd3'

const DATA = [
  { month:'Jan', value:40 },
  { month:'Feb', value:50 },
  { month:'Mar', value:65 },
  { month:'Apr', value:60 },
  { month:'May', value:70 },
  { month:'Jun', value:55 },
  { month:'Jul', value:80 },
  { month:'Aug', value:55 },
  { month:'Sep', value:75 },
  { month:'Oct', value:50 },
  { month:'Nov', value:60 },
  { month:'Dec', value:75 }
]

const margins = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}

class BarChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    chartId: PropTypes.string
  }

  static defaultProps = {
    width: 300,
    height: 70,
    chartId: 'v_chart'
  }

  constructor() {
    super()

    this.state = {
      width: 0
    }
  }

  render() {
    const { height, chartId } = this.props
    const { width } = this.state
    let w = width - margins.left + margins.right
    let h = height - margins.top + margins.bottom

    const transform = `translate(${margins.left},${margins.top})`

    const xScale = d3.scaleOrdinal()
                     .domain(DATA.map(({ month }) => month))
                     .range([0, width])
                    //  .round(0.35)

    const yScale = d3.scaleLinear()
                     .domain([0, 100])
                     .range([height, 0])

    const rectBackground = DATA.map(
      (d, i) =>
        <rect
          fill="#58657f"
          rx="3"
          ry="3"
          key={i}
          x={xScale(d.month)}
          y={margins.top - margins.bottom}
          height={h}
          width={0.35}
        /> 
    )

    const rectForeground = DATA.map(
      (d, i) =>
        <rect
          fill="#74d3eb"
          rx="3"
          ry="3"
          key={i}
          x={xScale(d.month)}
          y={yScale(d.value)}
          className="shadow"
          height={h- yScale(d.value)}
          width={0.35}/>
    )

    return (
      <div>
        <svg
          id={chartId}
          width={width}
          height={height}
        >
          <g transform={transform}>
            {rectBackground}
            {rectForeground}
          </g>
        </svg>
      </div>
    )
  }
}

export default BarChart
