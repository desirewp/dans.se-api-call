import DanceEvent from "./event";

export default class Instructor {
  constructor(
    public userId: string,
    public name: string,
    public events: DanceEvent[],
    public salary: number
  ) {
    this.userId = userId;
    this.name = name;
    this.events = events;
    this.salary = salary;
  }
};