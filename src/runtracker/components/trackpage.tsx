import {Button, Container, Group, Modal, Space, TextInput} from "@mantine/core";
import {TimeProps} from "../domain/time";
import {TrackProps} from "../domain/track";
import {TrackCard} from "./trackcard";
import {useDisclosure} from "@mantine/hooks";
import {IconClock} from "@tabler/icons-react";
import {DateInput} from "@mantine/dates";
import {translate} from "react-i18nify";
import { TrackSummary } from "../domain/tracksummary";

export interface TrackPageProps {
    trackSummary?: TrackSummary;
}

export function TrackPage(props: TrackPageProps) {
    const [opened, {open, close}] = useDisclosure(false);
    if(props.trackSummary === undefined) return (<></>);
    return (
        <>
            <Container fluid>
                <TrackCard bestTime={props.trackSummary.bestTime} track={props.trackSummary} open={open}/>
            </Container>
            <Modal opened={opened} onClose={close} size="md" title={translate("newTime.title")} centered>
                <DateInput placeholder={translate("newTime.trainingDate")} label={translate("newTime.trainingDate")} withAsterisk/>
                <Space h="sm"/>
                <TextInput label={translate("newTime.durationString")} placeholder="mm:ss" icon={<IconClock size="0.8rem"/>} withAsterisk/>
                <Space h="lg"/>
                <Group position="right">
                    <Button>{translate("actions.save")}</Button>
                </Group>
            </Modal>
        </>
    );
}
