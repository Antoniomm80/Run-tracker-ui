import {Container} from "@mantine/core";
import {TrackSummary} from "../domain/tracksummary";
import {TrackListItem} from "./tracklistitem";

interface TrackListProps {
    tracks: TrackSummary[];
    navigation?: boolean;
}

export const TrackList: React.FC<TrackListProps> = (props) => {
    if (!props.navigation) {
        return (
            <Container fluid>
                {props.tracks.map((track) => (
                    <TrackListItem key={track.id} track={track} navigation={props.navigation}/>
                ))}
            </Container>
        );
    }
    return (
        <>
            {props.tracks.map((track) => (
                <TrackListItem key={track.id} track={track} navigation={props.navigation}/>
            ))}
        </>
    );
};
