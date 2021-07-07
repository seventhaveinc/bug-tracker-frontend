  import React, { useState, useEffect, } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import '../view.css'
import BugTab from './tabs/BugTab.js'
import FeatureTab from './tabs/FeatureTab.js'

function View(props) {

  let history = useHistory();
  const [bugTickets, setBugTickets] = useState([]);
  const [featureTickets, setFeatureTickets] = useState([]);
  const [whichActive, setWhichActive] = useState('bugs');

  useEffect(() => {
    async function fetchDataBug() {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs', {
        headers: {
          token: localStorage.token
        }
      });
      setBugTickets(response.data);
    }
    async function fetchDataFeature() {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/features', {
        headers: {
          token: localStorage.token
        }
      });
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

        const response = axios.put((process.env.REACT_APP_API_URL || 'http://localhost:3001') + `/bugs/${item._id}`, {...item, status: toSwitchTo}, {
          headers: {
            token: localStorage.token
          }
        });
      }
    } else {
      let array = featureTickets;
      const indexItem = array.indexOf(item);
      if (indexItem > -1) {
        array.splice(indexItem, 1);
        setFeatureTickets([...array, {...item, status: toSwitchTo}]);

        const response = axios.put((process.env.REACT_APP_API_URL || 'http://localhost:3001') + `/features/${item._id}`, {...item, status: toSwitchTo}, {
          headers: {
            token: localStorage.token
          }
        });
      }
    };
  };

  return (
    <div className="grid-container">
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
        <button className="tabLinks" onClick={() => {
          history.push('/new')
        }}>New Ticket</button>
      </div>
      {(whichActive === 'bugs' && bugTickets.length > 0) ?
        <BugTab
          handleSwitchStatus={handleSwitchStatus}
          bugTickets={bugTickets}
        /> : (whichActive === 'features' && featureTickets.length > 0) ?
        <FeatureTab
          handleSwitchStatus={handleSwitchStatus}
          featureTickets={featureTickets}
        /> :
        null
        }
    </div>
  )
}

export default View;