// hooks/useIncidents.js
import { useState } from 'react';

const useIncidents = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // Function to fetch items within a bounding box
  const fetchItems = async (lat_min:string, lon_min:string, lat_max:string, lon_max:string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/items?lat_min=${lat_min}&lon_min=${lon_min}&lat_max=${lat_max}&lon_max=${lon_max}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const data = await response.json();
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
