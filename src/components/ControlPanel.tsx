import React from "react";
import { Button } from "@/components/ui/button";
import useIncidents from "@/hooks/useIncidents";


const ControlPanel = () => {
  const { incidents } = useIncidents();

  
  return (
    <div className="absolute top-0 left-0 right-0 z-[999] bg-background flex items-center flex-col gap-4 p-4">
      <Button onClick={() => incidents.refetch()} className="max-w-64">Search this area</Button>
    </div>
  );
};

export default ControlPanel;