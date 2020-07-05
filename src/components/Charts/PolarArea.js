import React, { Component } from 'react'
import { object, bool } from 'prop-types'
import ChartComponent, { Chart } from 'react-chartjs-2'

import { polarAreaChartOptions } from './config'

class PolarArea extends Component {
  componentWillMount() {
    const { shadow } = this.props
    if (shadow) {
      Chart.defaults.polarWithShadow = Chart.defaults.polarArea
      Chart.controllers.polarWithShadow = Chart.controllers.polarArea.extend({
        draw(ease) {
          Chart.controllers.radar.prototype.draw.call(this, ease)
          const { ctx } = this.chart.chart
          ctx.save()
          ctx.shadowColor = 'rgba(0,0,0,0.2)'
          ctx.shadowBlur = 7
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 7
          ctx.responsive = true
          // eslint-disable-next-line prefer-rest-params
          Chart.controllers.radar.prototype.draw.apply(this, arguments)
          ctx.restore()
        }
      })
    }
  }

  render() {
    const { data, shadow } = this.props
    return (
      <ChartComponent
        ref={(ref) => { this.chart_instance = ref && ref.chart_instance }}
        type={shadow ? 'polarWithShadow' : 'polarArea'}
        options={{
          ...polarAreaChartOptions
        }}
        data={data}
      />
    )
  }
}

PolarArea.propTypes = {
  data: object,
  shadow: bool
}

export default PolarArea
