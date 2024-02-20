export default class DanceEvent {
    constructor(public eventName: string, public totalAddmissionFees: number) {
      this.eventName = eventName;
      this.totalAddmissionFees = totalAddmissionFees;
    }
  }