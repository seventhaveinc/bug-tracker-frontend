import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Login (props) {
  
  let history = useHistory();

  const onSubmit = async () => {
    const response = await axios.post(( 'http://localhost:3001' || process.env.REACT_APP_API_URL ) + '/login', {
      username: 'test',
      password: 'password'
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      history.push('/view')
    } else if (response.data.error) {
      history.push('/denied');
    }
  }

  return (
    <div>
      <Formik
        initialValues{...{username: '', password: ''}}
        onSubmit={onSubmit}
      />
    </div>
  )

}

export default Login;