import useIncidents from "@/hooks/useIncidents";
import useRange from "@/hooks/useRange";
import { useEffect } from "react";
import { Marker, Popup } from 'react-leaflet';
import IncidentCard from "./IncidentCard";


function IncidentMarker() {
  const { range } = useRange();
  const { incidentsByRange } = useIncidents({ fromRange: range });

  useEffect(() => {
    if (range) {
      incidentsByRange.refetch();
    }
  }, [incidentsByRange, range]);

  return (
    <>
        {/* <GeoJSON key={item.id + Math.random()} data={item.location} /> */}
      {incidentsByRange.isSuccess && incidentsByRange.data.map((item) => (
        <Marker position={[item.location.coordinates[1], item.location.coordinates[0]]} key={item.id}>
          <Popup>
            <IncidentCard incident={item} />
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default IncidentMarker;