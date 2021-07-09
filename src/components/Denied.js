import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import '../view.css'

function Denied (props) {

  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/login')
    }, 5000);
  }, [])

  return (
    <div className="denied">
      <h1>Access Denied</h1>
      <h3>Redirecting in 5 seconds.</h3>
    </div>
  )
}

export default Denied