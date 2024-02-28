export default class DanceEvent {
  constructor(
    public eventId: number,
    public eventName: string,
    public acceptedParticipants: number,
    public instructors: number,
    public durationMinutes: number,
    public totalAdmissionFees: number
  ) {
    this.eventId = eventId;
    this.eventName = eventName;
    this.acceptedParticipants = acceptedParticipants;
    this.instructors = instructors;
    this.durationMinutes = durationMinutes;
    this.totalAdmissionFees = totalAdmissionFees;
  }
}
