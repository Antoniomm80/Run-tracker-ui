
import axios, {AxiosError} from "axios";
import { TrackSummaryProps } from "./tracksummary";
import { TrackProps } from "./track";
import {SERVER_URL} from "../../config";

export const pathService = {


    async findAll(): Promise<TrackSummaryProps[]> {
        try {
            const result = await axios.get<TrackSummaryProps[]>(`${SERVER_URL}/path-stats`);
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

    async findById(pathId: string): Promise<TrackProps> {
        try {
            const result = await axios.get<TrackProps>(`${SERVER_URL}/paths/${pathId}`);
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

    async createPath(path: TrackProps): Promise<TrackProps> {
        try {
            const result = await axios.post<TrackProps>(`${SERVER_URL}/paths`, path);
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