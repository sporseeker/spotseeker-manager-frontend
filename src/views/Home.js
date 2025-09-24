import { Fragment, useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, Col, Row } from "reactstrap"
import SalesService from "../services/SalesService"
import ToastSucess from "../components/alerts/index"
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import { formatNumber } from "../utility/Utils"
import Select from "react-select"
import EventService from "../services/EventService"
import CardMeetup from "@src/views/ui-elements/cards/advance/CardMeetup"
import "@styles/base/pages/dashboard-ecommerce.scss"
import SpinnerComponent from "../@core/components/spinner/Fallback-spinner"
const Home = () => {
  const [salesData, setData] = useState([])
  const [salesFilteredData, setFilteredData] = useState([])
  const [events, setEventsData] = useState([])
  const [pending, setPending] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setPending(true)
    setProgress(0)
    EventService.getAllEvents()
      .then((res) => {
        setProgress(25)
        res.data.data.map((event) => {
          const eventObj = {
            value: event.id,
            label: event.name
          }
          setProgress(50)
          setEventsData((events) => [...events, eventObj])
        })
        SalesService.getManagerSales()
          .then((res) => {
            setProgress(75)
            const data = res.data.data
            const sales_arr = []
            data.map((sale) => {
              const event_id = sale.event_id
              const event_name = sale.event_name
              const ticket_category = sale.package
              const capacity = sale.tot_tickets
              const ticket_price = parseFloat(sale.package_price).toFixed(2)
              const reserved_tickets = sale.res_tickets
              const allocated_tickets = sale.aval_tickets
              const sold_tickets =
                sale.sold_tickets !== null ? sale.sold_tickets : 0
              const sold_amount = parseFloat(
                sold_tickets * ticket_price
              ).toFixed(2)
              const sold_percentage = `${(
                (sold_tickets / capacity) *
                100
              ).toFixed(0)}%`
              const addon_sales = sale.addons

              const sales_obj = {
                event_id,
                event_name,
                ticket_category,
                capacity,
                ticket_price,
                reserved_tickets,
                allocated_tickets,
                sold_tickets,
                sold_amount,
                sold_percentage,
                addon_sales
              }

              sales_arr.push(sales_obj)
            })
            setData(sales_arr)
            setProgress(100)
            setPending(false)
          })
          .catch((err) => {
            setPending(false)
            ToastSucess("Something went wrong", err.message)
          })
      })
      .catch((err) => {
        setPending(false)
        ToastSucess("Something went wrong", err.message)
      })
  }, [])

  const getData = () => {
    if (salesFilteredData.length > 0) {
      return salesFilteredData
    } else {
      return salesData
    }
  }

  const handleEventChange = (e) => {
    setPending(true)
    const value = e.value

    const filtered_events = salesData.filter((ev) => ev.event_id === value)

    console.log(filtered_events, value)

    setFilteredData([...filtered_events])

    setPending(false)
  }

  const basicColumns = [
    {
      name: "Name",
      minWidth: "225px",
      sortable: true,
      selector: (row) => row.event_name
    },
    {
      name: "Package",
      selector: (row) => row.ticket_category
    },
    {
      name: "Price",
      selector: (row) => row.ticket_price
    },
    {
      name: "Total Tickets",
      selector: (row) => row.capacity
    },
    {
      name: "Reserved",
      selector: (row) => row.reserved_tickets
    },
    {
      name: "Open",
      selector: (row) => row.allocated_tickets
    },
    {
      name: "Sold",
      selector: (row) => row.sold_tickets
    },
    {
      name: "Sold Amount",
      selector: (row) => formatNumber(row.sold_amount)
    },
    {
      name: "Sold %",
      selector: (row) => row.sold_percentage
    }
  ]

  const ExpandedComponent = ({ data }) => (
    <div className="expanded-row">
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Addon Name</th>
            <th>Price</th>
            <th>Total Sold</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.addon_sales.map((addon, index) => (
            <tr key={index}>
              <td>{addon.addon_name}</td>
              <td>{addon.addon_price}</td>
              <td>{addon.total_sold}</td>
              <td>{(addon.total_sold * addon.addon_price).toFixed(2)} LKR</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <Fragment>
      {pending ? (
        <SpinnerComponent progress={progress}/>
      ) : (
        <>
          <Card className="overflow-hidden">
            <CardHeader>
              <Col xl="8" md="8" xs="8">
                <CardTitle tag="h4">My Sales</CardTitle>
              </Col>
              <Col xl="4" md="4" xs="4">
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={events[0]}
                  options={events}
                  isClearable={false}
                  onChange={handleEventChange}
                />
              </Col>
            </CardHeader>

            <div className="react-dataTable">
              <DataTable
                noHeader
                pagination
                data={getData()}
                columns={basicColumns}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                progressPending={pending}
                expandableRows
                expandableRowDisabled={(row) => !(row.addon_sales && row.addon_sales.length > 0)}
                expandableRowsComponent={ExpandedComponent}
              />
            </div>
          </Card>
        </>
      )}
    </Fragment>
  )
}

export default Home
