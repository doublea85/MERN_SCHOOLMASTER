import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { userValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';

export default function Email() {

  const navigate = useNavigate();
  const setEmail = useAuthStore(state => state.setEmail);

  const formik = useFormik({
    initialValues : {
      email : ''
    },
    validate : userValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setEmail(values.email);
      navigate('/password')
    }
  })

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "40%", height: "350px", paddingTop: "35px"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-3xl font-bold'>Hello Again!</h4>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
