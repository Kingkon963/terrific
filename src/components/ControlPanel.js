import React from "react";


const ControlPanel = () => {

  return (
    <div className="w-[20dvw] !max-w-sm flex flex-col gap-4">
      <button id="fetchItemsBtn" style={{ marginTop: '10px' }}>Fetch Incidents</button>
    </div>
  );
};

export default ControlPanel;