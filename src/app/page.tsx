import dynamic from 'next/dynamic';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Terrific: Incidents Map',
  description: 'A map of incidents',
};

// Dynamically import the Map component because Leaflet uses window, and Next.js is server-side rendered
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <Map />
      </main>
    </div>
  );
}
