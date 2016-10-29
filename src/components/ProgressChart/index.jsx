import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import InsetShadow from '../InsetShadow'
const COLORS = ['#404F70','#67BAF5','#2d384d']

class ProgressChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    chartId: PropTypes.string
  }

  static defaultProps = {
    width: 200,
    height: 200,
    chartId: 'v_chart'
  }

  constructor(props) {
    super(props)

    this.state = {
      percent: 0.87
    }
  }
  
  updateDate = () => {
    this.setState({ percent: Math.random().toFixed(2) })
  }

  render() {
    const { width, height, chartId } = this.props
    const { percent } = this.state
    const outerRadius = (height/2) - 10
    const innerRadius = outerRadius - 20

    const arc = d3.arc()
                  .innerRadius(innerRadius)
                  .outerRadius(outerRadius)
                  .startAngle(0)
                  .endAngle(2 * Math.PI)

    const arcLine = d3.arc()
                      .innerRadius(innerRadius)
                      .outerRadius(outerRadius)
                      .cornerRadius(20)
                      .startAngle(-0.05)

    const transform = `translate(${width/2},${height/2})`

    const style = (num) => ({
      filter: `url(#inset-shadow${num})`
    })

    const styleText = {
      fontSize: '40px'
    }

    return (
      <div>
        <svg
          id={chartId}
          width={width}
          height={height}
          onClick={this.updateDate}
        >
          <g transform={transform}>
            <InsetShadow
              id="inset-shadow1"
              stdDeviation="5"
              floodColor="black"
              floodOpacity="0.5"
            />
            <InsetShadow
              id="inset-shadow2"
              stdDeviation="1"
              floodColor="white"
              floodOpacity="0.5"
            />
            <path
              fill={COLORS[0]}
              d={arc()}
              style={style(1)}
            />
            <path
              fill={COLORS[1]}
              d={arcLine({
                endAngle: 2 * Math.PI * percent
              })}
              style={style(2)}
            />
            <circle
              r={innerRadius}
              cx="0"
              cy="0"
              fill={COLORS[2]}
              fillOpacity="0"
            />
            <text
              textAnchor="middle"
              dy="15"
              dx="5"
              fill={d3.rgb(COLORS[1]).brighter(2)}
              style={styleText}
            >
              {`${percent * 100}%`}
            </text>
          </g>
        </svg>
      </div>
    )
  }
}

export default ProgressChart