export interface StatsGraphContextContent {
    currentDate: Date;
    addMonth: () => void;
    substractMonth: () => void;
    getMonth: () => number;
    getYear: () => number;
    getMonthLabel: () => string;
}

export class StatsGraphContextImpl implements StatsGraphContextContent {
    currentDate: Date;
    addMonth: () => void;
    substractMonth: () => void;
    getMonth: () => number;
    getYear: () => number;
    getMonthLabel: () => string;

    constructor(currentDate: Date, setCurrentDate: (date: Date) => void) {
        this.currentDate = currentDate;
        this.addMonth = () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            setCurrentDate(new Date(this.currentDate));
        };
        this.substractMonth = () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            setCurrentDate(new Date(this.currentDate));
        };
        this.getMonth = () => (this.currentDate.getMonth() + 1);
        this.getYear = () => this.currentDate.getFullYear();
        this.getMonthLabel = () => `${this.currentDate.toLocaleString('default', {month: 'long'})} ${this.currentDate.getFullYear()}`;
    }
}