export type Session = {
  day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  sessionLength: number;
};

export default interface AverageSessions {
  userId: number;
  sessions: Session[];
}
