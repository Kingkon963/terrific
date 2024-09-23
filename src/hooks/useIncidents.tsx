import { fetchAllIncidents, fetchIncidentByRange, type fetchIncidentByRangeRequest } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export type Incident = {
  id: number;
  reported_by: string;
  location: GeoJSON.Point;
  date_time: number;
  description: string;
  incident_type: string;
}

const useIncidents = ({ fromRange: range } : {fromRange: fetchIncidentByRangeRequest | null}) => {
  const incidents = useQuery<Incident[]>({
    queryKey: ['incidents'], 
    queryFn: fetchAllIncidents,
    enabled: false,
  });

  const incidentsByRange = useQuery<Incident[]>({
    queryKey: ['incidentsByRange', range],
    queryFn: () => range ? fetchIncidentByRange(range) : Promise.reject('Range is null'),
    enabled: !!range,
  });

  return { incidents, incidentsByRange };
};

export default useIncidents;