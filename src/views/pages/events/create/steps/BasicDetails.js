// ** React Imports
import { Fragment } from 'react'

// ** Utils

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather'
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import EditorControlled from '../../../../ui-elements/inputs/EditorControlled'
import { currencyOpts, eventStatuses, eventTypeOpts, trueFalseOpts } from '../../../../../utility/Utils'

// ** Services

const BasicDetails = ({ stepper, handleChange, handleDropdownChange, handleStartDateChange, handleEndDateChange, productData, editorValue }) => {

  const onSubmit = () => {
    stepper.next()
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Basic Details</h5>
      </div>
      <Form>
        <Row>
          <Col md={productData.ftype === 'edit' ? '8' : '12'} className='mb-1'>
            <Label className='form-label' for='productName'>
              Event Name
            </Label>
            <Input onChange={handleChange} name="name" value={productData.name} disabled/>
          </Col>
          {
            productData.ftype === 'edit' ? <Col md="4" className='mb-1'>
              <Label className='form-label' for='productName'>
                Event Status
              </Label>
              <Select
                name='status'
                className='react-select'
                classNamePrefix='select'
                value={eventStatuses.find(({ value }) => value === productData.status)}
                options={eventStatuses}
                onChange={handleDropdownChange}
                isDisabled={true}
              />
            </Col> : ""
          }
        </Row>
        <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for={`productDesc`}>
              Event Description
            </Label>
            {/*<Input type="textarea" onChange={handleChange} name="description" value={productData.description}/>*/}
            <EditorControlled name="description" editorValue={editorValue} />
          </Col>
        </Row>
        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='start-date-time'>
              Start Date & Time
            </Label>
            <Flatpickr
              data-enable-time
              id='start-date-time'
              name='start-date-time'
              className='form-control'
              value={productData.start_date}
              onChange={(date, dateStr) => handleStartDateChange(dateStr)}
              options={{
                dateFormat: "Y-m-d H:i",
                minDate: "today"
              }}
              disabled
            />
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='end-date-time'>
              End Date & Time
            </Label>
            <Flatpickr
              data-enable-time
              id='end-date-time'
              name="end-date-time"
              className='form-control'
              value={productData.end_date}
              onChange={(date, dateStr) => handleEndDateChange(dateStr)}
              options={{
                dateFormat: "Y-m-d H:i",
                minDate: "today"
              }}
              disabled
            />
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='end-date-time'>
              Free Seating
            </Label>
            <Select
              name='free_seating'
              className='react-select'
              classNamePrefix='select'
              value={trueFalseOpts.find(({ value }) => value === productData.free_seating)}
              options={trueFalseOpts}
              onChange={handleDropdownChange}
              isDisabled={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md='3' className='mb-1'>
            <Label className='form-label' for='type'>
              Type
            </Label>
            <Select
              name='type'
              className='react-select'
              classNamePrefix='select'
              value={eventTypeOpts.find(({ value }) => value === productData.type)}
              options={eventTypeOpts}
              onChange={handleDropdownChange}
              isDisabled={true}
            />
          </Col>
          <Col md='3' className='mb-1'>
            <Label className='form-label' for='featured'>
              Featured
            </Label>
            <Select
              name='featured'
              className='react-select'
              classNamePrefix='select'
              value={trueFalseOpts.find(({ value }) => value === productData.featured)}
              options={trueFalseOpts}
              onChange={handleDropdownChange}
              isDisabled={true}
            />
          </Col>
          <Col md='3' className='mb-1'>
            <Label className='form-label' for='organizer'>
              Organizer
            </Label>
            <Input type='text' onChange={handleChange} name="organizer" value={productData.organizer} disabled/>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <Label className='form-label' for='sub_type'>
              Sub Type
            </Label>
            <Input type='text' onChange={handleChange} name="sub_type" value={productData.sub_type} disabled/>
          </Col>
          <Col md="3">
            <Label className='form-label' for='end-date-time'>
              Currency
            </Label>
            <Select
              name='currency'
              className='react-select'
              classNamePrefix='select'
              value={currencyOpts.find(({ value }) => value === productData.currency)}
              options={currencyOpts}
              onChange={handleDropdownChange}
              isDisabled={true}
            />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='banner_img'>
              Banner Image
            </Label>
            {productData.ftype === 'edit' ? <img src={productData.banner_img} width="400" /> : ''}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='thumbnail_img'>
              Thumbnail Image
            </Label>
            {productData.ftype === 'edit' ? <img src={productData.thumbnail_img} width="400" /> : ''}
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='trailer_url'>
              Event Trailer URL
            </Label>
            <Input onChange={handleChange} name="trailer_url" value={productData.trailer_url} disabled/>
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='button' color='primary' className='btn-next' onClick={onSubmit}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default BasicDetails
