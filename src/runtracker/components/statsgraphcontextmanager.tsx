import React, {useState} from "react";
import {StatsGraphContextImpl} from "./statsgraphcontext";


export const StatsGraphContext = React.createContext(null as any as StatsGraphContextImpl);


const StatsGraphContextManager: React.FC<React.PropsWithChildren> = (props) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const context = new StatsGraphContextImpl(currentDate, setCurrentDate);

    return (
        <StatsGraphContext.Provider value={context}>{props.children}</StatsGraphContext.Provider>
    );
};
export default StatsGraphContextManager;