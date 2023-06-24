export interface TimeProps{
    id?:number;
    duration:number;
    trainingDate:Date;
}

export class Time implements TimeProps{
    private _id?:number;
    private _duration:number;
    private _trainingDate:Date;

    private constructor(time: TimeProps) {
        this._id = time.id;
        this._duration = time.duration;
        this._trainingDate = time.trainingDate;        
    }

    public get id(){
        return this._id;
    }

    public get duration(){
        return this._duration;
    }

    public get trainingDate(){
        return this._trainingDate;
    }

    static of(time:TimeProps){
        return new Time(time);
    }

    static empty():Time{
        return Time.of({duration:0,trainingDate:new Date()});
    }
}