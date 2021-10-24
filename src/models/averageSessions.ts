export type Session = {
  day: number;
  sessionLength: number;
};

export default interface AverageSessions {
  userId: number;
  sessions: Session[];
}
