import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import "./runtracker/i18n/i18nconfig";
import { create } from "zustand";
import RunTrackerAppShell from "./runtracker/components/appShell";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TrackSummary } from "./runtracker/domain/tracksummary";
import { RunTrackerState } from "./runtracker/domain/runtrackerstate";
import { useState } from "react";
import { Notifications } from "@mantine/notifications";

export const useRunTrackerStore = create<RunTrackerState>()((set, get) => ({
    tracksSummary: [],
    setTracksSummary: (tracks: TrackSummary[]) => set((state: RunTrackerState) => ({ tracksSummary: [...tracks] })),
    selectedTrack: undefined,
    setSelectedTrack: (trackId) => set((state: RunTrackerState) => ({ selectedTrack: trackId })),
    getSelectedTrack: () => {
        if (get().tracksSummary.length === 0) {
            return undefined;
        }
        if (get().selectedTrack === undefined) {
            set({ selectedTrack: get().tracksSummary[0].id });
            return get().tracksSummary[0];
        }
        return get().tracksSummary.find((t) => t.id === get().selectedTrack);
    },
    clear: () => set((state: RunTrackerState) => ({ selectedTrack: undefined })),
    open: () => {},
    setOpen: (open: () => void) => set((state: RunTrackerState) => ({ open: open })),
}));
export default function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    const queryClient = new QueryClient();

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <Notifications />
                <QueryClientProvider client={queryClient}>
                    <RunTrackerAppShell />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
