import { Incident } from "@/hooks/useIncidents";
import { useMap } from "react-leaflet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FaMapLocationDot } from "react-icons/fa6";

const IncidentCard = ({incident, toggleIncidentList, show}: {incident: Incident; toggleIncidentList?: () => void; show?: boolean}) => {
  const map = useMap();
  const handleViewOnMap = () => {
    map.flyTo([incident.location.coordinates[1], incident.location.coordinates[0]], 14);
    
    if(show !== undefined && show === true && toggleIncidentList) {
      toggleIncidentList();
    }
  }
  
  return (
    <div className='bg-white p-4 rounded-lg shadow-md flex flex-col gap-2'>
      <h3 className='text-lg font-semibold'>{incident.incident_type}</h3>
      <p>{incident.description}</p>
      <Badge variant={"secondary"} className="my-1 mr-auto !capitalize">{incident.reported_by.replaceAll('_', ' ').toLocaleLowerCase()}</Badge>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="w-full">
          <Badge variant={"default"}>{incident.location_name}</Badge>
        </div>
        
        <Button variant={"outline"} onClick={handleViewOnMap}>
          <FaMapLocationDot className='w-4 h-4 mr-1'/>
          View on map
        </Button>
        <a href={incident.incident_link.link} target='_blank' rel='noreferrer noopener' className='text-blue-500 underline ml-auto'>Read more</a>
      </div>
    </div>
  )
}

export default IncidentCard;