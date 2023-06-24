import { Card, Flex, Group, Title,Text, ThemeIcon } from "@mantine/core";
import { TrackSummary, TrackSummaryProps } from "../domain/tracksummary";
import { translate } from "react-i18nify";
import timeUtils from "../utils/timeutils";
import "./tracklist.css";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { useState } from "react";

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
                sx={(theme) => ({ color: diferencia < 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
                size={38}
                radius="md"
            >
                <DiffIcon size="1.8rem" stroke={1.5} />
            </ThemeIcon>
            <Text>{`${diferencia > 0 ? "+" : ""}${diferencia}s`}</Text>
        </Flex>
    );
};

interface TrackListItemProps {
    track:TrackSummary;
}
export const TrackListItem: React.FC<TrackListItemProps> = ({track}) => {
    const [active, setActive] = useState(false);
    const prepareSecondaryText = (path: TrackSummary): string => {
        if (!path.durationBest || !path.trainingDateBest) {
            return `${path.distanceInKms()} kms`;
        }
        return `${path.distanceInKms()} ${translate("labels.kms")} - ${translate("labels.best")}: ${timeUtils.printTime(
            path.durationBest
        )} - ${timeUtils.formatDate(path.trainingDateBest)}`;
    };

    return (
        <Card withBorder key={track.id} mt={"xs"} onClick={() => setActive(!active)} sx={(theme) => ({ backgroundColor: active ? theme.colors.blue[2] : ''})}>
            <Group position={"apart"}>
                <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap" gap={"xs"}>
                    <Title order={5}>{track.name}</Title>
                    <Text c="dimmed">{prepareSecondaryText(track)}</Text>
                </Flex>
                <TimeRefDecorator track={track} />
            </Group>
        </Card>
    );
};
