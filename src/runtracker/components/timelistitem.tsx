import { Card, Grid, Flex, Title, Text } from "@mantine/core";
import { TimeProps } from "../domain/time";
import { translate } from "react-i18nify";
import timeUtils from "../utils/timeutils";

type TimeListItemProps = {
    time: TimeProps;
    distance: number;
};

export function TimeListItem(props: TimeListItemProps) {
    return (
        <Card withBorder key={`time-${props.time.id}`} mt={"xs"}>
            <Flex justify="flex-start" align="flex-start" direction="column" wrap="wrap" gap={"xs"} rowGap="xs">
                <Title order={6}>
                    {translate("labels.duration")}: <strong>{timeUtils.printTime(props.time.duration)}</strong>
                </Title>
                <Text c="dimmed">
                    {translate("labels.pace")}:{" "}
                    <strong>{timeUtils.calculateSpeed(props.time.duration, props.distance)}</strong>
                </Text>
                <Text c="dimmed">{timeUtils.formatDate(props.time.trainingDate)}</Text>
            </Flex>
        </Card>
    );
}
