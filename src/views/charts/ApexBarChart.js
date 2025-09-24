// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const ApexBarChart = ({ info, direction, totSalesFigure, onGoingEvents, onGoingEventsSales }) => {
  // ** Chart Options
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '10%',
        borderRadius: [10]
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: info,
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: onGoingEvents
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }

  // ** Chart Series
  const series = [
    {
      data: onGoingEventsSales
    }
  ]

  return (
    <Card>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
        <div>
          <CardSubtitle className='text-muted mb-25'>Total Sales</CardSubtitle>
          <CardTitle className='fw-bolder' tag='h4'>
            {totSalesFigure} LKR
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='bar' height={400} />
      </CardBody>
    </Card>
  )
}

export default ApexBarChart
