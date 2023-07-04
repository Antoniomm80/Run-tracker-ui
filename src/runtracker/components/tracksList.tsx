import { ScrollArea, Container, Affix, Button, rem, MediaQuery } from "@mantine/core";
import { TrackSummary } from "../domain/tracksummary";
import { TrackListItem } from "./tracklistitem";
import { IconArrowUp } from "@tabler/icons-react";

interface TrackListProps {
    tracks: TrackSummary[];
}

export const TrackList: React.FC<TrackListProps> = (props) => {
    return (
        <ScrollArea h={200}>
            <Container fluid>
                {props.tracks.map((track) => (
                    <TrackListItem track={track} />
                ))}
            </Container>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <>
                    <Affix position={{ bottom: rem(20), right: rem(20) }}>
                        <Button
                            leftIcon={<IconArrowUp size="1rem" />}
                            onClick={() => {
                                return null;
                            }}
                        >
                            Perrete
                        </Button>
                    </Affix>
                </>
            </MediaQuery>
        </ScrollArea>
    );
};
