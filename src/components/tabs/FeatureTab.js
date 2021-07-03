import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../view.css'

export default function FeatureTab ({ handleSwitchStatus, featureTickets }) {

  return (
    <>
      <div className="columnTitles">
        <div className="columnTop">
          <h3>Pending</h3>
        </div>
        <div className="columnTop middle">
          <h3>In Progress</h3>
        </div>
        <div className="columnTop">
          <h3>Completed</h3>
        </div>
      </div>
      <div className="cardContainer">
        <div className="pending cardColumn">
          {featureTickets.filter((filterItem) => {
            return (filterItem.status === 'pending' || filterItem.status === 'approved' || filterItem.status === 'denied') //spaghetti code but it's the only thing that worked
          }).map((mapItem) => {
            return (
              <div className={mapItem.status === 'approved' ? 'card approved' : (mapItem.status === 'denied') ? 'card denied' : 'card'}>
                <div className="information">
                  <span className="defining">Username: </span>{mapItem.username}<br/>
                  <span className="defining">Email Address: </span>{mapItem.email}<br/>
                  <span className="defining">Request: </span>{mapItem.request}<br/>
                </div>
                <div className="buttons">
                  {mapItem.status === 'pending' ? 
                    <>
                      <button
                        className="tabLinks"
                        onClick={() => {
                          handleSwitchStatus('feature', mapItem, 'approved')
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="tabLinks"
                        onClick={() => {
                          handleSwitchStatus('feature', mapItem, 'denied')
                        }}
                      >
                        Deny
                      </button>
                    </>
                  : null}
                  {(mapItem.status === 'approved') ? 
                    <>
                      <button
                        className="tabLinks"
                        onClick={() => {
                          handleSwitchStatus('feature', mapItem, 'pending')
                        }}
                      >
                        Reset
                      </button>
                      <button
                        className="tabLinks"
                        onClick={() => {
                          handleSwitchStatus('feature', mapItem, 'inProgress')
                        }}
                      >
                        Start
                      </button>
                    </>
                  : null}
                  {(mapItem.status === 'denied') ? 
                    <>
                      <button
                        className="tabLinks"
                        onClick={() => {
                          handleSwitchStatus('feature', mapItem, 'pending')
                        }}
                      >
                        Reset
                      </button>
                    </>
                  : null}
                </div>
              </div>
            )
          })}
        </div>
        <div className="inProgress cardColumn middle">
          {featureTickets.filter((filterItem) => filterItem.status === 'inProgress').map((mapItem) => {
            return (
              <div className="card">
                  <div className="information">
                  <span className="defining">Username: </span>{mapItem.username}<br/>
                  <span className="defining">Email Address: </span>{mapItem.email}<br/>
                  <span className="defining">Request: </span>{mapItem.request}<br/>
                </div>
                <div className="buttons">
                  <button
                    className="tabLinks"
                    onClick={() => {
                      handleSwitchStatus('feature', mapItem, 'completed')
                    }}
                  >
                    Complete
                  </button>
                  <button
                    className="tabLinks"
                    onClick={() => {
                      handleSwitchStatus('feature', mapItem, 'approved')
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
          {featureTickets.filter((filterItem) => filterItem.status === 'completed').map((mapItem) => {
            return (
              <div className="card">
                <div className="information">
                  <span className="defining">Username: </span>{mapItem.username}<br/>
                  <span className="defining">Email Address: </span>{mapItem.email}<br/>
                  <span className="defining">Request: </span>{mapItem.request}<br/>
                </div>
                <div className="buttons">
                  <button
                    className="tabLinks"
                    onClick={() => {
                      handleSwitchStatus('feature', mapItem, 'inProgress')
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