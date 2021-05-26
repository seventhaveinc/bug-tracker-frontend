import React, { useState, useEffect } from "react";
import axios from "axios";
import '../view.css'

function View(props) {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs');
      setForms(response.data);
    }
    fetchData();
  }, [])

  return (
    <div>
      <div className="topbar">
        <h1>Bug Tracker/Feature Requests</h1>
      </div>
      {forms.map((item) => {
        console.log(item)
        return (
          <div id={item.id} className="card">
            {item.username}<br/>
            {item.email}<br/>
            {item.message}<br/>
          </div>
        )
      })}
    </div>
  )
}

export default View;