import React, { useEffect, useRef } from 'react';
import useIncidents from "@/hooks/useIncidents";
import useRange from "@/hooks/useRange";
import IncidentCard from './IncidentCard';


const IncidentList = () => {
  const {range} = useRange();
  const {incidentsByRange} = useIncidents({fromRange: range});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    console.log(container);
    if (!container) return;

    const stopPropagation = (e: WheelEvent) => {
      e.stopPropagation();
    };

    container.addEventListener('wheel', stopPropagation);

    return () => {
      container.removeEventListener('wheel', stopPropagation);
    };
  }, [containerRef.current]);

  if (incidentsByRange.isLoading) {
    return <p>Loading...</p>
  }

  if (incidentsByRange.isError) {
    return <p>Error: {incidentsByRange.error.message}</p>
  }

  if (incidentsByRange.isFetched === false || incidentsByRange.data?.length === 0) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className='absolute right-0 top-0 bottom-0 z-[999] bg-transparent h-[100dvh] max-w-sm overflow-hidden'
    >
      <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full">
        {incidentsByRange.isSuccess && incidentsByRange.data.map((item) => (
          <IncidentCard incident={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default IncidentList;