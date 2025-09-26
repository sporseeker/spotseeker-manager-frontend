// ** React Imports
import React, { useEffect, useState, Fragment } from 'react'
import { Link } from "react-router-dom"

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Eye, Download, MoreVertical, Edit, Trash, Send, UserPlus } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardBody, CardTitle, Input, Label, Row, Col, Button, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Services
import UserService from '../../../../services/UserService'
import AuthService from '../../../../services/AuthService'

//import { useParams } from 'react-router-dom'
import UserEditModal from './UserEditModal'
import { Alert } from '../../../../utility/alerts'
import { getStatus } from '../../../../utility/Utils'
import SpinnerComponent from '../../../../@core/components/spinner/Fallback-spinner'
/*const useQuery = () => {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}*/

const DataTableAdvSearch = () => {
  // ** States
  const [pending, setPending] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchCustomer, setSearchCustomer] = useState('')
  const [modal, setModal] = useState(false)
  const [selectedUser, setUser] = useState([])
  const [dataUpdated, setDataUpdate] = useState(false)
  const [custSearchParam] = useState(["first_name", "last_name", "nic", "phone_no", "email"])
  const [progress, setProgress] = useState(0)

  const handleUserEditModal = (user) => {
    setUser(user)
    setModal(!modal)
  }

  const handleUserDelete = (user) => {
    UserService.deleteUser(user.id).
    then(() => {
      setDataUpdate(!dataUpdated)
      Alert("User removed successfully", "success")
    })
    .catch(err => {
      Alert(err.response.data.message, "error")
    })
  }

  const handleUserDeactivate = (user) => {
    UserService.deactivateUser(user.id).
    then(() => {
      setDataUpdate(!dataUpdated)
      Alert("User deactivated successfully", "success")
    })
    .catch(err => {
      Alert(err.response.data.message, "error")
    })
  }

  const handleUserActivate = (user) => {
    UserService.activateUser(user.id).
    then(() => {
      setDataUpdate(!dataUpdated)
      Alert("User activated successfully", "success")
    })
    .catch(err => {
      Alert(err.response.data.message, "error")
    })
  }

  const advSearchColumns = [
    {
      name: 'Full Name',
      sortable: true,
      wrap: true,
      width: "300px",
      selector: row => {
        return row.user.first_name ? `${row.user.first_name} ${row.user.last_name}` : row.user.name
      }
    },
    {
      name: 'Email',
      sortable: true,
      wrap: true,
      width: "300px",
      selector: row => row.user.email
    },
    {
      name: 'Phone',
      sortable: true,
      width: "150px",
      selector: row => row.user.phone_no
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => {
        return getStatus(row.user.status)
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      fixed: true,
      cell: (row) => {
        return (
          <div className='d-flex' >
            <UncontrolledDropdown direction="start">
              <DropdownToggle className='pe-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag='button' className='w-100' onClick={() => handleUserEditModal(row.user)}>
                  <Edit size={15} />
                  <span className='align-middle ms-50'>Edit</span>
                </DropdownItem>
                {
                  row.user.status ? <DropdownItem tag='button' className='w-100' onClick={() => handleUserDeactivate(row.user)}>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Deactivate</span>
                </DropdownItem> : <DropdownItem tag='button' className='w-100' onClick={() => handleUserActivate(row.user)}>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Activate</span>
                </DropdownItem>
                }
                <DropdownItem tag='button' className='w-100' onClick={() => handleUserDelete(row.user)}>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    setData([])
    setPending(true)
    setProgress(0)
    UserService.getManagerCoordinators()
    .then(res => {
      setData(res.data.data)
      setPending(false)
      setProgress(100)
    })
    .catch(err => {
      console.log(err)
    })
  }, [dataUpdated])

  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)

  // ** Table data to render
  const dataToRender = () => {
    if (searchCustomer) {
      return filteredData
    } else {
      return data
    }
  }

  const resetFilters = () => {
    setSearchCustomer('')
  }

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={Math.ceil(dataToRender().length / 7) || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'}
    />
  )

  // ** Function to handle email filter
  const handleCustomerFilter = e => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
        return data
    }

    setSearchCustomer(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        console.log(item)
        return custSearchParam.some((newItem) => {
          if (item[newItem]) {
            return (
                  item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) > -1
            )
          }
        })
      })
      setFilteredData([...updatedData])
      setSearchCustomer(value)
    }
  }

  return (
    <Fragment>
      { pending ? <SpinnerComponent progress={progress}/> : <> <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Search</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={() => downloadCSV(data)}>
              <Download size={15} />
              <span className='align-middle ms-50'>Download CSV</span>
            </Button>
            <Link to={"/coordinators/create"}>
              <Button color="success" className="ms-2">
                <UserPlus size={15} />
                <span className="align-middle ms-50">Add Coordinator</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='3' md='4' className='mb-1'>
              <Label className='form-label' for='email'>
                Search:
              </Label>
              <Input id='salary' value={searchCustomer} onChange={handleCustomerFilter} />
            </Col>
            <Col lg='3' md='4' className='mt-2 mb-1'>
              <Button className='btn btn-outline-dark' onClick={resetFilters}>Reset</Button>
            </Col>
          </Row>
        </CardBody>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            columns={advSearchColumns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            defaultSortFieldId={2}
            defaultSortAsc={true}
            progressPending={pending}
          />
        </div>
      </Card>
      <UserEditModal open={modal} handleModal={handleUserEditModal} user={selectedUser} setDataUpdate={setDataUpdate}/>
      </> }
    </Fragment>
  )
}

export default DataTableAdvSearch
