import React, { useState, useEffect } from "react";
import axios from "axios";
import '../view.css'
import CompleteButton from './CompleteButton';
import UnCompleteButton from './UnCompleteButton';

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

  const handleUnCompleteRemove = (item) => {
    if (item.requestType === "bugReport") {
      const newArr = completedBugs.filter((thing) => thing._id !== item._id);
      setCompletedBugs(newArr);
    } else {
      const newArr = completedFeatures.filter((thing) => thing._id !== item._id);
      setCompletedFeatures(newArr);
    }
  }

  const handleCompleteRemove = (item) => {
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
    handleCompleteRemove(response);
  }

  const changeUnCompleted = (response, whichOne) => {
    if (whichOne === "bugs") {
      setBugForms([...bugForms, response]);
    } else {
      setFeatureForms([...featureForms, response])
    }
    handleUnCompleteRemove(response);
  }

  const sortType = (formList, toSort) => {
    return (formList.filter(item => item.requestType === toSort))
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
        <h1 className="title">Bug Tracker/Feature Requests</h1>
      </div>
      <div className="bugCards">
        <h3 className="littleTitle">Bug Reports</h3>
        {bugForms.map((item) => {
          return (
            <div key={item._id} className="card">
              <div className="infoContainer">
                {item.username}<br/>
                {item.email}<br/>
                {item.message}<br/>
              </div>
              <div className="buttonContainer">
                <CompleteButton
                  itemId={item._id}
                  changeCompleted={changeCompleted}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="bugCompleted">
        <h3 className="littleTitle">Completed Bugs</h3>
        {completedBugs.map((item) => {
          return (
            <div key={item._id} className="card completed">
              <div className="infoContainer">
                {item.username}<br/>
                {item.email}<br/>
                {item.message}<br/>
              </div>
              <div className="buttonContainer">
                <UnCompleteButton
                  itemId={item._id}
                  changeCompleted={changeUnCompleted}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="featureCards">
        <h3 className="littleTitle">Feature Requests</h3>
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
                <CompleteButton
                  itemId={item._id}
                  changeCompleted={changeCompleted}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="featureCompleted">
        <h3 className="littleTitle">Completed Feature Requests</h3>
        {completedFeatures.map((item) => {
          return (
            <div key={item._id} className="card completed">
              <div className="infoContainer">
                {item.username}<br/>
                {item.email}<br/>
                {item.message}<br/>
              </div>
              <div className="buttonContainer">
                <UnCompleteButton
                  itemId={item._id}
                  changeCompleted={changeUnCompleted}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default View;