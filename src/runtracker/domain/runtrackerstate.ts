import { TrackSummary } from "./tracksummary";

export interface RunTrackerState {
    tracksSummary: TrackSummary[],
    setTracksSummary: (tracksSummary: TrackSummary[]) => void,
    selectedTrack?: number,
    setSelectedTrack: (trackId: number) => void,
    getSelectedTrack: () => TrackSummary | undefined,
    clear: () => void,
    open: () => void,
    setOpen: (open:()=>void) => void,    
  }