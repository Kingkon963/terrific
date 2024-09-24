import React, { useEffect, useRef } from 'react';
import useIncidents from "@/hooks/useIncidents";
import useRange from "@/hooks/useRange";
import IncidentCard from './IncidentCard';
import { Button } from './ui/button';


const IncidentList = ({ toggleIncidentList, show }: { toggleIncidentList: () => void; show: boolean }) => {
  const {range} = useRange();
  const {incidentsByRange} = useIncidents({fromRange: range});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show === false) {
      toggleIncidentList();
    }
  }, [incidentsByRange.isSuccess]);

  useEffect(() => {
    const container = containerRef.current;
    console.log(container);
    if (!container) return;

    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    container.addEventListener('wheel', stopPropagation);
    container.addEventListener('touchmove', stopPropagation);

    return () => {
      container.removeEventListener('wheel', stopPropagation);
      container.removeEventListener('touchmove', stopPropagation);
    };
  }, [containerRef.current]);

  if (incidentsByRange.isLoading) {
    return <p>Loading...</p>
  }

  if (incidentsByRange.isError) {
    return <p>Error: {incidentsByRange.error.message}</p>
  }
  

  if (show === false || incidentsByRange.isFetched === false || incidentsByRange.data?.length === 0) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className='absolute right-0 top-0 bottom-0 z-[999] bg-transparent h-[100dvh] max-w-sm overflow-hidden'
    >
      <div className="flex flex-col gap-2 p-4 pt-20 overflow-y-auto h-full">
        <Button variant={"destructive"} onClick={toggleIncidentList} className='absolute top-4 right-4 z-[9999]'>Close</Button>
        {incidentsByRange.isSuccess && incidentsByRange.data.map((item) => (
          <IncidentCard incident={item} key={item.id} show={show} toggleIncidentList={toggleIncidentList} />
        ))}
      </div>
    </div>
  )
}

export default IncidentList;