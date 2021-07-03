import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import '../../new.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function NewBug (props) {

  const history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.email || !values.username || !values.reproduce || !values.expectedOutcome || !values.actualOutcome) {
      errors.username = 'All fields are required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    return errors;
  }

  return (
    <div>
      <Formik
        validate={validate}
        initialValues{...{ username: '', email: '', reproduce: '', expectedOutcome: '', actualOutcome: ''}}
        onSubmit={async (values, actions) => {
          try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs', {
              username: values.username,
              email: values.email,
              reproduce: values.reproduce,
              expectedOutcome: values.expectedOutcome,
              actualOutcome: values.actualOutcome
            });
            history.push('/view');
          } catch (error) {
            console.error(error);
          };
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="form">
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username}
              name="username"
            />
            {props.errors.username && <div id="feedback">{props.errors.username}</div>}

            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              name="email"
            />
            {props.errors.email && <div id="feedback">{props.errors.email}</div>}

            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.reproduce}
              name="reproduce"
            />
            {props.errors.reproduce && <div id="feedback">{props.errors.reproduce}</div>}

            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.expectedOutcome}
              name="expectedOutcome"
            />
            {props.errors.expectedOutcome && <div id="feedback">{props.errors.expectedOutcome}</div>}

            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.actualOutcome}
              name="actualOutcome"
            />
            {props.errors.actualOutcome && <div id="feedpack">{props.errors.actualOutcome}</div>}

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  )

}

export default NewBug;