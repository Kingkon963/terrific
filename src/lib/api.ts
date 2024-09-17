const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchIncidents = async () => {
  const response = await fetch(`${BACKEND_URL}/incidents`);
  return response.json();
};