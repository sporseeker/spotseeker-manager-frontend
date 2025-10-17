import { Badge } from "reactstrap"
import { DefaultRoute } from "../router/routes"

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "")

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: "short", day: "numeric" }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" }
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData")
export const getUserData = () => JSON.parse(localStorage.getItem("userData"))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {

  if (userRole.toLowerCase() === "admin" || userRole.toLowerCase() === "manager") return DefaultRoute
  if (userRole.toLowerCase() === "user") return "/access-control"
  return "/login"
}

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#e50914", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed" // for input hover border-color
  }
})

export const formatNumber = (number) => {
  const num_parts = number.toString().split(".")
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return num_parts.join(".")
}

export const getStatus = (status) => {
  let color = ''
  let text = ''
  switch (status) {
    case "delivered": {
      color = "warning"
      text = "Delivered"
    }
    break
    case "accepted": {
      color = "success"
      text = "Accepted"
    }
    break
    case "rejected": {
      color = "danger"
      text = "Rejected"
    }
    break
    case "pending": {
      color = "warning"
      text = "Pending"
    }
    break
    case "complete": {
      color = "success"
      text = "Complete"
    }
    break
    case "verified": {
      color = "primary"
      text = "Verified"
    }
    break
    case "cancelled": {
      color = "secondary"
      text = "Cancelled"
    }
    break
    case "failed": {
      color = "danger"
      text = "Failed"
    }
    break
    case "ongoing": {
      color = "primary"
      text = "Ongoing"
    }
    break
    case "presale": {
      color = "secondary"
      text = "Pre Sale"
    }
    break
    case "soldout": {
      color = "danger"
      text = "Sold Out"
    }
    break
    case "closed": {
      color = "warning"
      text = "Closed"
    }
    break
    case "postponed": {
      color = "danger"
      text = "Postponed"
    }
    break
    case "queued": {
      color = "warning"
      text = "Queued"
    }
    break
    case 1: {
      color = "success"
      text = "Active"
    }
    break
    case 0: {
      color = "danger"
      text = "Inactive"
    }
    break
    case 'refunded': {
      color = "danger"
      text = "Refunded"
    }
    break
    case 'partially verified': {
      color = "warning"
      text = "Partially Verified"
    }
    break
  }

  return (
    <Badge color={color} className='badge-glow'>{text}</Badge>
  )
}

export const promoRedeems = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "5",
    label: "5"
  },
  {
    value: "10",
    label: "10"
  },
  {
    value: "unlimited",
    label: "Unlimited"
  }

]

export const trueFalseOpts = [
  {
    value: true,
    label: "Yes"
  },
  {
    value: false,
    label: "No"
  }
]

export const userRoles = [
  {
    value: 'User',
    label: "User"
  },
  {
    value: 'Admin',
    label: "Admin"
  },
  {
    value: 'Manager',
    label: "Manager"
  },
  {
    value: 'Coordinator',
    label: "Coordinator"
  }
]

export const currencyOpts = [
  {
    value: "LKR",
    label: "LKR"
  }
]

export const eventStatuses = [
  {
    value: 'pending',
    label: "Pending"
  },
  {
    value: 'complete',
    label: "Complete"
  },
  {
    value: 'failed',
    label: "Failed"
  },
  {
    value: 'cancelled',
    label: "Cancelled"
  },
  {
    value: 'closed',
    label: "Closed"
  },
  {
    value: 'postponed',
    label: "Postponed"
  },
  {
    value: 'ongoing',
    label: "On going"
  }
]

export const eventTypeOpts = [
  {
    value: "concerts",
    label: "Concert"
  },
  {
    value: "edm",
    label: "EDM"
  },
  {
    value: "sport",
    label: "Sport"
  },
  {
    value: "theatre",
    label: "Theatre"
  },
  {
    value: "tamil_dj",
    label: "Tamil DJ"
  },
  {
    value: "club",
    label: "Club"
  },
  {
    value: "halloween",
    label: "Halloween"
  },
  {
    value: "rotaract",
    label: "Rotaract"
  },
  {
    value: "air_experience",
    label: "Air Experience"
  }
]