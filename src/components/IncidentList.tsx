import useIncidents from "@/hooks/useIncidents";
import useRange from "@/hooks/useRange";
import { Badge } from "./ui/badge";

const IncidentList = () => {
  const {range} = useRange();
  const {incidentsByRange} = useIncidents({fromRange: range});

  if (incidentsByRange.isLoading) {
    return <p>Loading...</p>
  }

  if (incidentsByRange.isError) {
    return <p>Error: {incidentsByRange.error.message}</p>
  }

  if (incidentsByRange.isFetched === false || incidentsByRange.data?.length === 0) {
    return <></>
  }

  return(
    <div className='flex flex-col gap-2 p-4'>
      {incidentsByRange.isSuccess && incidentsByRange.data.map((item) => (
          <div key={item.id} className='bg-white p-4 rounded-lg shadow-md flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>{item.incident_type}</h3>
            <p>{item.description}</p>
            <Badge variant={"secondary"} className="my-1 mr-auto">{item.reported_by.replaceAll('_', ' ')}</Badge>
            <a href={item.incident_link.link} target='_blank' rel='noreferrer noopener' className='text-blue-500 underline ml-auto'>Read more</a>
          </div>
      ))}
    </div>
  )
}

export default IncidentList;