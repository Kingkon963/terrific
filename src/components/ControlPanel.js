import React from "react";
import { Button } from "@/components/ui/button";


const ControlPanel = ({fetchIncidents}) => {
  // const { fetchIncidents } = useIncidents();

  
  return (
    <div className="absolute top-0 left-0 right-0 z-[999] bg-background flex items-center flex-col gap-4 p-4">
      <Button onClick={fetchIncidents} className="max-w-64">Search this area</Button>
    </div>
  );
};

export default ControlPanel;