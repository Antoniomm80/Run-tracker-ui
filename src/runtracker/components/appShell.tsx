import { useState } from "react";
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
import { TrackSummary } from "../domain/tracksummary";

import { TrackPage } from "./trackpage";
import { TrackList } from "./tracksList";
import { IconClock, IconMoon, IconSquarePlus } from "@tabler/icons-react";
import { NewTrackFab } from "./newTrackFab";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { translate } from "react-i18nify";

export default function RunTrackerAppShell() {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    const tracks: TrackSummary[] = [];
    tracks.push(
        TrackSummary.ofProps({
            id: 1,
            name: "Track 1",
            distance: 12800,
            description: "Track 1 description",
            durationBest: 5400,
            trainingDateBest: new Date(),
            durationLatest: 5800,
            trainingDateLatest: new Date(),
        })
    );

    tracks.push(
        TrackSummary.ofProps({
            id: 2,
            name: "Track 2",
            distance: 3400,
            description: "Track 2 description",
            durationBest: 5400,
            trainingDateBest: new Date(),
            durationLatest: 5800,
            trainingDateLatest: new Date(),
        })
    );

    tracks.push(
        TrackSummary.ofProps({
            id: 3,
            name: "Track 3",
            distance: 3000,
            description: "Track 3 description",
            durationBest: 300,
            trainingDateBest: new Date(),
            durationLatest: 199,
            trainingDateLatest: new Date(),
        })
    );

    const track = {
        id: 1,
        name: "Costera norte - Odiseo",
        description:
            "Este es un viaje cruzando los himalayas, entre la india y nepal en busca de nuestra flor de loto. Este es un viaje cruzando los himalayas, entre la india y nepal en busca de nuestra flor de loto. Este es un viaje cruzando los himalayas, entre la india y nepal en busca de nuestra flor de loto. Este es un viaje cruzando los himalayas, entre la india y nepal en busca de nuestra flor de loto. Este es un viaje cruzando los himalayas, entre la india y nepal en busca de nuestra flor de loto. Este es un viaje cruzando los himalayas, entre la india y nepal en busca de nuestra flor de loto",
        distance: 10000,
    };

    const time = {
        duration: 5430,
        trainingDate: new Date(),
    };
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
                        <TrackPage track={track} bestTime={time} />
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
