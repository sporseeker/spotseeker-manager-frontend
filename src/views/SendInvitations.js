// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  CardFooter
} from "reactstrap"

import Select from "react-select"
import { useEffect, useState } from "react"
import EventService from "@services/EventService"
import DataTable from "react-data-table-component"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { Download } from "react-feather"
import { Alert } from "../utility/alerts"
import SpinnerComponent from "../@core/components/spinner/Fallback-spinner"

const SendInvitations = () => {
  const [selectedEvent, setSelectedEvent] = useState()
  const [events, setEvents] = useState([])
  const [excelData, setExcelData] = useState([])
  const [columns, setColumns] = useState([])
  const [pending, setPending] = useState(true)
  const [progress, setProgress] = useState(0)

  const handleDropdownChange = (option) => {
    setSelectedEvent(option.value)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const binaryString = event.target.result
      const workbook = XLSX.read(binaryString, { type: "binary" })

      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]

      const data = XLSX.utils.sheet_to_json(sheet)
      setExcelData(data)

      if (data.length > 0) {
        const cols = Object.keys(data[0]).map((key) => ({
          name: key,
          selector: (row) => row[key]
        }))
        setColumns(cols)
      }
    }

    reader.readAsBinaryString(file)
  }

  useEffect(() => {
    setProgress(50)
    EventService.getAllEvents(null, ['ongoing', 'closed']).then((res) => {
      const eventObjs = res.data.data
      eventObjs.map((event) => {
        const eventObj = {
          value: event.id,
          label: event.name
        }
        setEvents((events) => [...events, eventObj])
        setProgress(100)
      })
      setPending(false)
    })
  }, [])

  const downloadSampleExcel = () => {
    const wb = XLSX.utils.book_new()
    const wsData = [
      { Name: "User One", Email: "userone@spotseeker.lk", Tickets: 1, Package: "VIP" },
      { Name: "User Two", Email: "usertwo@spotseeker.lk", Tickets: 5, Package: "VVIP" }
    ]
    const ws = XLSX.utils.json_to_sheet(wsData)
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })
    const buf = new ArrayBuffer(wbout.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "my_invitee_list.xlsx")
  }

  const handleSend = () => {
    EventService.sendInvitations({ event_id: selectedEvent, invitees: excelData})
    .then(() => {
      Alert('Invitation sent successfully', 'success')
    })
    .catch(err => {
      Alert(err.response.data.message, 'error')
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Send invitation</CardTitle>
        <code>Please contact Spotseeker.lk for assistance.</code>
      </CardHeader>

      { pending ? <SpinnerComponent progress={progress}/> : <CardBody>
        <Form>
          <Row>
            <Col md="4" sm="6" className="mb-1">
              <Label className="form-label" for="EmailMulti">
                Select Event
              </Label>
              <Select
                name="role"
                className="react-select"
                classNamePrefix="select"
                options={events}
                onChange={handleDropdownChange}
                isLoading={pending}
              />
            </Col>
            <Col md="4" sm="6" className="mb-1">
              <Label className="form-label" for="EmailMulti">
                Choose invitee list (csv file)
              </Label>&nbsp;
              (<a onClick={downloadSampleExcel} style={{color: "black", fontSize: 12}}><Download size={12}/> Download Example</a>)
              <Input
                type="file"
                name="thumbnail_img"
                onChange={handleFileUpload}
              />
            </Col>
          </Row>
          <div className="react-dataTable">
            {excelData.length > 0 && (
              <DataTable
                title="Invitee List"
                columns={columns}
                data={excelData}
                pagination
              />
            )}
          </div>
        </Form>
      </CardBody> }
      <CardFooter>
        <Button color="success" disabled={!excelData.length > 0} onClick={() => handleSend()}>Send</Button>
      </CardFooter>
    </Card>
  )
}
export default SendInvitations
