import {Card, Flex, Grid, Text, Title} from "@mantine/core";
import {TimeProps} from "../domain/time";
import {translate} from "react-i18nify";
import timeUtils from "../utils/timeutils";
import {IconCalendar} from "@tabler/icons-react";

type TimeListItemProps = {
    time: TimeProps;
    distance: number;
};

export function TimeListItem(props: TimeListItemProps) {
    return (
        <Card withBorder key={`time-${props.time.id}`} mt={"xs"}>
            <Grid gutter="xs">
                <Grid.Col span={12}>
                    <Title order={4}>
                        {translate("labels.duration")}: {timeUtils.printTime(props.time.duration)}
                    </Title>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text fz="md" c="gray.6">
                        {translate("labels.pace")}:{" "}
                        <strong>{timeUtils.calculateSpeed(props.time.duration, props.distance)}</strong>
                    </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Flex justify="flex-start" align="flex-start" direction="row" wrap="wrap" gap={"xs"} rowGap="xs">
                        <IconCalendar size="1.4rem" stroke={1.4}/>
                        <Text fz="md" c="gray.5">{timeUtils.formatDate(props.time.trainingDate)}</Text>
                    </Flex>
                </Grid.Col>
            </Grid>
        </Card>
    );
}
