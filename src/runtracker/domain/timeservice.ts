import axios, {AxiosError} from "axios";
import {SERVER_URL} from "../../config";
import {PathStatsProps} from "./pathStats";
import {TimeProps} from "./time";

const timeService = {

    async createTime(pathId: string, time: TimeProps): Promise<TimeProps> {
        try {
            const request = {
                duration: time.duration,
                trainingDate: time.trainingDate.toLocaleDateString("es-ES")
            }
            const result = await axios.post<TimeProps>(`${SERVER_URL}/paths/${pathId}/times`, request);
            return result.data;
        } catch (error) {
            const errors = error as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                throw new Error(errors.message);
            } else {
                throw error;
            }
        }

    },
    async getMonthStats(month: number, year: number): Promise<PathStatsProps[]> {
        try {
            //add param to url
            const result = await axios.get<PathStatsProps[]>(`${SERVER_URL}/times/stats?month=${month}&year=${year}`);
            return result.data;
        } catch (error) {
            const errors = error as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                throw new Error(errors.message);
            } else {
                throw error;
            }
        }

    },
}

export default timeService;