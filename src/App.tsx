import { MantineProvider, Text } from "@mantine/core";
import { TrackList } from "./runtracker/components/tracksList";
import { TrackSummary } from "./runtracker/domain/tracksummary";
import "./runtracker/i18n/i18nconfig";
import { create } from "zustand";
import { TrackCard } from "./runtracker/components/trackcard";
import { TrackPage } from "./runtracker/components/trackpage";
import RunTrackerAppShell from "./runtracker/components/appShell";

export const useRunTrackerStore = create<RunTrackerState>()((set) => ({
    selectedTrack: undefined,
    setSelectedTrack: (trackId) => set((state) => ({ selectedTrack: trackId })),
    clear: () => set((state) => ({ selectedTrack: undefined })),
}));

export default function App() {

    
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>            
            <RunTrackerAppShell/>
        </MantineProvider>
    );
}
