import { Button, Container, Group, Modal, Space, TextInput } from "@mantine/core";
import { TimeProps } from "../domain/time";
import { TrackProps } from "../domain/track";
import { TrackCard } from "./trackcard";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconAt, IconClock } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { translate } from "react-i18nify";

export interface TrackPageProps {
    bestTime: TimeProps;
    track: TrackProps;
}

export function TrackPage(props: TrackPageProps) {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Container fluid>
                <TrackCard bestTime={props.bestTime} track={props.track} open={open} />
            </Container>
            <Modal opened={opened} onClose={close} size="md" title={translate("newTime.title")} centered>
                <DateInput placeholder={translate("newTime.trainingDate")} label={translate("newTime.trainingDate")} withAsterisk />
                <Space h="sm" />
                <TextInput label={translate("newTime.durationString")} placeholder="mm:ss" icon={<IconClock size="0.8rem"/>} withAsterisk/>
                <Space h="lg" />
                <Group position="right">
                    <Button>{translate("actions.save")}</Button>
                </Group>
            </Modal>
        </>
    );
}
