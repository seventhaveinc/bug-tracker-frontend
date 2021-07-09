import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../view.css'
import '../../modal.css'
import Modal from 'react-modal'

export default function FeatureTab ({ handleSwitchStatus, featureTickets }) {

  const [show, setShow] = useState(false);
  const [focusedItem, setFocusedItem] = useState({});

  const handleShowModal = (item) => {
    setFocusedItem(item);
    setShow(true);
  }

  const handleCloseModal = () => {
    setShow(false);
  }

  return (
    <>
      <div className="navbuttons">
        
        <a href="#pending">
          <button className="floatingButton">
            Pending
          </button>
        </a>

        <a href="#inProgress">
          <button className="floatingButton">
            In Progress
          </button>
        </a>

        <a href="#completed">
          <button className="floatingButton">
            Completed
          </button>
        </a>

      </div>

      <Modal
        isOpen={show}
        onRequestClose={handleCloseModal}
        contentLabel="details"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >

        <div className="titlearea">
          <img src="7th_logo.png" className="littlelogo"/>
          <h3 className="modaltitle">{focusedItem.title}</h3>
          <button className="tabLinks" onClick={handleCloseModal}>X</button>
        </div>

        <div className="content">

          <div className="basicinfo">
            <span><span className="defining">Username:</span> {focusedItem.username}</span>
            <span><span className="defining">Email:</span> {focusedItem.email}</span>
          </div>

          <div className="otherinfo">
            <span className="defining">Message:</span> {focusedItem.request} <br />
          </div>

        </div>

      </Modal>

      <div className="cardContainer">

        <div className="pending cardColumn">

          <section id="pending">
            <div className="columnTop">
              <h3>Pending</h3>
            </div>
          </section>

          <div className="cards">
            {featureTickets.filter((filterItem) => {
              return (filterItem.status === 'pending' || filterItem.status === 'approved' || filterItem.status === 'denied') //spaghetti code but it's the only thing that worked
            }).map((mapItem) => {
              return (
                <div key={mapItem._id} className="card" id={mapItem.status === 'approved' ? 'approved' : (mapItem.status === 'denied') ? 'denied' : ''}>
                  <div className="information">
                    <h3>{mapItem.title}</h3>
                    <h5>{mapItem.username}</h5>
                  </div>
                  <div className="buttons" id={mapItem.status === 'approved' ? 'approvedbuttons' : mapItem.status === 'denied' ? 'deniedbuttons' : ''}>
                    {mapItem.status === 'pending' ? 
                      <>
                        <button
                          className="tabLinks progressbuttons"
                          onClick={() => {
                            handleSwitchStatus('feature', mapItem, 'approved')
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="tabLinks progressbuttons"
                          onClick={() => {
                            handleSwitchStatus('feature', mapItem, 'denied')
                          }}
                        >
                          Deny
                        </button>
                        <button
                          className="tabLinks progressbuttons"
                          onClick={() => {
                            handleShowModal(mapItem);
                          }}
                        >
                          Details
                        </button>
                      </>
                    : null}
                    {(mapItem.status === 'approved') ? 
                      <>
                        <button
                          className="tabLinks progressbuttons"
                          onClick={() => {
                            handleSwitchStatus('feature', mapItem, 'pending')
                          }}
                        >
                          Reset
                        </button>
                        <button
                          className="tabLinks progressbuttons"
                          onClick={() => {
                            handleSwitchStatus('feature', mapItem, 'inProgress')
                          }}
                        >
                          Start
                        </button>
                        <button
                          className="tabLinks progressbuttons"
                          onClick={() => {
                            handleShowModal(mapItem);
                          }}
                        >
                          Details
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
                        <button
                          className="tabLinks"
                          onClick={() => {
                            handleShowModal(mapItem);
                          }}
                        >
                          Details
                        </button>
                      </>
                    : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="inProgress cardColumn middle">

          <section id="inProgress">
            <div className="columnTop">
              <h3>In Progress</h3>
            </div>
          </section>

          <div className="cards">
          
            {featureTickets.filter((filterItem) => filterItem.status === 'inProgress').map((mapItem) => {
              return (
                <div className="card">

                  <div className="information">
                    <h3>{mapItem.title}</h3>
                    <h5>{mapItem.username}</h5>
                  </div>

                  <div className="buttons">
                    <button
                      className="tabLinks progressbuttons"
                      onClick={() => {
                        handleSwitchStatus('feature', mapItem, 'completed')
                      }}
                    >
                      Complete
                    </button>
                    <button
                      className="tabLinks progressbuttons"
                      onClick={() => {
                        handleSwitchStatus('feature', mapItem, 'approved')
                      }}
                    >
                      Undo
                    </button>
                    <button
                      className="tabLinks progressbuttons"
                      onClick={() => {
                        handleShowModal(mapItem);
                      }}
                    >
                      Details
                    </button>

                  </div>

                </div>

              )
            })}

          </div>
        </div>
        <div className="completed cardColumn">

          <section id="completed">
            <div className="columnTop">
              <h3>Completed</h3>
            </div>
          </section>

          <div className="cards">
            {featureTickets.filter((filterItem) => filterItem.status === 'completed').map((mapItem) => {
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
                        handleSwitchStatus('feature', mapItem, 'inProgress')
                      }}
                    >
                      Undo
                    </button>

                    <button
                      className="tabLinks"
                      onClick={() => {
                        handleShowModal(mapItem);
                      }}
                    >
                      Details
                    </button>

                  </div>

                </div>

              )
            })}

          </div>

        </div>

      </div>

    </>
  )
}