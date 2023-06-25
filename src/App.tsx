import { MantineProvider, Text } from "@mantine/core";
import { TrackList } from "./runtracker/components/tracksList";
import { TrackSummary } from "./runtracker/domain/tracksummary";
import "./runtracker/i18n/i18nconfig";
import { create } from "zustand";

export const useRunTrackerStore = create<RunTrackerState>()((set) => ({
    selectedTrack: undefined,
    setSelectedTrack: (trackId) => set((state) => ({ selectedTrack: trackId })),
    clear: () => set((state) => ({ selectedTrack: undefined })),
}));

export default function App() {
    const tracks: TrackSummary[] = [];
    tracks.push(
        TrackSummary.ofProps({
            id: 1,
            name: "Track 1",
            distance: 1000,
            description: "Track 1 description",
            durationBest: 100,
            trainingDateBest: new Date(),
            durationLatest: 199,
            trainingDateLatest: new Date(),
        })
    );

    tracks.push(
        TrackSummary.ofProps({
            id: 2,
            name: "Track 2",
            distance: 2000,
            description: "Track 2 description",
            durationBest: 200,
            trainingDateBest: new Date(),
            durationLatest: 2021,
            trainingDateLatest: new Date(),
        })
    );

    tracks.push(
        TrackSummary.ofProps({
            id: 3,
            name: "Track 3",
            distance: 3000,
            description: "Track 3 description",
            durationBest: 300,
            trainingDateBest: new Date(),
            durationLatest: 199,
            trainingDateLatest: new Date(),
        })
    );
    
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <TrackList tracks={tracks} />
        </MantineProvider>
    );
}
