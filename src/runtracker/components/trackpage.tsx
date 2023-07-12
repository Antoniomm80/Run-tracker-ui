import { Button, Container, Group, Modal, Space, TextInput } from "@mantine/core";
import { TimeProps } from "../domain/time";
import { Track, TrackProps } from "../domain/track";
import { TrackCard } from "./trackcard";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { translate } from "react-i18nify";
import { TrackSummary } from "../domain/tracksummary";
import { pathService } from "../domain/trackservice";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useForm, Resolver } from "react-hook-form";

type FormValues = {
    trainingDate: string;
    duration: string;
};



export interface TrackPageProps {
    trackSummary?: TrackSummary;
}

export function TrackPage(props: TrackPageProps) {
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
    const onSubmit = handleSubmit((data) => alert(data.duration));
    const [opened, { open, close }] = useDisclosure(false);
    let { trackId } = useParams();
    const { isLoading, data } = useQuery(["path", trackId], () => pathService.findById(trackId || ""));
    if (isLoading) {
        return <></>;
    }
    const track = new Track(data as TrackProps);
    return (
        <>
            <Container fluid>
                <TrackCard bestTime={props.trackSummary.bestTime} track={track} open={open} />
            </Container>
            <Modal opened={opened} onClose={close} size="md" title={translate("newTime.title")} centered>
                <form onSubmit={onSubmit}>
                <TextInput
                        label={translate("newTime.durationString")}
                        placeholder="mm:ss"
                        icon={<IconCalendar size="0.8rem" />}
                        type="date"
                        {...register("trainingDate",{ required: true})}
                        aria-invalid={errors.trainingDate ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.trainingDate && <span>{translate("validation.mandatory")}</span>}
                    <Space h="sm" />
                    <TextInput
                        label={translate("newTime.durationString")}
                        placeholder="mm:ss"
                        icon={<IconClock size="0.8rem" />}
                        {...register("duration",{ required: true })}
                        aria-invalid={errors.duration ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.duration && <span>{translate("validation.mandatory")}</span>}
                    <Space h="lg" />
                    <Group position="right">
                        <Button onClick={() => onSubmit()}>{translate("actions.save")}</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
