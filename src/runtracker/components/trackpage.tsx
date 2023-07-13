import { Button, Container, Group, LoadingOverlay, Modal, Space, TextInput } from "@mantine/core";
import { Time, TimeProps } from "../domain/time";
import { Track, TrackProps } from "../domain/track";
import { TrackCard } from "./trackcard";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { translate } from "react-i18nify";
import { TrackSummary } from "../domain/tracksummary";
import { pathService } from "../domain/trackservice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useForm, Resolver } from "react-hook-form";
import "./trackpage.css";
import timeService from "../domain/timeservice";

type FormValues = {
    trainingDate: string;
    durationString: string;
};

export interface TrackPageProps {
    trackSummary?: TrackSummary;
}

export function TrackPage(props: TrackPageProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [visible, { open: showOverlay, close: hideOverlay }] = useDisclosure(false);
    let { trackId } = useParams();
    const { isLoading, data } = useQuery(["track", trackId], () => pathService.findById(trackId || ""));

    const queryclient = useQueryClient();
    const {mutate} = useMutation((newTime: TimeProps) => timeService.createTime(trackId||"", newTime), {
        onSuccess: (savedTime) => {
            const currentPath: Track = queryclient.getQueryData(["track", trackId]) as Track;
            currentPath.times?.push(Time.of(savedTime));
            queryclient.setQueryData(["path", trackId], {...currentPath});
            //toastContext.showSuccessMessage(translate("newTime.saveSuccess"));            
            hideOverlay();
            close();
            
        },
        onError: () => {
            hideOverlay();
            //toastContext.showErrorMessage(translate("newTime.saveError"));
            close();
        },
    });

    const {
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
        setValue,
        trigger,
    } = useForm<FormValues>({ mode: "onBlur" });
    
    const calculateDuration = (duration: string): number => {
        var durationComponents = duration.split(":");
        return parseInt(durationComponents[0]) * 60 + parseInt(durationComponents[1]);
    };


    const onSubmit = handleSubmit((form:FormValues) => {
        showOverlay();
        const adaptedForm = {trainingDate:new Date(form.trainingDate), duration: calculateDuration(form.durationString)};
        mutate(adaptedForm);
    });
    const handleChange = (e: any) => {
        e.persist();
        setValue(e.target.name, e.target.value);
        trigger(e.target.name);
    };

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
                    <LoadingOverlay visible={visible} overlayBlur={2} />
                    <TextInput
                        label={translate("newTime.trainingDate")}
                        placeholder="mm:ss"
                        icon={<IconCalendar size="0.8rem" />}
                        type="date"
                        {...register("trainingDate", { required: true, onBlur: handleChange })}
                        aria-invalid={errors.trainingDate ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.trainingDate?.type === "required" && (
                        <small className="form-error" role="alert">
                            {translate("validation.mandatory")}
                        </small>
                    )}

                    <Space h="sm" />
                    <TextInput
                        label={translate("newTime.durationString")}
                        placeholder="mm:ss"
                        icon={<IconClock size="0.8rem" />}
                        {...register("durationString", {
                            required: true,
                            pattern: /^[0-5]?\d:[0-5]\d$/i,
                            onBlur: handleChange,
                        })}
                        aria-invalid={errors.durationString ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.durationString?.type === "required" && (
                        <small className="form-error" role="alert">
                            {translate("validation.mandatory")}
                        </small>
                    )}
                    {errors.durationString?.type === "pattern" && (
                        <small className="form-error" role="alert">
                            {translate("validation.timeFormat")}
                        </small>
                    )}
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
