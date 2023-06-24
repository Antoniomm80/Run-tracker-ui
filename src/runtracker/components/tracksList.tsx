import {  ScrollArea, Container } from "@mantine/core";
import { TrackSummary } from "../domain/tracksummary";
import { TrackListItem } from "./tracklistitem";

interface TrackListProps {
    tracks: TrackSummary[];
}

export const TrackList: React.FC<TrackListProps> = (props) => { 
    return (
        <ScrollArea h={200}>
            <Container fluid>
                {props.tracks.map((track) => <TrackListItem track={track}/>)}
            </Container>
        </ScrollArea>
    );
};
