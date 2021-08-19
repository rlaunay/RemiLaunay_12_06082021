export default interface User {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  score: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  }
}