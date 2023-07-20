import {useMediaQuery} from "@mantine/hooks";
import {TrackListPage} from "./tracklistpage";
import {IconRun} from "@tabler/icons-react";
import "./mainsection.css"
import {Text} from "@mantine/core";

export function MainSection() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    if (!isMobile) {
        return (
            <>
                <div className="empty-icon-container-wrapper">
                    <div className="empty-icon-container">
                        <IconRun size="20rem" stroke="2"/>
                    </div>

                </div>
                <div className="main-text">
                    <Text>Selecciona una ruta</Text>
                </div>
            </>);
    }
    return <TrackListPage/>;
}