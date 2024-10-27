import {TimeProps} from "./time.ts";

export interface TrackSummaryProps {
    id: string;
    pathId: number;
    pathName: string;
    pathDistance: number;
    overallAverage: number;
    monthAverage: number;
    overallBest: number;
    monthBest: number;
    overallBestDate: Date;
    monthBestDate: Date;
    latestToBestTimespan: number;
}

export class TrackSummary implements TrackSummaryProps {
    private _id: string;
    private _pathId: number;
    private _pathName: string;
    private _pathDistance: number;
    private _overallAverage: number;
    private _monthAverage: number;
    private _overallBest: number;
    private _monthBest: number;
    private _overallBestDate: Date;
    private _monthBestDate: Date;
    private _latestToBestTimespan: number;


    constructor(path: TrackSummaryProps) {
        this._id = path.id;
        this._pathId = path.pathId;
        this._pathName = path.pathName;
        this._pathDistance = path.pathDistance;
        this._overallAverage = path.overallAverage;
        this._monthAverage = path.monthAverage;
        this._overallBest = path.overallBest;
        this._monthBest = path.monthBest;
        this._overallBestDate = path.overallBestDate;
        this._monthBestDate = path.monthBestDate;
        this._latestToBestTimespan = path.latestToBestTimespan;
    }

    public get id() {
        return this._id;
    }

    public get pathId() {
        return this._pathId;
    }

    public get pathName() {
        return this._pathName;
    }

    public get pathDistance() {
        return this._pathDistance;
    }

    public get overallAverage() {
        return this._overallAverage;
    }

    public get monthAverage() {
        return this._monthAverage;
    }

    public get overallBest() {
        return this._overallBest;
    }

    public get monthBest() {
        return this._monthBest;
    }

    public get overallBestDate() {
        return this._overallBestDate;
    }

    public get monthBestDate() {
        return this._monthBestDate;
    }

    public get latestToBestTimespan() {
        return this._latestToBestTimespan;
    }


    distanceInKms(): number {
        return this._pathDistance / 1000;
    }

    public get time(): TimeProps {
        return {duration: this._overallBest, trainingDate: this._overallBestDate};
    }
}
