import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import '../view.css'

function Navbar (props) {

  return (
    <div className="topbar">
      <img src="7th_logo.png" className="navbarlogo" />
      <h1 className="title">Bug Tracker</h1>
    </div>
  )
}

export default Navbar;