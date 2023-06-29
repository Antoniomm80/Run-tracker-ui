import { Button, Container, Group, Modal } from "@mantine/core";
import { TimeProps } from "../domain/time";
import { TrackProps } from "../domain/track";
import { TrackCard } from "./trackcard";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

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
            <Modal opened={opened} onClose={close} size="auto" title="Modal size auto" centered>
              

        

              <Group mt="xl">
                <Button variant="outline" >
                  Add badge
                </Button>
                <Button variant="outline" >
                  Remove badge
                </Button>
              </Group>
            
            <Group position="center">
              <Button onClick={open}>Open modal</Button>
            </Group>
                  </Modal>
            
        </>
    );
}
