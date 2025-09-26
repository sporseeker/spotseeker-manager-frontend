// ** React Imports
import { lazy } from 'react'
import Summary from '../../views/Summary'

const Home = lazy(() => import('../../views/Home'))
const EventDashboard = lazy(() => import('../../views/EventDashboard'))
const Invitations = lazy(() => import('../../views/Invitations'))
const SendInvitations = lazy(() => import('../../views/SendInvitations'))

const DashboardRoutes = [
  {
    path: '/sales-summary',
    element: <Summary />,
    meta: {
      publicRoute: false,
      restricted: false
    }
  },
  {
    path: '/my-sales',
    element: <Home />,
    meta: {
      publicRoute: false,
      restricted: false
    }
  },  
  {
    path: '/event-invitations',
    element: <Invitations />,
    meta: {
      publicRoute: false,
      restricted: false
    }
  },
  {
    path: '/send-invitations',
    element: <SendInvitations />,
    meta: {
      publicRoute: false,
      restricted: false
    }
  }
]

export default DashboardRoutes
