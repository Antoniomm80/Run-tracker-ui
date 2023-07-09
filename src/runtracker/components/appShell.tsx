import {
    ActionIcon,
    AppShell,
    Button,
    Divider,
    Footer,
    Group,
    Header,
    MediaQuery,
    Modal,
    Navbar,
    ScrollArea,
    Space,
    Text,
    TextInput,
    Textarea,
    useMantineTheme,
} from "@mantine/core";


import { TrackPage } from "./trackpage";
import { TrackList } from "./tracksList";
import { IconClock, IconMoon, IconSquarePlus } from "@tabler/icons-react";
import { NewTrackFab } from "./newTrackFab";
import { useDisclosure } from "@mantine/hooks";
import { translate } from "react-i18nify";
import { useQuery } from "@tanstack/react-query";
import { pathService } from "../domain/trackservice";
import { TrackSummary } from "../domain/tracksummary";
import { useRunTrackerStore } from "../../App";

export default function RunTrackerAppShell() {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const setSelectedTrack = useRunTrackerStore((state) => state.setSelectedTrack);
    const setTracksSummary = useRunTrackerStore((state) => state.setTracksSummary);
    const getSelectedTrack = useRunTrackerStore((state) => state.getSelectedTrack);
    const selectedTrack = useRunTrackerStore((state) => state.selectedTrack);
    const { isLoading, data } = useQuery(["paths"], pathService.findAll);

    
    if (isLoading) {
        return (
            <div>
                <span>Loading</span>
            </div>
        );
    }
    const tracks = data?.map(p => new TrackSummary(p)) || [];
    setTracksSummary(tracks);
    
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
                            <Group spacing="xs" position="right">
                                <ActionIcon color="blue" size="lg" variant="transparent" onClick={open}>
                                    <IconSquarePlus size="1.625rem" />
                                </ActionIcon>
                                <ActionIcon color="blue" size="lg" variant="transparent">
                                    <IconMoon size="1.625rem" />
                                </ActionIcon>
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
                        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                            <Text>Application header</Text>
                        </div>
                    </Header>
                }
            >
                <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                    <div>
                        <TrackPage trackSummary={getSelectedTrack()} />
                    </div>
                </MediaQuery>
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <div>
                        <TrackList tracks={tracks} />
                        <NewTrackFab open={open} />
                    </div>
                </MediaQuery>
            </AppShell>
            <Modal opened={opened} onClose={close} size="md" title={translate("newPath.title")} centered>
                <TextInput label={translate("newPath.name")} withAsterisk />
                <Space h="sm" />
                <TextInput label={translate("newPath.distance")} withAsterisk />
                <Space h="sm" />
                <TextInput label={translate("newPath.pathToMap")} withAsterisk />
                <Space h="sm" />
                <Textarea label={translate("newPath.description")} />
                <Space h="lg" />
                <Group position="right">
                    <Button>{translate("actions.save")}</Button>
                </Group>
            </Modal>
        </>
    );
}
