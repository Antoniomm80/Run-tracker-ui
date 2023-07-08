import { ActionIcon, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import "./newTrackFab.css";


interface NewTrackFabProps {
    open:() => void;
    className?: string;
}
export function NewTrackFab(props: NewTrackFabProps){
    const theme = useMantineTheme();
    const styles = {
        "--main-fab-color": theme.colors.blue[6]
    };
    return (
        <div className={`${props.className} fab-button`} style={styles as React.CSSProperties}>
             <ActionIcon onClick={props.open}>
                <IconPlus size="2rem" stroke={2} color="white"/>
            </ActionIcon>
        </div>
    );
}