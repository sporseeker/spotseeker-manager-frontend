// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, CardHeader, CardTitle, Card, CardBody, CardText, Alert, CardImg, CardImgOverlay } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

import { TrendingUp, ThumbsUp, ChevronsUp, DollarSign, User, Cpu, Check, X, AlertCircle, Database } from 'react-feather'

// ** Demo Components
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import Select from 'react-select'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import StatsVertical from '@components/widgets/stats/StatsVertical'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/charts/recharts.scss'

// ** Services
import StatsService from '../services/StatsService'
import Skeleton from 'react-loading-skeleton'
import TCountByDateLineChart from './charts/TCountByDateLineChart'
import EventService from '../services/EventService'
import { formatNumber } from '../utility/Utils'
import TSaleByDateLineChart from './charts/TSaleByDateLineChart'

const Home = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** vars
  const [pending, setPending] = useState(false)
  const [salesByDate, setSalesByDate] = useState([])
  const [ticketsCountByDate, setTicketsCountByDate] = useState([])
  const [events, setEventsData] = useState([])
  const [eventStat, setEventStat] = useState()
  const [statData, setStatData] = useState([])

  const createStat = (statName, statValue) => {
    switch (statName) {
        
      /*case "tot_bookings": return {
        title: statValue,
        subtitle: 'Bookings Processed',
        color: 'light-success',
        icon: <Database size={24} />
      }
      break
      case "customer_count": return {
        title: statValue,
        subtitle: 'Customers',
        color: 'light-primary',
        icon: <User size={24} />
      }
      break*/
      case "ticket_packages": return {
        title: statValue.length,
        subtitle: 'Ticket Packages',
        color: 'light-warning',
        icon: <ChevronsUp size={24} />
      }
      break
      case "events_tot_ticket_sales": setTotSalesFigure(statValue)
      break
      case "events_ticket_sales": {
        statValue.map(event => {
          setOnGoingEvents(onGoingEvents => [...onGoingEvents, event.event_name])
          setOnGoingEventsSales(onGoingEventsSales => [...onGoingEventsSales, event.tot_sale])
        })
      }
      break
      case "sales_by_date": {
        const entries = Object.entries(statValue)
        entries.map(([key, val] = entry) => {
          const lineObj =  {
            name: `${key.split("-")[1]}/${key.split("-")[2]}`,
            pv: parseInt(val)
          }
          setSalesByDate(salesByDate => [...salesByDate, lineObj])
        })
      }
      break
      case "tickets_count_by_date": {
        const entries = Object.entries(statValue)
        entries.map(([key, val] = entry) => {
          const lineObj =  {
            name: `${key.split("-")[1]}/${key.split("-")[2]}`,
            pv: parseInt(val)
          }
          setTicketsCountByDate(salesByDate => [...salesByDate, lineObj])
        })
      }
      break
      default: break
    }
  }

  useEffect(() => {
    setPending(true)
    setStatData([])
    setEventStat([])
    setSalesByDate([])

    EventService.getAllEvents()
    .then(res => {
        res.data.data.map(event => {
            const eventObj = {
                value: event.id,
                label: event.name
            }
            setEventsData(events => [...events, eventObj])
        })

        StatsService.getEventStats(res.data.data[0].id)
        .then(res => {
            setEventStat(res.data.data)
            const entries = Object.entries(res.data.data)
            entries.map(([key, val] = entry) => {
                const stat = createStat(key, val)
                if (stat) {
                    setStatData(statData => [...statData, stat])
                }
            })
            setPending(false)
        })
        .catch(err => {
            console.log(err)
            setPending(false)
        })
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const handleEventChange = e => {
    setPending(true)
    setStatData([])
    setEventStat([])
    setSalesByDate([])
    setTicketsCountByDate([])

    const value = e.value

    StatsService.getEventStats(value)
    .then(res => {
        setEventStat(res.data.data)
        const entries = Object.entries(res.data.data)
        entries.map(([key, val] = entry) => {
            const stat = createStat(key, val)
            if (stat) {
                setStatData(statData => [...statData, stat])
            }
        })
        setPending(false)
    })
    .catch(err => {
        console.log(err)
    })
  }
  return (
    <div id='dashboard-ecommerce' style={{opacity: pending ? 0.1 : 8}}>
        <Row className='match-height mb-3'>
            <Col xl='8' md='8' xs='8'></Col>
            <Col xl='4' md='4' xs='4'>
                <Select
                    className='react-select'
                    classNamePrefix='select'
                    defaultValue={events[0]}
                    options={events}
                    isClearable={false}
                    onChange={handleEventChange}
                />
            </Col>
        </Row>
        <Row className='match-height'>
            <Col xl='6' md='6' xs='12'>
                <Card className='text-white border-0'>
                    <CardImg top src={eventStat?.banner_img} alt={eventStat?.name} height="250px"/>
                </Card>
            </Col>
            <Col xl='6' md='6' xs='12'>
                <Row>
                    <Col md='6'>
                        <StatsHorizontal icon={<DollarSign size={21} />} color='success' stats={`${formatNumber(eventStat?.tot_sale ? eventStat.tot_sale : 0)} LKR`} statTitle="Total Sale" />
                    </Col>
                    <Col md='6'>
                        <StatsHorizontal icon={<DollarSign size={21} />} color='warning' stats={`${formatNumber(eventStat?.tot_discounts ? eventStat.tot_discounts : 0)} LKR`} statTitle="Total Discounts" />
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        { statData ? <StatsCard cols={{ xl: '4', sm: '6' }} data={statData}/> : <Skeleton count={4}/>}
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <h4>Bookings Stats</h4>
            <Col lg='3' sm='6'>
                <StatsHorizontal icon={<Check size={21} />} color='success' stats={eventStat?.verified_bookings} statTitle="Verified" />
            </Col>
            <Col lg='3' sm='6'>
                <StatsHorizontal icon={<ThumbsUp size={21} />} color='warning' stats={eventStat?.completed_bookings} statTitle='Completed' />
            </Col>
        </Row>
        <Row className='match-height'>
            <h4>Packages Stats</h4>
            {
                eventStat?.ticket_packages?.map(pack => {
                    return (
                        <Col lg='6' sm='6'>
                            <StatsHorizontal icon={<Cpu size={21} />} color='primary' stats={pack.sold_ticket_counts} statTitle={`${pack.name} Tickets Sold (${pack.sales_prec.toFixed(2)}% | ${formatNumber(pack.sold_ticket_counts * pack.price)} LKR)`} />
                        </Col>
                    )
                })
            }
            
        </Row>
        <Row>
            {
                eventStat?.ticket_packages?.map(pack => {
                    return (
                        <>
                            <h4>{pack.name} Package Stats</h4>
                            <Col xl='3' md='3' sm='6'>
                                <StatsVertical icon={<Check size={21} />} color='success' stats={pack.verified_ticket_count} statTitle='Verified' />
                            </Col>
                            <Col xl='3' md='3' sm='6'>
                                <StatsVertical icon={<ThumbsUp size={21} />} color='warning' stats={pack.complete_ticket_count} statTitle='Completed' />
                            </Col>
                        </>
                    )
                })
            }
        </Row>
        <Row className='match-height'>
            <Col xl='12' md='12' xs='12'>
                <TCountByDateLineChart warning={colors.warning.main} data={ticketsCountByDate}/>
            </Col>
        </Row>
        <Row className='match-height'>
            <Col xl='12' md='12' xs='12'>
                <TSaleByDateLineChart warning={colors.success.main} data={salesByDate}/>
            </Col>
        </Row>
    </div>
  )
}

export default Home
