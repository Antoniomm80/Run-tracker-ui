import {Card, Flex, Grid, Space, Text, ThemeIcon, Title, useMantineTheme} from "@mantine/core";
import {TrackSummary} from "../domain/tracksummary";
import timeUtils from "../utils/timeutils";
import "./tracklist.css";
import {IconArrowDownRight, IconArrowUpRight, IconCalendar, IconRun, IconTrophy} from "@tabler/icons-react";
import {useRunTrackerStore} from "../../App";
import {useNavigate} from "react-router-dom";

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
    const theme = useMantineTheme();
    const selectedTrack = useRunTrackerStore((state) => state.selectedTrack);
    const navigate = useNavigate();
    const handleOnClick = () => navigate('/tracks/' + track.id);
    const active = track.id === selectedTrack;
    const prepareDistanceText = (path: TrackSummary): string => {
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
        <Card withBorder key={track.id} mt={"xs"} onClick={handleOnClick}
              sx={(theme) => ({backgroundColor: active ? theme.colors.blue[5] : ''})}>
            <Grid gutter="0" justify="space-around">
                <Grid.Col span={11}>
                    <Title order={active ? 5 : 6}>{track.name}</Title>
                    <Space h={"xs"}/>
                    <Flex justify="flex-start" align="center" direction="row" wrap="wrap" gap={"xs"} rowGap="xs">
                        <IconRun size="1.4rem" stroke={1.4} color={active ? theme.colors.gray[0] : theme.colors.orange[7]}/>
                        <Text c={active ? "gray.0" : "dimmed"}>
                            {prepareDistanceText(track)}
                        </Text>
                        <IconTrophy size="1.4rem" stroke={1.4} color={active ? theme.colors.gray[0] : theme.colors.yellow[4]}/>
                        <Text c={active ? "gray.0" : "dimmed"}>
                            {prepareTimeText(track)}
                        </Text>
                        <IconCalendar size="1.4rem" stroke={1.4} color={active ? theme.colors.gray[0] : theme.colors.red[9]}/>
                        <Text c={active ? "gray.0" : "dimmed"}>
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
