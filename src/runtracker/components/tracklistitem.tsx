import {Card, Flex, Grid, Text, ThemeIcon, Title} from "@mantine/core";
import {TrackSummary} from "../domain/tracksummary";
import {translate} from "react-i18nify";
import timeUtils from "../utils/timeutils";
import "./tracklist.css";
import {IconArrowDownRight, IconArrowUpRight} from "@tabler/icons-react";
import {useRunTrackerStore} from "../../App";

interface TimeRefDecoratorProps {
    track: TrackSummary;
}

const TimeRefDecorator: React.FC<TimeRefDecoratorProps> = (props) => {
    if (!props.track.durationLatest || !props.track.durationBest) {
        return <></>;
    }
    const diferencia = props.track.durationLatest - props.track.durationBest;
    const DiffIcon = diferencia < 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
        <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap" gap={'xs'}>
            <ThemeIcon
                color="gray"
                variant="light"
                sx={(theme) => ({color: diferencia < 0 ? theme.colors.teal[6] : theme.colors.red[6]})}
                size={38}
                radius="md"
            >
                <DiffIcon size="1.8rem" stroke={1.5}/>
            </ThemeIcon>
            <Text>{`${diferencia > 0 ? "+" : ""}${diferencia}s`}</Text>
        </Flex>
    );
};

interface TrackListItemProps {
    track: TrackSummary;
}

export const TrackListItem: React.FC<TrackListItemProps> = ({track}) => {
    const selectedTrack = useRunTrackerStore((state) => state.selectedTrack);
    const setSelectedTrack = useRunTrackerStore((state) => state.setSelectedTrack)
    const active = track.id === selectedTrack;
    const prepareSecondaryText = (path: TrackSummary): string => {
        if (!path.durationBest || !path.trainingDateBest) {
            return `${path.distanceInKms()} kms`;
        }
        return `${path.distanceInKms()} ${translate("labels.kms")} - ${translate("labels.best")}: ${timeUtils.printTime(
            path.durationBest
        )} - ${timeUtils.formatDate(path.trainingDateBest)}`;
    };

    return (
        <Card withBorder key={track.id} mt={"xs"} onClick={() => setSelectedTrack(track.id || -1)}
              sx={(theme) => ({backgroundColor: active ? theme.colors.blue[3] : ''})}>
            <Grid gutter="0" justify="space-around">
                <Grid.Col span="content">
                    <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap" gap={"xs"}>
                        <Title order={5}>{track.name}</Title>
                        <Text c="dimmed">{prepareSecondaryText(track)}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                    <TimeRefDecorator track={track}/>
                </Grid.Col>
            </Grid>
        </Card>
    );
};
