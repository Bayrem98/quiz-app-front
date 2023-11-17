export default interface Question {
  _id?: string;
  question: string;
  options: [string];
  answer: number;
}
