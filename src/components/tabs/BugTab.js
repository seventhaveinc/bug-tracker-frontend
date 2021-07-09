import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../view.css'
import '../../modal.css'
import Modal from 'react-modal'

Modal.setAppElement("#root");

export default function BugTab ({ handleSwitchStatus, bugTickets }) {

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
        
        <a href="#reported">
          <button className="floatingButton">
            Reported
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
              <span className="defining">Steps to Reproduce:</span> {focusedItem.reproduce} <br />
              <span className="defining">Expected Outcome:</span> {focusedItem.expectedOutcome} <br />
              <span className="defining">Actual Outcome:</span> {focusedItem.actualOutcome}
            </div>

          </div>

        </Modal>

      <div className="cardContainer">

        <div className="reported cardColumn">

          <section id="reported">
            <div className="columnTop">
              <h3>Reported</h3>
            </div>
          </section>

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

        <div className="inProgress cardColumn middle">

          <section id="inProgress">
            <div className="columnTop">
              <h3>In Progress</h3>
            </div>
          </section>

          {bugTickets.filter((filterItem) => filterItem.status === 'inProgress').map((mapItem) => {
            return (
              <div className="card" key={mapItem._id}>
                <div className="information">
                  <h3>{mapItem.title}</h3>
                  <h5>{mapItem.username}</h5>
                </div>
                <div className="buttons">
                  <button
                    className="tabLinks progressbuttons"
                    onClick={() => {
                      handleSwitchStatus('bug', mapItem, 'completed')
                    }}
                  >
                    Complete
                  </button>
                  <button
                    className="tabLinks progressbuttons"
                    onClick={() => {
                      handleSwitchStatus('bug', mapItem, 'reported')
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

        <div className="completed cardColumn">

          <section id="completed">
            <div className="columnTop">
              <h3>Completed</h3>
            </div>
          </section>
          
          {bugTickets.filter((filterItem) => filterItem.status === 'completed').map((mapItem) => {
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

    </>
  )
}