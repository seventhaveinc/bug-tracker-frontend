import React, { useState, useEffect } from "react";
import axios from "axios";

function New(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    requestType: "",
    message: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/bugs', {
        username: state.username,
        email: state.email,
        requestType: state.requestType,
        message: state.message
      });
    } catch (error) {
      console.error(error);
    };
  };

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <h1>Hello World</h1>

    </div>
  )
}

export default New;