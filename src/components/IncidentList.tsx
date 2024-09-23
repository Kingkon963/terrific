import useIncidents from "@/hooks/useIncidents";
import useRange from "@/hooks/useRange";

const IncidentList = () => {
  const {range} = useRange();
  const {incidentsByRange} = useIncidents({fromRange: range});

  if (incidentsByRange.isLoading) {
    return <p>Loading...</p>
  }

  if (incidentsByRange.isError) {
    return <p>Error: {incidentsByRange.error.message}</p>
  }

  if (!incidentsByRange.isFetched || !incidentsByRange.data) {
    return null
  }

  return(
    <div className='flex flex-col gap-2 p-4'>
      {incidentsByRange.isSuccess && incidentsByRange.data.map((item) => (
          <div key={item.id} className='bg-white p-4 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold'>{item.incident_type}</h3>
            <p>{item.description}</p>
          </div>
      ))}
    </div>
  )
}

export default IncidentList;