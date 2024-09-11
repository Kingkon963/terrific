import React from "react";
import { Button } from "@/components/ui/button";


const ControlPanel = ({fetchIncidents}) => {
  // const { fetchIncidents } = useIncidents();

  
  return (
    <div className="w-[20dvw] !max-w-sm flex flex-col gap-4 p-4">
      <Button onClick={fetchIncidents}>Fetch Incidents</Button>
    </div>
  );
};

export default ControlPanel;