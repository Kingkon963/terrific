import { RangeContext } from "@/contexts/RangeContext";
import { useContext } from "react";


export default function useRange() {
  const rangeContext = useContext(RangeContext);
  if (!rangeContext) {
    throw new Error('useRange must be used within a RangeProvider');
  }
  return rangeContext;
}