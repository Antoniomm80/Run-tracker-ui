import { Badge, Button, createStyles, Group, Paper, Progress, rem, Space, Text, ThemeIcon } from "@mantine/core";
import { IconClock, IconRun } from "@tabler/icons-react";
import { TimeProps } from "../domain/time";
import { TrackProps } from "../domain/track";
import timeUtils from "../utils/timeutils";
import { translate } from "react-i18nify";
import { TrackCardProps } from "./trackpage";
import "./trackcard.css";


const ICON_SIZE = rem(60);

const useStyles = createStyles((theme) => ({
    card: {
        position: "relative",
        overflow: "visible",
        padding: theme.spacing.xl,
        paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
    },

    icon: {
        position: "absolute",
        top: `calc(-${ICON_SIZE} / 3)`,
        left: `calc(50% - ${ICON_SIZE} / 2)`,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
}));

interface TrackCardProps {
    bestTime: TimeProps;
    track: TrackProps;
    open: () => void;
}

export function TrackCard(props: TrackCardProps) {
    const { classes } = useStyles();

    const buildBest = () => {
        if (props.bestTime) {
            return (
                <h2>
                    <span>{`${timeUtils.printTime(props.bestTime.duration)}`} </span>
                    <span>{`${timeUtils.formatDate(props.bestTime.trainingDate)}`}</span>
                </h2>
            );
        }
        return <></>;
    };

    return (
        <Paper radius="md" withBorder className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
            <div className="map-wrapper">
            <div className="map-container">
                <iframe src={props.track.pathToMap} width="100%" height="300px" title="map" frameBorder="0"/>
            </div>
            </div>
            <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
                <IconRun size="2rem" stroke={1.5} />
            </ThemeIcon>
            <Space h="lg" />
            <Text ta="center" fw={700} className={classes.title}>
                {props.track.name}
            </Text>
            <Text c="dimmed" ta="left" lineClamp={2}>
                {props.track.description}
            </Text>

            <Group position="apart" mt="xs">
                <Text fz="sm" color="dimmed">
                    Progress
                </Text>
                <Text fz="sm" color="dimmed">
                    62%
                </Text>
            </Group>

            <Progress value={62} mt={5} />

            <Group position="apart" mt="md">
                <Text fz="sm">{buildBest()}</Text>
                <Badge size="sm">4 days left</Badge>
                <Button leftIcon={<IconClock />} onClick={props.open}>
                    {translate("actions.add")}
                </Button>
            </Group>
        </Paper>
    );
}
