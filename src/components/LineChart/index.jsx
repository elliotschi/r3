import React, { PropTypes } from 'react'
import * as d3 from 'd3'
import Dots from '../Dots'
import XYAxis from '../XYAxis'
import Grid from '../Grid'
import ToolTip from '../ToolTip'

const parseDate = date => (new Date(date)).getTime()

const data = [
  {day:'02-11-2016', count: 180},
  {day:'02-12-2016', count: 250},
  {day:'02-13-2016', count: 150},
  {day:'02-14-2016', count: 496},
  {day:'02-15-2016', count: 140},
  {day:'02-16-2016', count: 380},
  {day:'02-17-2016', count: 100},
  {day:'02-18-2016', count: 150}
].map(({ day, count }) => ({ day: parseDate(day), count }))

const margins = {
  top: 5,
  right: 50,
  bottom: 20,
  left: 50
}

const yMax = d3.max(data, ({ count }) => count + 100)

const xScale = ({ width }) =>
  d3.scaleTime()
    .domain(d3.extent(data, ({ day }) => day))
    .range([0, width - (margins.left + margins.right)])

const yScale = ({ height }) =>
  d3.scaleLinear()
    .domain([0, yMax])
    .range([height - (margins.top + margins.bottom), 0])

const transform = `translate(${margins.left},${margins.top})`

class LineChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    chartId: PropTypes.string
    // data: PropTypes.array
  }

  static defaultProps = {
    width: 800,
    height: 300,
    chartId: 'v1_chart'
  }

  constructor(props) {
    super(props)

    this.state = {
      width: window.innerWidth || props.width,
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        },
        pos: {
          x: '',
          y: ''
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  showToolTip = (e) => {
    e.target.setAttribute('fill', '#FFFFFF')

    this.setState({
      tooltip: {
        display: true,
        data: {
          key: e.target.getAttribute('data-key'),
          value: e.target.getAttribute('data-value')
        },
        pos: {
          x: e.target.getAttribute('cx'),
          y: e.target.getAttribute('cy')
        }
      }
    })
  }

  hideToolTip = (e) => {
    e.target.setAttribute('fill', '#7dc7f4')

    this.setState({
      tooltip: {
        display: false,
        data: {
          key: '',
          value: ''
        },
        pos: {
          x: '',
          y: ''
        }
      }
    })
  }

  render() {
    const { height, chartId } = this.props
    const { width, tooltip } = this.state

    const x = xScale({ ...this.props, width })
    const y = yScale(this.props)
    const line = d3.line()
                   .x(({ day }) => x(day))
                   .y(({ count }) => y(count))

    const yGrid = d3.axisLeft(y)
                    .ticks(5)
                    .tickSize(-width, 0, 0)
                    .tickFormat('')

    return (
      <div>
        <svg
          id={chartId}
          width={width}
          height={height}
        >
          <XYAxis
            xScale={x}
            yScale={y}
            height={height}
            padding={30}
          />
          <Grid
            grid={yGrid}
            translate={`translate(${30}, 0)`}
            gridType="y"
          />
          <g transform={transform}>
            <path
              className="line shadow"
              d={line(data)}
              strokeLinecap="round"
            />
            <Dots
              xScale={x}
              yScale={y}
              data={data}
              restProps={{
                onMouseOver: this.showToolTip,
                onMouseOut: this.hideToolTip
              }}
            />
            <ToolTip tooltip={tooltip}/>
          </g>
        </svg>
      </div>
    )
  }
}

export default LineChart
