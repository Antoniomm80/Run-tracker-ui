import {TrackProps} from "../domain/track";
import {Time, TimeProps} from "../domain/time";


const padLeft = (n: number): string => {
    return ("00" + n).slice(-2);
}

const renderTime = (minutes: number, seconds: number): string => {
    return seconds >= 10 ? `${minutes}:${seconds.toString()}` : `${minutes}:0${seconds.toString()}`;
}

const timeUtils = {
    printTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return renderTime(minutes, seconds);
    },

    calculateSpeed(time: number, distance: number) {
        const secondsPerKilometer = (time / distance) * 1000;
        const minutes = Math.floor(secondsPerKilometer / 60);
        const seconds = Math.floor(secondsPerKilometer % 60);
        return renderTime(minutes, seconds);
    },

    formatDate(date: Date): string {
        if (!date.getDate) {
            const dateChunks = date.toString().split('-');
            return `${dateChunks[2]}-${dateChunks[1]}-${dateChunks[0]}`;
        }
        const dformat: string = [padLeft(date.getDate()),
            padLeft(date.getMonth() + 1),
            date.getFullYear()
        ].join(' ');
        return dformat;
    },

    getBestTime(path: TrackProps): TimeProps {
        const sortedTimes: TimeProps[] = path.times?.sort((a, b) => {
            if (a.duration < b.duration) return -1
            return a.duration > b.duration ? 1 : 0
        }) || [];
        return sortedTimes.length ? sortedTimes[0] : Time.empty();
    }
}

export default timeUtils;