// hooks/useIncidents.js
import { useState } from 'react';


interface Incident {
  id: string;
  description: string;
  lat: number;
  lon: number;
  date: string;
  type: string;
}


const useIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Function to fetch items within a bounding box
  const fetchIncidents = async (lat_min:string, lon_min:string, lat_max:string, lon_max:string) => {
    setLoading(true);
    setError(null);

    try {
      // const response = await fetch(`/api/items?lat_min=${lat_min}&lon_min=${lon_min}&lat_max=${lat_max}&lon_max=${lon_max}`);
      // if (!response.ok) {
      //   // throw new Error('Failed to fetch items');
      // }
      const data = [
        {
          "id": "1",
          "description": "2 people injured in a car accident",
          "lat": 23.755,
          "lon": 90.3705,
          "date": "2022-01-01",
          "type": "incident"
        },
        {
          "id": "2",
          "description": "Fire in a building",
          "lat": 23.761,
          "lon": 90.3694,
          "date": "2022-01-01",
          "type": "incident"
        },
        {
          "id": "3",
          "description": "Robbery in a store",
          "lat": 23.764,
          "lon": 90.382,
          "date": "2022-01-01",
          "type": "incident"
        }
      ]
      setIncidents(() => {
        console.log("setting incidents", data)
        return data;
      });
    } catch (err) {
      if(err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { incidents, loading, error, fetchIncidents };
};

export default useIncidents;
