export interface DetectionResultData {
    date: string;
    columns: DetectionResultColumns[];

}
export interface DetectionResultColumns {
    title: string;
    value: string;
    status: string;
    level?: string;
    position?: {
        x: number;
        y: number;
    };

}