interface RunTrackerState {
    selectedTrack?: number,
    setSelectedTrack: (trackId: number) => void,
    clear: () => void
  }