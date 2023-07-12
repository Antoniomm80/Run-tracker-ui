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
import "./trackpage.css";

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
        formState: { errors, isDirty, isValid },
        handleSubmit,
        setValue,
        trigger
    } = useForm<FormValues>({mode:"onBlur"});
    const onSubmit = handleSubmit((data) => alert(data.duration));
    const handleChange = (e:any) => {
        e.persist();
        setValue(e.target.name, e.target.value);
        trigger(e.target.name);
      };
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
                        {...register("trainingDate", { required: true,onBlur:handleChange })}
                        aria-invalid={errors.trainingDate ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.trainingDate?.type === "required" && <small className="form-error" role="alert">{translate("validation.mandatory")}</small>}
                    
                    <Space h="sm" />
                    <TextInput
                        label={translate("newTime.durationString")}
                        placeholder="mm:ss"
                        icon={<IconClock size="0.8rem" />}
                        {...register("duration", { required: true,pattern:/^[0-5]?\d:[0-5]\d$/i,onBlur:handleChange })}
                        aria-invalid={errors.duration ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.duration?.type === "required" && <small className="form-error" role="alert">{translate("validation.mandatory")}</small>}
                    {errors.duration?.type === "pattern" && <small className="form-error" role="alert">{translate("validation.timeFormat")}</small>}
                    <Space h="lg" />
                    <Group position="right">
                        <Button type="submit" disabled={!isDirty || !isValid}>
                            {translate("actions.save")}
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
