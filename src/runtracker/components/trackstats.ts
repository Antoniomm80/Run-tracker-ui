export interface TrackStatsProps{
    pathId: number;
    name:string;
    times: number;
    totalDuration: number;
    totalDistance: number;
}
export class TrackProps implements TrackStatsProps{
    pathId: number;
    name:string;
    times: number;
    totalDuration: number;
    totalDistance: number;

    constructor(path: TrackStatsProps) {
        this.pathId = path.pathId;
        this.name = path.name;
        this.times = path.times;
        this.totalDuration = path.totalDuration;
        this.totalDistance = path.totalDistance;        
    }

    static ofProps(path:TrackStatsProps){
        return new TrackProps(path);
    }

    static empty():TrackProps{
        return {pathId:0,name:'',times:0,totalDuration:0,totalDistance:0};
    }
}
