// hooks/useIncidents.js
import { useState } from 'react';


interface Incident {
  id: string;
  title: string;
  description: string;
  lat: number;
  lon: number;
  date: string;
  type: string;
}


const useIncidents = () => {
  const [items, setItems] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Function to fetch items within a bounding box
  const fetchItems = async (lat_min:string, lon_min:string, lat_max:string, lon_max:string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("fetching items");
      const response = await fetch(`/api/items?lat_min=${lat_min}&lon_min=${lon_min}&lat_max=${lat_max}&lon_max=${lon_max}`);
      if (!response.ok) {
        // throw new Error('Failed to fetch items');
      }

      const data = [
        {
          "id": "1",
          "title": "Incident 1",
          "description": "Description of incident 1",
          "lat": 51.505,
          "lon": -0.09,
          "date": "2022-01-01",
          "type": "incident"
        },
        {
          "id": "2",
          "title": "Incident 2",
          "description": "Description of incident 2",
          "lat": 51.505,
          "lon": -0.09,
          "date": "2022-01-01",
          "type": "incident"
        },
        {
          "id": "3",
          "title": "Incident 3",
          "description": "Description of incident 3",
          "lat": 51.505,
          "lon": -0.09,
          "date": "2022-01-01",
          "type": "incident"
        },
        {
          "id": "4",
          "title": "Incident 4",
          "description": "Description of incident 4",
          "lat": 51.505,
          "lon": -0.09,
          "date": "2022-01-01",
          "type": "incident"
        },
        {
          "id": "5",
          "title": "Incident 5",
          "description": "Description of incident 5",
          "lat": 51.505,
          "lon": -0.09,
          "date": "2022-01-01",
          "type": "incident"
        }
      ]
      setItems(data);
    } catch (err) {
      if(err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error, fetchItems };
};

export default useIncidents;
