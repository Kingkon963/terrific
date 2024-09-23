import { fetchIncidentByRangeRequest } from '@/lib/api';
import React, { createContext, useState, useCallback, ReactNode } from 'react';

interface RangeContextProps {
  range: fetchIncidentByRangeRequest | null;
  updateRange: (range: fetchIncidentByRangeRequest) => void;
}

export const RangeContext = createContext<RangeContextProps | undefined>(undefined);

export const RangeProvider = ({ children }: { children: ReactNode }) => {
  const [range, setRange] = useState<fetchIncidentByRangeRequest | null>(null);

  const updateRange = useCallback((range: fetchIncidentByRangeRequest) => {
    setRange(range);
  }, []);

  return (
    <RangeContext.Provider value={{ range, updateRange }}>
      {children}
    </RangeContext.Provider>
  );
};