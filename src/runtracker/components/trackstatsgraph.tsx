import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import timeService from "../domain/timeservice";
import MonthSelector from "./monthselector";
import {StatsGraphContextContent} from "./statsgraphcontext";
import {StatsGraphContext} from "./statsgraphcontextmanager";
import BarGraph from "./bargraph";


const TrackStatsGraph: React.FC = () => {
    const statsGraphContext: StatsGraphContextContent = useContext(StatsGraphContext);

    const {
        isLoading,
        data
    } = useQuery(["stats", statsGraphContext.getMonth(), statsGraphContext.getYear()], () => timeService.getMonthStats(statsGraphContext.getMonth(), statsGraphContext.getYear()));


    if (isLoading) {
        return (
            <div className="path-list">
                Loading...
            </div>
        );
    }

    return (<div className="path-list">
        <BarGraph data={data || []}/>
        <MonthSelector/>
    </div>);
}
export default TrackStatsGraph;