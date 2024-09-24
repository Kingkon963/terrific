import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMap } from "react-leaflet";
import { IoMdLocate } from "react-icons/io";

const Locator = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.coords.latitude, location.coords.longitude], 14);
    }
  }, [location, map]);

  const handleLocate = () => {
    setIsLocating(true);
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position);
        setIsLocating(false);
      }, error => {
        setIsLocating(false);
        console.error(error);
        if(error.code === 2) {
          alert('Location is not available. Please enable location services in your device.');
        }
      });
    } else {
      alert('Geolocation is not available');
    }
  }

  return (
    <div className='absolute bottom-0 left-0 z-[999] bg-background flex items-center flex-col gap-4 p-3'>
        <Button onClick={handleLocate} variant={"secondary"} className="border border-gray-500 px-2">
          <IoMdLocate  className={isLocating ? 'animate-spin w-6 h-6' : 'w-6 h-6'}/>
        </Button>
      </div>
  );
}

export default Locator;