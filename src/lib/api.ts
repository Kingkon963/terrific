const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllIncidents = async () => {
  const response = await fetch(`${BACKEND_URL}/incidents`);
  return response.json();
};


export type fetchIncidentByRangeRequest = {
  minLong: number;
  maxLong: number;
  minLat: number;
  maxLat: number;
};
export const fetchIncidentByRange = async (
  {
    minLong,
    maxLong,
    minLat,
    maxLat,
  }: fetchIncidentByRangeRequest
) => {
  const response = await fetch(`${BACKEND_URL}/incidents/range?lon_min=${minLong}&lon_max=${maxLong}&lat_min=${minLat}&lat_max=${maxLat}`);
  return response.json();
}