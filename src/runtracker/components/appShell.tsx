import { useState } from "react";
import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger, useMantineTheme } from "@mantine/core";
import { TrackSummary } from "../domain/tracksummary";

import { TrackPage } from "./trackpage";
import { TrackList } from "./tracksList";

export default function RunTrackerAppShell() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const tracks: TrackSummary[] = [];
    tracks.push(
        TrackSummary.ofProps({
            id: 1,
            name: "Track 1",
            distance: 1000,
            description: "Track 1 description",
            durationBest: 100,
            trainingDateBest: new Date(),
            durationLatest: 199,
            trainingDateLatest: new Date(),
        })
    );

    tracks.push(
        TrackSummary.ofProps({
            id: 2,
            name: "Track 2",
            distance: 2000,
            description: "Track 2 description",
            durationBest: 200,
            trainingDateBest: new Date(),
            durationLatest: 2021,
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
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" width={{ md: 300, lg: 400 }} hidden={!opened}>
                    <TrackList tracks={tracks} />
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
            <TrackPage track={track} bestTime={time} />
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <TrackList tracks={tracks} />                
            </MediaQuery>
        </AppShell>
    );
}
