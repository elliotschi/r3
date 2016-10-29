import React, { PropTypes } from 'react'
import DonutChartPath from '../DonutChartLegend'
import DonutChartLegend from '../DonutChartLegend'
import * as d3 from 'd3'
const { random, floor } = Math

const COLORS = ['#68c8d7','#eccd63','#bb8cdd','#de6942','#52b36e','#bbc7d9']

const MAX = 100

const generateNumber = () => floor(random() * MAX)

const generateData = () => [
  { name: 'IE', count: generateNumber() },
  { name: 'Chrome', count: generateNumber() },
  { name: 'Safari', count: generateNumber() },
  { name: 'Firefox', count: generateNumber() },
  { name: 'Others', count: generateNumber() }
]

class DonutChart extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    padAngle: PropTypes.number,
    id: PropTypes.string
  }

  static defaultProps = {
    width: 450,
    height: 250,
    padAngle: 0,
    id: 'donut-chart'
  }

  constructor(props) {
    super(props)

    this.state = {
      data: generateData(),
      width: props.width
    }
  }

  
  componentWillMount () {
    const { padAngle } = this.props
    window.addEventListener('resize', this.handleResize)

    // add pie function
    this.pie = d3.pie()
                 .value(({ count }) => count)
                 .padAngle(padAngle)
                 .sort(null)

    // add color function to class as instance value
    this.color = d3.scaleOrdinal()
                   .range(COLORS)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }
  
  handleResize = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  updateData = () => {
    this.setState({
      data: generateData()
    })
  }

  render() {
    const { id, height } = this.props
    const { data, width } = this.state

    return (
      <div>
        <svg
          id={id}
          width={width}
          height={height}
          className="shadow"
          onClick={this.updateData}
        >
          <DonutChartPath
            width={width}
            height={height}
            pie={this.pie}
            color={this.color}
            data={data}
          />
          <DonutChartLegend
            width={width}
            height={height}
            pie={this.pie}
            color={this.color}
            data={data}
          />
        </svg>
      </div>
    )
  }
}

export default DonutChart
