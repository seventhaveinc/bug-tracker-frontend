import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import '../../new.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function NewFeature (props) {

  let history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.reproduce || !values.expectedOutcome || !values.actualOutcome) {
      errors.reproduce = '*All fields are required';
    }
    return errors;
  }

  return (
    <div>
      <Formik
        validate={validate}
        initialValues={{ title: '', message: ''}}
        onSubmit={async (values, actions) => {
          try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs', {
              reproduce: values.reproduce,
              expectedOutcome: values.expectedOutcome,
              actualOutcome: values.actualOutcome
            }, {
              headers: {
                token: localStorage.token
              }
            });
            if (response.data) {
              history.push('/denied');
            } else {
              history.push('/view');
            }
          } catch (error) {
            console.error(error);
            actions.setSubmitting(false);
          };
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="form">

            <div className="singleInput">
              <label htmlFor="title">Title</label>
              <Field
                name="title"
                id="title"
              />
            </div>

            <div className="singleInput">
              <label htmlFor="message">Message:</label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                cols="50"
              />
              
            </div>

            <button className="tabLinks" id="submit" type="submit">Submit</button>
            {props.errors.reproduce && <div id="feedback">{props.errors.reproduce}</div>}
          </form>
        )}
      </Formik>
    </div>
  )

}

export default NewFeature;