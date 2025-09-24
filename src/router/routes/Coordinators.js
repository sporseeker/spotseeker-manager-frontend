// ** React Imports
import { lazy } from 'react'
const CoordinatorsList = lazy(() => import('../../views/pages/coordinators/list'))
const CoordinatorsCreate = lazy(() => import('../../views/pages/coordinators/create'))

const CoordinatorsRoutes = [
    {
        path: '/coordinators/list/:type',
        element: <CoordinatorsList />,
        meta: {
            publicRoute: false,
            restricted: false
        }
    },
    {
        path: '/coordinators/create',
        element: <CoordinatorsCreate />,
        meta: {
            publicRoute: false,
            restricted: false
        }
    }
]

export default CoordinatorsRoutes
