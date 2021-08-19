export type ActivitySession = {
  day: string;
  kilogram: number;
  calories: number;
}

export default interface Activity {
  userId: number;
  sessions: ActivitySession[];
}