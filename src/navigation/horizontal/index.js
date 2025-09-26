import { Users, Tag, BarChart, Gift } from "react-feather"

export default [
  {
    id: "sales-summary",
    title: "Summary",
    icon: <BarChart size={20} />,
    navLink: "/sales-summary"
  },
  /*{
    id: "event-list",
    title: "Event List",
    icon: <List size={12} />,
    navLink: "/events/list"
  },*/
  {
    id: "event-invitations",
    title: "Invitations",
    icon: <Gift size={20} />,
    navLink: "/event-invitations"
  },
  {
    id: "coordinators-list",
    title: "Coordinators",
    icon: <Users size={12} />,
    navLink: "/coordinators/list/coordinator"
  }
]
