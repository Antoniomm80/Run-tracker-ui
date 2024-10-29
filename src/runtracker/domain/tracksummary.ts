import {TimeProps} from "./time";

export interface TrackSummaryProps {
    id?: number;
    name: string;
    description: string;
    distance: number;
    durationBest: number;
    trainingDateBest: Date;
    durationLatest: number;
    trainingDateLatest: Date;
    latestToBestTimespan: number;
}

export class TrackSummary implements TrackSummaryProps {
    private _id?: number;
    private _name: string;
    private _description: string;
    private _distance: number;
    private _durationBest: number;
    private _trainingDateBest: Date;
    private _durationLatest: number;
    private _trainingDateLatest: Date;
    private _latestToBestTimespan: number;

    constructor(path: TrackSummaryProps) {
        this._id = path.id;
        this._name = path.name;
        this._description = path.description;
        this._distance = path.distance;
        this._durationBest = path.durationBest;
        this._trainingDateBest = path.trainingDateBest;
        this._durationLatest = path.durationLatest;
        this._trainingDateLatest = path.trainingDateLatest;
        this._latestToBestTimespan = path.latestToBestTimespan;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get description() {
        return this._description;
    }

    public get distance() {
        return this._distance;
    }

    public get durationBest() {
        return this._durationBest;
    }

    public get trainingDateBest() {
        return this._trainingDateBest;
    }

    public get durationLatest() {
        return this._durationLatest;
    }

    public get trainingDateLatest() {
        return this._trainingDateLatest;
    }

    public get latestToBestTimespan() {
        return this._latestToBestTimespan;
    }

    public get bestTime(): TimeProps {
        return {
            duration: this._durationBest,
            trainingDate: this._trainingDateBest,
        }
    }

    distanceInKms(): number {
        return this.distance / 1000;
    }
}
