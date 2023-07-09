import {Card, Flex, Grid, Space, Text, ThemeIcon, Title} from "@mantine/core";
import {TrackSummary} from "../domain/tracksummary";
import {translate} from "react-i18nify";
import timeUtils from "../utils/timeutils";
import "./tracklist.css";
import {IconArrowDownRight, IconArrowUpRight, IconClock, IconTrophy, IconRun} from "@tabler/icons-react";
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
                size={28}
                radius="md"
            >
                <DiffIcon size="1.25rem" stroke={1.25}/>
            </ThemeIcon>
            <Text fz="sm">{`${diferencia > 0 ? "+" : ""}${diferencia}s`}</Text>
        </Flex>
    );
};

interface TrackListItemProps {
    track: TrackSummary;
}

export const TrackListItem: React.FC<TrackListItemProps> = ({track}) => {
    const selectedTrack = useRunTrackerStore((state) => state.selectedTrack);    
    const setSelectedTrack = useRunTrackerStore((state) => state.setSelectedTrack);
    const active = track.id === selectedTrack;
    const prepareDistanceText= (path: TrackSummary): string => {
        return ` ${path.distanceInKms()} kms`;
    }
    const prepareTimeText = (path: TrackSummary): string => {
        if (!path.durationBest) {
            return "";
        }
        return ` ${timeUtils.printTime(path.durationBest)}`;
    };

    const prepareDateText = (path: TrackSummary): string => {
        if (!path.trainingDateBest) {
            return "";
        }
        return ` ${timeUtils.formatDate(path.trainingDateBest)}`;
    };

    return (
        <Card withBorder key={track.id} mt={"xs"} onClick={() => {            
            setSelectedTrack(track.id || -1);
            }
            }
              sx={(theme) => ({backgroundColor: active ? theme.colors.blue[3] : ''})}>
            <Grid gutter="0" justify="space-around">
                <Grid.Col span={11}>
                    <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap" gap={"xs"} rowGap="xs">
                        <Title order={6}>{track.name}</Title>                        
                        <Text c="dimmed">
                            <IconRun size="1.25rem" stroke={1.4}/>
                            {prepareDistanceText(track)}
                        </Text>
                        <Text c="dimmed">
                            <IconTrophy size="1.25rem" stroke={1.4}/>
                            {prepareTimeText(track)}
                            <IconClock size="1.25rem" stroke={1.4}/>
                            {prepareDateText(track)}
                        </Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={1}>
                    <TimeRefDecorator track={track}/>
                </Grid.Col>
            </Grid>
        </Card>
    );
};
