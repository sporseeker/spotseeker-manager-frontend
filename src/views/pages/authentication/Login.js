// ** React Imports
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, AlertTriangle, Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'

// ** Config
import themeConfig from '@configs/themeConfig'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Manager dashboard.</span>
      </div>
    </div>
  )
}

const ToastError = ({ t, title, message }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='danger' icon={<AlertTriangle size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{title}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>{message}</span>
      </div>
    </div>
  )
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({reValidateMode: "onChange"})
  const illustration = skin === 'dark' ? 'v2-login-dark-border.png' : 'v2-login-light-border.png',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit =  data => {
    setIsLoading(true)
    if (Object.values(data).every(field => field.length > 0)) {
      useJwt
        .csrf()
        .then(() => {
          useJwt.login({ email: data.loginEmail, password: data.password })
          .then(res => {
            const data = { ...res.data }
            if (data.data.role && data.data.role === "Manager") {
              dispatch(handleLogin(data))
              ability.update([
                {
                  action: 'manage',
                  subject: 'all'
                }
              ])
              navigate(getHomeRouteForLoggedInUser(data.data.role))
              toast(t => (
                <ToastContent t={t} role={data.data.role || 'Manager'} name={data.data.email || data.data.name || 'John Doe'} />
              ))
            } else {
              toast(t => (
                <ToastError t={t} title={"OOPS! Something went wrong"} message={"These credentials not in our system"} />
              ))
            }
                        
            setIsLoading(false)
          })
          .catch(err => {
            setIsLoading(false)
            console.log(err)
            //const errors = Object.values(err.response.data.errors).flat()
            toast(t => (
              <ToastError t={t} title="OOOPS! Something Went Wrong" message={err.response.data ? err.response.data.message :  err.message} />
            ))
          })
        })
        .catch(err => {
          setIsLoading(false)
          console.log(err)
          //const errors = Object.values(err.response.data.errors).flat()
          toast(t => (
            <ToastError t={t} title="OOOPS! Something Went Wrong" message={err.response.data ? err.response.data.message :  err.message} />
          ))
        })
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={themeConfig.app.appLogoImage} alt='logo' width={200}/>
        </Link>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Organizer Dashboard
            </CardTitle>
            <CardText className='mb-2'>Please sign in to your account using the credentials provided by SpotSeeker.lk, or contact <a href='mailto:director@spotseeker.lk'>director@spotseeker.lk</a> for assistance.</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email / Username
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='Enter your email here'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  {/*<Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                </Link>*/}
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              {/*<div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
                </div>*/}
              <Button type='submit' color='primary' block disabled={isLoading}>
                {isLoading ? "Logging you in.." : "Sign in"}
              </Button>
            </Form>
          </Col>
        </Col>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' width={600}/>
          </div>
        </Col>
        
      </Row>
    </div>
  )
}

export default Login
