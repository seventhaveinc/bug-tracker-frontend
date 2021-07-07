import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Login (props) {
  
  let history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.username || !values.password) {
      errors.password = '*All fields are required';
    }
    return errors;
  }

  return (
    <div className="page">

      <div className="box">

        <h2 className="heading">Log In</h2>
        <Formik
          initialValues={{username: '', password: ''}}
          onSubmit={async (values, actions) => {  
            const response = await axios.post(( 'http://localhost:3001' || process.env.REACT_APP_API_URL ) + '/login', {
              username: values.username,
              password: values.password
            });
            if (response.data.token) {
              localStorage.setItem('token', response.data.token);
              history.push('/view')
            } else if (response.data.error) {
              history.push('/denied');
            }}
          }
          validate={validate}
        >
          {
            props => (
              <form onSubmit={props.handleSubmit} className="form">

                <div className="singleInput">
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                  />
                </div>

                <div className="singleInput">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                  />
                </div>

                <button className="tabLinks" type="submit">Submit</button>
                {props.errors.password && <div id="feedback">{props.errors.password}</div>}

              </form>
            )
          }
        </Formik>

      </div>

    </div>
  )

}

export default Login;