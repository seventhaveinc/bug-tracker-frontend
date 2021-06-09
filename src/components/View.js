import React, { useState, useEffect } from "react";
import axios from "axios";
import '../view.css'
import BugTab from './BugTab.js'
import CompleteButton from './CompleteButton';
import UnCompleteButton from './UnCompleteButton';

function View(props) {

  const [bugTickets, setBugTickets] = useState([]);
  const [featureTickets, setFeatureTickets] = useState([]);
  const [whichActive, setWhichActive] = useState('bugs');

  useEffect(() => {
    async function fetchDataBug() {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs');
      setBugTickets(response.data);
    }
    async function fetchDataFeature() {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/features');
      setFeatureTickets(response.data);
    }
    fetchDataBug();
    fetchDataFeature();
  }, [])

  const handleSwitchStatus = (ticketList, item, toSwitchTo) => {
    if (ticketList === 'bug') {
      setBugTickets([...bugTickets, {...item, status: toSwitchTo}]);
    } else {
      setFeatureTickets([...featureTickets, {...item, status: toSwitchTo}]);
    };
  };

  return (
    <div className="grid-container">
      <div className="topbar">
        <h4 className="link"><a href="/new">New Ticket</a></h4>
        <h1 className="title">Bug Tracker/Feature Requests</h1>
      </div>
      <div className="tabs">
        <button
          className={(whichActive === 'features') ? 'active tabLinks' : 'tabLinks'}
          name="features"
          onClick={() => {
            setWhichActive('features');
          }}
        >
          Features
        </button>
        <button
          className={(whichActive === 'bugs') ? 'active tabLinks' : 'tabLinks'}
          name="bugs"
          onClick={() => {
            setWhichActive('bugs');
          }}
        >
          Bugs
        </button>
      </div>
      {(whichActive === 'bugs') ?
      <BugTab
        handleSwitchStatus={handleSwitchStatus}
        bugTickets={bugTickets}
      /> :
      'test'}
    </div>
  )
}

export default View;