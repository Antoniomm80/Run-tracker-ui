import {
    ActionIcon,
    AppShell,
    Badge,
    Button,
    Divider,
    Flex,
    Footer,
    Group,
    Header,
    LoadingOverlay,
    MediaQuery,
    Modal,
    Navbar,
    ScrollArea,
    Space,
    Text,
    TextInput,
    Textarea,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";

import { TrackPage } from "./trackpage";
import { TrackList } from "./tracksList";
import {
    IconCaretLeft,
    IconChevronLeft,
    IconClock,
    IconMoon,
    IconMoonStars,
    IconPlus,
    IconSquarePlus,
    IconSun,
} from "@tabler/icons-react";
import { NewTrackFab } from "./newTrackFab";
import { useDisclosure } from "@mantine/hooks";
import { translate } from "react-i18nify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pathService } from "../domain/trackservice";
import { TrackSummary } from "../domain/tracksummary";
import { useRunTrackerStore } from "../../App";
import { Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Track, TrackProps } from "../domain/track";
import { APP_PATH } from "../../config";

type NewTrackFormValues = {
    name: string;
    description: string;
    pathToMap?: string;
    distance: number;
};

export default function RunTrackerAppShell() {
    const queryclient = useQueryClient();
    const { mutate } = useMutation((newPath: TrackProps) => pathService.createPath(newPath), {
        onSuccess: (savedPath: TrackProps) => {
            const paths: TrackProps[] = queryclient.getQueryData(["tracks"]) as TrackProps[];
            paths?.push(savedPath);
            queryclient.setQueryData(["tracks"], [...paths]);
            hideOverlay();
            close();
        },
        onError: () => {
            hideOverlay();
            //toastContext.showErrorMessage(translate("newTime.saveError"));
        },
    });

    const {
        register,
        formState: { errors, isDirty, isValid },
        handleSubmit,
        setValue,
        trigger,
    } = useForm<NewTrackFormValues>({ mode: "onBlur" });
    const [visible, { open: showOverlay, close: hideOverlay }] = useDisclosure(false);
    const navigate = useNavigate();
    const handleOnClick = () => navigate("");
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const setTracksSummary = useRunTrackerStore((state) => state.setTracksSummary);
    const setOpen = useRunTrackerStore((state) => state.setOpen);
    const { isLoading, data } = useQuery(["paths"], pathService.findAll);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";
    setOpen(open);

    const onSubmit = handleSubmit((form: NewTrackFormValues) => {
        showOverlay();
        mutate(Track.ofProps(form));
    });
    const handleChange = (e: any) => {
        e.persist();
        setValue(e.target.name, e.target.value);
        trigger(e.target.name);
    };

    if (isLoading) {
        return (
            <div>
                <span>Loading</span>
            </div>
        );
    }
    const tracks = data?.map((p) => new TrackSummary(p)) || [];
    setTracksSummary(tracks);

    const leftPlus = (
        <ActionIcon size="xs" color="blue" radius="xl" variant="transparent">
            <IconPlus color="white" />
        </ActionIcon>
    );

    return (
        <>
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                    },
                }}
                navbarOffsetBreakpoint="sm"
                asideOffsetBreakpoint="sm"
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" width={{ md: 300, lg: 400 }} hidden={true}>
                        <Navbar.Section mt="xs">
                            <Group spacing="xs" position="center">
                                <Badge variant="filled" onClick={open} size="lg" leftSection={leftPlus}>
                                    {translate("newPath.action")}
                                </Badge>
                            </Group>
                        </Navbar.Section>
                        <Divider my="sm" />
                        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                            <TrackList tracks={tracks} navigation />
                        </Navbar.Section>
                    </Navbar>
                }
                footer={
                    <Footer height={60} p="md">
                        Application footer
                    </Footer>
                }
                header={
                    <Header height={{ base: 50, md: 70 }} p="md">
                        <Flex gap="md" justify="space-between" align="center" direction="row" wrap="nowrap">
                            <ActionIcon color="blue" size="lg" variant="transparent" onClick={handleOnClick}>
                                <IconChevronLeft size="1.1rem" />
                            </ActionIcon>
                            <Text>Application header</Text>
                            <ActionIcon
                                variant="outline"
                                color={dark ? "yellow" : "blue"}
                                onClick={() => toggleColorScheme()}
                                title="Toggle color scheme"
                            >
                                {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
                            </ActionIcon>
                        </Flex>
                    </Header>
                }
            >
                <div id="detail">
                    <Outlet />
                </div>
            </AppShell>
            <Modal opened={opened} onClose={close} size="md" title={translate("newPath.title")} centered>
                <LoadingOverlay visible={visible} overlayBlur={2} />
                <form onSubmit={onSubmit}>
                    <TextInput
                        label={translate("newPath.name")}
                        {...register("name", { required: true, onBlur: handleChange })}
                        aria-invalid={errors.name ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.name?.type === "required" && (
                        <small className="form-error" role="alert">
                            {translate("validation.mandatory")}
                        </small>
                    )}
                    <Space h="sm" />
                    <TextInput
                        label={translate("newPath.distance")}
                        {...register("distance", { required: true, onBlur: handleChange })}
                        aria-invalid={errors.distance ? "true" : "false"}
                        withAsterisk
                    />
                    {errors.distance?.type === "required" && (
                        <small className="form-error" role="alert">
                            {translate("validation.mandatory")}
                        </small>
                    )}
                    <Space h="sm" />
                    <TextInput
                        label={translate("newPath.pathToMap")}                        
                        {...register("pathToMap", { onBlur: handleChange })}
                    />
                    <Space h="sm" />
                    <Textarea
                        label={translate("newPath.description")}
                        withAsterisk
                        {...register("description", { required: true, onBlur: handleChange })}
                        aria-invalid={errors.description ? "true" : "false"}
                    />
                    {errors.description?.type === "required" && (
                        <small className="form-error" role="alert">
                            {translate("validation.mandatory")}
                        </small>
                    )}
                    <Space h="lg" />
                    <Group position="right">
                        <Button disabled={!isDirty || !isValid} type="submit">
                            {translate("actions.save")}
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
