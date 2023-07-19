import React, {PropsWithChildren, useState} from "react";
import {StatsGraphContextImpl} from "./statsgraphcontext";

export interface StatsGraphContextManagerProps extends PropsWithChildren<any> {
}

export const StatsGraphContext = React.createContext(null as any as StatsGraphContextImpl);

const StatsGraphContextManager: React.FC = (props) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const context = new StatsGraphContextImpl(currentDate, setCurrentDate);

    return (
        <StatsGraphContext.Provider value={context}>{props.children}</StatsGraphContext.Provider>
    );
};
export default StatsGraphContextManager;