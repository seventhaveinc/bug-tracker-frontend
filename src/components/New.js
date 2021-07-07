import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import '../new.css';
import NewBug from './tabs/NewBug';
import NewFeature from './tabs/NewFeature';

function New(props) {

  const [whichActive, setWhichActive] = useState('bug');

  const history = useHistory();

  return (
    <div className="page">

      <div className="box">
        <h2 className="heading">Submit a Ticket</h2>

        <div className="tabs">
        
          <button
            className={(whichActive === 'featureRequest') ? 'active tabLinks' : 'tabLinks'} 
            name="featureRequest"
            onClick={() => {
              setWhichActive('featureRequest')
            }}>
            Feature Request
          </button>

          <button
            className={(whichActive === 'bug') ? 'active tabLinks' : 'tabLinks'}
            name="bug"
            onClick={() => {
              setWhichActive('bug')
            }}>
            Bug Report
          </button>

          <button
            className='tabLinks'
            name="seeAll"
            onClick={() => {
              history.push('/view');
            }}>
            See All  
          </button>
        
        </div>

        <div className="content">

          {
            (whichActive === 'bug') ? 
              <NewBug /> :
              <NewFeature />

          }
        
        </div>

      </div>

    </div>
  )
}

export default New;