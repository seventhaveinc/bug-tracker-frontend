import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../view.css'

export default function BugTab ({ handleSwitchStatus, bugTickets }) {

  return (
    <>
      <div className="columnTitles">
        <div className="columnTop">
          <h3>Reported</h3>
        </div>
        <div className="columnTop middle">
          <h3>In Progress</h3>
        </div>
        <div className="columnTop">
          <h3>Completed</h3>
        </div>
      </div>
      <div className="cardContainer">
        <div className="reported cardColumn">
          {bugTickets.filter((filterItem) => filterItem.status === 'reported').map((mapItem) => {
            return (
              <div className="card">
                <div className="information">
                  <h3>{mapItem.title}</h3>
                  <h5>{mapItem.username}</h5>
                </div>
                <div className="buttons">
                  <button
                    className="tabLinks"
                    onClick={() => {
                      handleSwitchStatus('bug', mapItem, 'inProgress')
                    }}
                  >
                    Start
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="inProgress cardColumn middle">
          {bugTickets.filter((filterItem) => filterItem.status === 'inProgress').map((mapItem) => {
            return (
              <div className="card" key={mapItem._id}>
                <div className="information">
                  <span className="defining">Username: </span>{mapItem.username}<br/>
                  <span className="defining">Email Address: </span>{mapItem.email}<br/>
                  <span className="defining">Steps to Reproduce: </span>{mapItem.reproduce}<br/>
                  <span className="defining">Expected Outcome: </span>{mapItem.expectedOutcome}<br/>
                  <span className="defining">Actual Outcome: </span>{mapItem.actualOutcome}<br/>
                </div>
                <div className="buttons">
                  <button
                    className="tabLinks"
                    onClick={() => {
                      handleSwitchStatus('bug', mapItem, 'completed')
                    }}
                  >
                    Complete
                  </button>
                  <button
                    className="tabLinks"
                    onClick={() => {
                      handleSwitchStatus('bug', mapItem, 'reported')
                    }}
                  >
                    Undo
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="completed cardColumn">
          {bugTickets.filter((filterItem) => filterItem.status === 'completed').map((mapItem) => {
            return (
              <div className="card">
                <div className="information">
                  <span className="defining">Username: </span>{mapItem.username}<br/>
                  <span className="defining">Email Address: </span>{mapItem.email}<br/>
                  <span className="defining">Steps to Reproduce: </span>{mapItem.reproduce}<br/>
                  <span className="defining">Expected Outcome: </span>{mapItem.expectedOutcome}<br/>
                  <span className="defining">Actual Outcome: </span>{mapItem.actualOutcome}<br/>
                </div>
                <div className="buttons">
                  <button
                    className="tabLinks"
                    onClick={() => {
                      handleSwitchStatus('bug', mapItem, 'inProgress')
                    }}
                  >
                    Undo
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}