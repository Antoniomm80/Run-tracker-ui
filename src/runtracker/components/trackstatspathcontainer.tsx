import StatsGraphContextManager from "./statsgraphcontextmanager";
import TrackStatsGraph from "./trackstatsgraph";

const TrackStatsGraphContainer: React.FC = () => {
    return (
        <StatsGraphContextManager>
            <TrackStatsGraph/>
        </StatsGraphContextManager>
    );
}
export default TrackStatsGraphContainer;