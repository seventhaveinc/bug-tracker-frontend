import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import '../new.css';
import Tab from './Tab';

function New(props) {
  const [state, setState] = useState({
    username: "",
    email: "",
    reproduce: "",
    expectedOutcome: "",
    actualOutcome: "",
    request: ""
  });
  const [warnStyle, changeWarnStyle] = useState({
    color: 'red',
    opacity: 0
  });
  const [fields, changeFields] = useState({
    color: 'red',
    opacity: 0
  });
  const [activeTab, setActiveTab] = useState(['reproduce', 'expectedOutcome', 'actualOutcome']);
  const [whichActive, setWhichActive] = useState('bug');

  const history = useHistory();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const changeTabBug = () => {
    setActiveTab(['reproduce', 'expectedOutcome', 'actualOutcome']);
    setWhichActive('bug');
  };

  const changeTabFeature = () => {
    setActiveTab(['request'])
    setWhichActive('featureRequest');
  };

  const handleSubmitBugs = async (event) => {
    event.preventDefault();
    if (state.username && state.email && state.reproduce && state.expectedOutcome && state.actualOutcome) {
      if (validateEmail(state.email)) {
        try {
          const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs', {
          username: state.username,
          email: state.email,
          reproduce: state.reproduce,
          expectedOutcome: state.expectedOutcome,
          actualOutcome: state.actualOutcome
          });
          history.push('/view');
        } catch (error) {
          console.error(error);
        };
      } else {
        changeWarnStyle({
          color: 'red',
          opacity: 100
        });
      };
    } else {
      changeFields({
        color: 'red',
        opacity: 100
      });
    };
  };

  const handleSubmitFeatures = async (event) => {
    event.preventDefault();
    if (state.username && state.email && state.request) {
      if (validateEmail(state.email)) {
        try {
          const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs', {
          username: state.username,
          email: state.email,
          request: state.request
          });
          history.push('/view');
        } catch (error) {
          console.error(error);
        };
      } else {
        changeWarnStyle({
          color: 'red',
          opacity: 100
        });
      };
    } else {
      changeFields({
        color: 'red',
        opacity: 100
      });
    };
  };

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  return (
    <div className="page">

      <div className="box">
      
        <div className="tabs">
        
          <button
            className={(whichActive === 'featureRequest') ? 'active tabLinks' : 'tabLinks'} 
            name="featureRequest"
            onClick={changeTabFeature}>
            Feature Request
          </button>

          <button
            className={(whichActive === 'bug') ? 'active tabLinks' : 'tabLinks'}
            name="bug"
            onClick={changeTabBug}>
            Bug Report
          </button>
        
        </div>

        <div className="content">
        
          <form>
          
            <label htmlFor="username">Username:</label><br/>

            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInput}
            /><br/>

            <label htmlFor="email">Email:</label><br/>

            <input
              type="text"
              id="email"
              name="email"
              onChange={handleInput}
            /><br/>

            {activeTab.map((item) => {

              return(
                <>
                  <label htmlFor={item}>{(item === 'reproduce') ? 'Steps to Reproduce' : (item === 'expectedOutcome') ? 'Expected Outcome' : (item === 'actualOutcome') ? 'Actual Outcome' : 'Request'}:</label><br/> {/* This works, it's weird...but it works! */}
                  <textarea
                    id={item}
                    name={item}
                    onChange={handleInput}
                    rows="5"
                    cols="50"
                  /><br/>
                </>
              )
            })}

            <input
              type="submit"
              onClick={(activeTab[0] === 'reproduce') ? handleSubmitBugs : handleSubmitFeatures}
            />
          </form>
        
        </div>

        {/* <span><h2>Submit a Ticket</h2></span> <span style={fields}>You must fill in all fields!</span> */}
        
        

        {/* <form>

          <label htmlFor="username">Name:</label><br/>
          <input type="text" id="uname" name="username" onChange={handleInput} /><br/>

          <label htmlFor="email">Email:</label><br/>
          <input type="email" id="email" name="email" onChange={handleInput} /> <span style={warnStyle}>* incorrect format</span><br/>

          <label htmlFor="message">Message:</label><br/>
          <textarea id="message" name="message" rows="5" cols="50" onChange={handleInput} /><br/>

          <input type="submit" onClick={handleSubmitFeatures} />
          <input type="reset" />

        </form> */}

        <h4><a href="/view">See All</a></h4>

      </div>

    </div>
  )
}

export default New;