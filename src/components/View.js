import React, { useState, useEffect } from "react";
import axios from "axios";
import '../view.css'

function View(props) {
  const [bugForms, setBugForms] = useState([]);
  const [featureForms, setFeatureForms] = useState([]);

  const sortBugs = (formList) => {
    return (formList.filter(item => item.requestType === 'bugReport'))
  }

  const sortFeatures = (formList) => {
    return (formList.filter(item => item.requestType === 'featureRequest'))
  }

  const sortFormsOldest = (formList) => {
    return (formList.sort((a,b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }))
  }

  const sortFormsNewest = (formList) => {
    return sortFormsOldest(formList).reverse();
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs');
      setBugForms(sortBugs(response.data));
      setFeatureForms(sortFeatures(response.data));
      // 
    }
    fetchData();
  }, [])

  return (
    <div className="grid-container">
      <div className="topbar">
        <h1>Bug Tracker/Feature Requests</h1>
      </div>
      <div className="bugCards">
        <h3>Bug Reports</h3>
        {bugForms.map((item) => {
          console.log(item)
          return (
            <div key={item.id} className="card">
              {item.username}<br/>
              {item.email}<br/>
              {item.message}<br/>
            </div>
          )
        })}
      </div>
      <div className="featureCards">
        <h3>Feature Requests</h3>
        {featureForms.map((item) => {
          console.log(item);
          return (
            <div key={item.id} className="card">
              {item.username}<br/>
              {item.email}<br/>
              {item.message}<br/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default View;