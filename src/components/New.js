import React, { useState, useEffect } from "react";
import axios from "axios";

function New(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    message: ""
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.username && state.email && state.message && state.requestType != "") {
      if (validateEmail(state.email)) {
        try {
          const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs', {
          username: state.username,
          email: state.email,
          requestType: state.requestType,
          message: state.message
          });
        } catch (error) {
          console.error(error);
        };
      } else {
        console.log(`Invalid email address!`);
      }
    } else {
      console.log(`you didn't fill in all the fields lol`);
    }
  };

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  return (
    <div>

      <form>

        <label htmlFor="username">Name:</label><br/>
        <input type="text" id="uname" name="username" onChange={handleInput} /><br/>

        <label htmlFor="email">Email:</label><br/>
        <input type="email" id="email" name="email" onChange={handleInput} /><br/>

        <label htmlFor="requestType">Type of Request:</label><br/>
        <input type="radio" id="bug" name="requestType" value="bugReport" onChange={handleInput} />
        <label htmlFor="bug">Bug Report</label>
        <input type="radio" id="feature" name="requestType" value="featureRequest" onChange={handleInput} />
        <label htmlFor="feature">Feature Request</label><br/>

        <label htmlFor="message">Message:</label><br/>
        <textarea id="message" name="message" rows="5" cols="50" onChange={handleInput} /><br/>

        <input type="submit" onClick={handleSubmit} />
        <input type="reset" />

      </form>

    </div>
  )
}

export default New;