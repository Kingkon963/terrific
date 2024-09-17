// hooks/useIncidents.js
import { fetchIncidents } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface Incident {
  id: number;
  reported_by: string;
  location: GeoJSON.Point;
  date_time: number;
  description: string;
  incident_type: string;
}

const useIncidents = () => {
  const incidents = useQuery<Incident[]>({
    queryKey: ['incidents'], 
    queryFn: fetchIncidents,
    enabled: false,
  });

  return { incidents };
};

export default useIncidents;
