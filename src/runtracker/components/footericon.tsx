import { ActionIcon } from "@mantine/core";
import { IconChartBar, IconRun } from "@tabler/icons-react";

type FooterIconProps = {
    onClick: () => void;
    variant: string;
    type: "run" | "chart";
}

export function FooterIcon(props:FooterIconProps) {
    return (
        <ActionIcon color="blue" size="xl" variant={props.variant} onClick={props.onClick}>
            {props.type === "run" && <IconRun size="2rem" />}
            {props.type === "chart" && <IconChartBar size="2rem" />}
        </ActionIcon>
    );
}
