import { MediaQuery } from "@mantine/core";
import { useRunTrackerStore } from "../../App";
import { NewTrackFab } from "./newTrackFab";
import { TrackList } from "./tracksList";
import { useMediaQuery } from "@mantine/hooks";

export function TrackListPage() {
    const tracksSummary = useRunTrackerStore((state) => state.tracksSummary);
    const open = useRunTrackerStore((state) => state.open);
    const isMobile = useMediaQuery('(max-width: 48em)');
    return (
        <>
            <TrackList tracks={tracksSummary} />
            
            {isMobile &&  <NewTrackFab open={open} /> }
            
        </>
    );
}
