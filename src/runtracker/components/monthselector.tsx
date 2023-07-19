import {IconButton} from "@material-ui/core";
import {useContext} from "react";
import {StatsGraphContextContent} from "./statsgraphcontext";
import {StatsGraphContext} from "./statsgraphcontextmanager";

import { ActionIcon } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "./monthselector.css";

const MonthSelector: React.FC = () => {
    const statsGraphContext: StatsGraphContextContent = useContext(StatsGraphContext);
    return (
        <div className="month-selector">
            <ActionIcon onClick={() => statsGraphContext.substractMonth()}>
                <IconChevronLeft/>
            </ActionIcon>
            {statsGraphContext.getMonthLabel()}
            <ActionIcon onClick={() => statsGraphContext.addMonth()}>
                <IconChevronRight/>
            </ActionIcon>
        </div>
    );
}
export default MonthSelector;