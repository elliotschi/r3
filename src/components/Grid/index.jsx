import React, { PropTypes } from 'react'
import { select } from 'd3'

class Grid extends React.Component {
  static propTypes = {
    grid: PropTypes.func,
    gridType: PropTypes.oneOf(['x', 'y']),
    translate: PropTypes.string
  }

  componentDidUpdate (_prevProps, _prevState) {
    this.renderGrid()
  }
  
  componentDidMount() {
    this.renderGrid()
  }
  
  renderGrid = () => {
    select(this.grid).call(this.props.grid)
  }

  render() {
    const { translate } = this.props
    return (
      <g
        className="y-grid"
        transform={translate}
        ref={(node) => { this.grid = node }}
      />
    )
  }
}

export default Grid