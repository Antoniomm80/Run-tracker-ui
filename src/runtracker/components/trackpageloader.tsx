import { useParams } from "react-router-dom";
import { TrackPage } from "./trackpage";
import { useRunTrackerStore } from "../../App";

export function TrackPageLoader() {
    let { trackId } = useParams();
    const setSelectedTrack = useRunTrackerStore((state) => state.setSelectedTrack);
    const getSelectedTrack = useRunTrackerStore((state) => state.getSelectedTrack); 
    setSelectedTrack(parseInt(trackId||"0"));    
    return <TrackPage trackSummary={getSelectedTrack()}/>
}