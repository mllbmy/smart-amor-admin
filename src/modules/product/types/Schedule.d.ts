type ScheduleDay = {
  key: string;
  color: string;
  handle: Function;
};
export interface ScheduleData {
  key: string;
  device: string;
  level: number;
  deadline: string;
  efficiency: number;
  Monday: ScheduleDay | null;
  Tuesday: ScheduleDay | null;
  Wednesday: ScheduleDay | null;
  Thursday: ScheduleDay | null;
  Friday: ScheduleDay | null;
}
