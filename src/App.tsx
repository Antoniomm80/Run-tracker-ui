import { MantineProvider } from "@mantine/core";
import "./runtracker/i18n/i18nconfig";
import { create } from "zustand";
import RunTrackerAppShell from "./runtracker/components/appShell";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export const useRunTrackerStore = create<RunTrackerState>()((set) => ({
    selectedTrack: undefined,
    setSelectedTrack: (trackId) => set((state) => ({ selectedTrack: trackId })),
    clear: () => set((state) => ({ selectedTrack: undefined })),
}));

export default function App() {
    const queryClient = new QueryClient();

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <QueryClientProvider client={queryClient}>
                <RunTrackerAppShell />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </MantineProvider>
    );
}
