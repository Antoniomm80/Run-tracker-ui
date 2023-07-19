import { useMediaQuery } from "@mantine/hooks";
import { TrackListPage } from "./tracklistpage";
import { IconRun } from "@tabler/icons-react";

export function MainSection(){
    const isMobile = useMediaQuery('(max-width: 48em)');
    if(!isMobile){
        return <>
            <IconRun size="20rem" />
        </>;
    }
    return <TrackListPage/>;
}