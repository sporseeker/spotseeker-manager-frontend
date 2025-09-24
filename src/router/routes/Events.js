// ** React Imports
import { lazy } from 'react'
const EventCreate = lazy(() => import('../../views/pages/events/create'))
const EventList = lazy(() => import('../../views/pages/events/list'))

const EventsRoutes = [
  /*{
    path: '/events/list',
    element: <EventList />,
    meta: {
      publicRoute: false,
      restricted: false
    }
  },*/
  {
    path: '/events/:type/:id',
    element: <EventCreate />,
    meta: {
      publicRoute: false,
      restricted: false
    }
  }
]

export default EventsRoutes
