import {MantineProvider} from "@mantine/core";
import "./runtracker/i18n/i18nconfig";
import {create} from "zustand";
import RunTrackerAppShell from "./runtracker/components/appShell";

export const useRunTrackerStore = create<RunTrackerState>()((set) => ({
    selectedTrack: undefined,
    setSelectedTrack: (trackId) => set((state) => ({selectedTrack: trackId})),
    clear: () => set((state) => ({selectedTrack: undefined})),
}));

export default function App() {


    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <RunTrackerAppShell/>
        </MantineProvider>
    );
}
