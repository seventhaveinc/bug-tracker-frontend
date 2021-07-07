import React, { useState, useEffect, } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import '../modal.scss'

function BugModal (props) {

  const { username, email, reproduce, expectedOutcome, actualOutcome, onClose } = props;

  if (!props.show) {
    return null;
  } else {
    return (
      <div className="dialog" id="modal">
        <span className="dialog__close" onClick={onClose}>&#x2715;</span>
        <h2 className="dialog__title">{props.title}</h2>
        <div className="dialog__content">
          {username}
          {email}
          {reproduce}
          {expectedOutcome}
          {actualOutcome}
        </div>
        <div className="actions">
          <button className="toggle-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  }

}

export default BugModal;