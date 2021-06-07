import React from 'react';

const Tab = ({ content }) => {
  return (
    <div className="tab-pane">
      <h2>Submit a Ticket</h2>
      {content}
    </div>
  )

};

export default Tab;