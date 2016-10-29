import React, { PropTypes } from 'react'

class DonutChartLegend extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    pie: PropTypes.func,
    color: PropTypes.func
  }

  createChart = () => {
    const { pie, data, color } = this.props

    return pie(data).map(
      (d, i) => {
        const transform = `translate(10,${i * 30})`

        const rectStyle = {
          fill: color(i),
          stroke: color(i)
        }

        const textStyle = {
          fill: color(i)
        }

        return (
          <g
            transform={transform}
            key={i}
          >
            <rect
              width="20"
              height="20"
              style={rectStyle}
              rx="2"
              ry="2"
            />
            <text
              x="30"
              y="15"
              className="browser-legend"
              style={textStyle}
            >
              {d.data.name}
            </text>
          </g>
        )
      }
    )
  }

  render() {
    const { width, height } = this.props
    const style = {
      visibility: 'visible'
    }

    if (width <= height + 70) {
      style.visibility = 'hidden'
    }

    const transform = `translate(${width/2 + 80}, 55)`

    return (
      <g
        is transform={transform}
        style={style}
      >
        {this.createChart()}
      </g>
    )
  }
}

export default DonutChartLegend
