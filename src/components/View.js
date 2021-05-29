import React, { useState, useEffect } from "react";
import axios from "axios";
import '../view.css'
import Button from './CompleteButton';

function View(props) {
  const [completed, setCompleted] = useState([]);
  const [notCompleted, setNotCompleted] = useState([]);
  const [bugForms, setBugForms] = useState([]);
  const [completedBugs, setCompletedBugs] = useState([]);
  const [featureForms, setFeatureForms] = useState([]);
  const [completedFeatures, setCompletedFeatures] = useState([]);

  const sortCompleted = (formList, type) => {
    return (formList.filter(item => item.completed === type));
  }

  const handleRemove = (item) => {
    if (item.requestType === "bugReport") {
      const newArr = bugForms.filter((thing) => thing._id !== item._id);
      setBugForms(newArr);
    } else {
      const newArr = featureForms.filter((thing) => thing._id !== item._id);
      setFeatureForms(newArr);
    }
  }

  const changeCompleted = (response, whichOne) => {
    if (whichOne === "bugs") {
      setCompletedBugs([...completedBugs, response])
    } else {
      setCompletedFeatures([...completedFeatures, response]);
    }
    handleRemove(response);
  }

  const sortType = (formList, toSort) => {
    return (formList.filter(item => item.requestType === toSort))
  }

  const sortFormsOldest = (formList) => {
    return (formList.sort((a,b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }))
  }

  const sortFormsNewest = (formList) => {
    return sortFormsOldest(formList).reverse();
  }

  const changeComplete = async (updateId) => {
    console.log('test');
    const response = await axios.put((process.env.REACT_APP_API_URL || 'http://localhost:3001/') + updateId);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3001') + '/bugs');
      setCompleted(sortCompleted(response.data, true));
      setNotCompleted(sortCompleted(response.data, false))
    }
    fetchData();
  }, [])

  useEffect(() => {
      setBugForms(sortType(notCompleted, 'bugReport'));
      setCompletedBugs(sortType(completed, 'bugReport'));
      setFeatureForms(sortType(notCompleted, 'featureRequest'));
      setCompletedFeatures(sortType(completed, 'featureRequest'))
  }, [notCompleted])

  return (
    <div className="grid-container">
      <div className="topbar">
        <h1>Bug Tracker/Feature Requests</h1>
      </div>
      <div className="bugCards">
        <h3>Bug Reports</h3>
        {bugForms.map((item) => {
          return (
            <div key={item._id} className="card">
              <div className="infoContainer">
                {item.username}<br/>
                {item.email}<br/>
                {item.message}<br/>
              </div>
              <div className="buttonContainer">
                <Button
                  itemId={item._id}
                  changeCompleted={changeCompleted}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="bugCompleted">
        <h3>Completed Bugs</h3>
        {completedBugs.map((item) => {
          return (
            <div key={item._id} className="card completed">
              <div className="infoContainer">
                {item.username}<br/>
                {item.email}<br/>
                {item.message}<br/>
              </div>
            </div>
          )
        })}
      </div>
      <div className="featureCards">
        <h3>Feature Requests</h3>
        {featureForms.map((item) => {
          console.log("TAG:item",item);
          return (
            <div key={item._id} className="card">
              <div className="infoContainer">
                {item.username}<br/>
                {item.email}<br/>
                {item.message}<br/>
              </div>
              <div className="buttonContainer">
                <Button
                  itemId={item._id}
                  changeCompleted={changeCompleted}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="featureCompleted">
        <h3>Completed Feature Requests</h3>
        {completedFeatures.map((item) => {
          return (
            <div key={item._id} className="card completed">
              <div className="infoContainer">
                {item.username}<br/>
                {item.email}<br/>
                {item.message}<br/>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default View;