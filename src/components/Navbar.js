import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'

function Navbar (props) {

  return (
    <div>
      {props.activePage}
    </div>
  )
}

export default Navbar;