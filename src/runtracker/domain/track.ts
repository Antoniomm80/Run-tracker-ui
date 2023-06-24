import { TimeProps } from "./time";

export interface TrackProps {
    id?: number;
    name: string;
    description: string;
    distance: number;
    pathToMap?: string;
    times?: TimeProps[];
    distanceInKms?: () => Number;
}

export class Track implements TrackProps {
    private _id?: number;
    private _name: string;
    private _description: string;
    private _distance: number;
    private _pathToMap?: string;
    private _times?: TimeProps[];

    constructor(path: TrackProps) {
        this._id = path.id;
        this._name = path.name;
        this._description = path.description;
        this._distance = path.distance;
        this._pathToMap = path.pathToMap;
        this._times = path.times;
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

    public get pathToMap() {
        return this._pathToMap;
    }

    public get times() {
        return this._times;
    }

    distanceInKms(): Number {
        return this.distance / 1000;
    }

    static ofProps(path: TrackProps) {
        return new Track(path);
    }

    static empty(): Track {
        return new Track({ name: "", description: "", distance: 0 });
    }
}
