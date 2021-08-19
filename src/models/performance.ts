export type Kind = {
  1: "cardio";
  2: "energy";
  3: "endurance";
  4: "strength";
  5: "speed";
  6: "intensity";
}

export type Data = {
  value: number;
  kind: 1 | 2 | 3 | 4 | 5 | 6;
}

export default interface Performance {
  userId: number;
  kind: Kind;
  data: Data[];
}