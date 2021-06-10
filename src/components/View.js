import React, { useState, useEffect } from "react";
import axios from "axios";
import '../view.css'
import BugTab from './BugTab.js'
import FeatureTab from './FeatureTab.js'

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
      let array = bugTickets;
      const indexItem = array.indexOf(item);
      if (indexItem > -1) {
        array.splice(indexItem, 1);
        setBugTickets([...array, {...item, status: toSwitchTo}]);

        const response = axios.put((process.env.REACT_APP_API_URL || 'http://localhost:3001') + `/bugs/${item._id}`, {...item, status: toSwitchTo});
      }
    } else {
      let array = featureTickets;
      const indexItem = array.indexOf(item);
      if (indexItem > -1) {
        array.splice(indexItem, 1);
        setFeatureTickets([...array, {...item, status: toSwitchTo}]);

        const response = axios.put((process.env.REACT_APP_API_URL || 'http://localhost:3001') + `/features/${item._id}`, {...item, status: toSwitchTo});
      }
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
        <FeatureTab
          handleSwitchStatus={handleSwitchStatus}
          featureTickets={featureTickets}
        />
        }
    </div>
  )
}

export default View;