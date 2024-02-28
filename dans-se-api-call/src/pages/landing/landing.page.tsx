import React from "react";
import { useCallback, useEffect, useState } from "react";
import { xml2json } from "xml-js";

import { IEventData, IEvent } from "../../interfaces/EventData";

import Instructor from "../../models/instructor";
import DanceEvent from "../../models/event";

export default function LandingPage() {
  const [eventData, setEventData] = useState<IEventData>();
  const [bookingData, setBookingData] = useState<IBookingData>();
  const [memberData, setMemberData] = useState<IMemberData>();

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [events, setEvents] = useState<DanceEvent[]>([]);

  let organisatonTax: number = 0.2;
  let rent: number = 150000;
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [rentPerMinute, setRentPerMinute] = useState<number>(0);

  const fetchBookingXML = useCallback(async () => {
    try {
      const response = await fetch("src/assets/mock/bookings.xml");
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }
      const xmlString = await response.text();
      const json = xml2json(xmlString, { compact: true, spaces: 4 });
      const jsonObject = JSON.parse(json);
      setBookingData(jsonObject);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, []);

  const fetchMemberXML = useCallback(async () => {
    try {
      const response = await fetch("src/assets/mock/members.xml");
      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.statusText}`);
      }
      const xmlString = await response.text();
      const json = xml2json(xmlString, { compact: true, spaces: 4 });
      const jsonObject = JSON.parse(json);
      setMemberData(jsonObject);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }, []);

  const fetchEventJson = useCallback(async () => {
    try {
      const response = await fetch("src/assets/mock/events.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }
      const jsonObject = await response.json();
      setEventData(jsonObject);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  const calcTotalMinutes = () => {
    if (eventData) {
      let allMinutes: number[] = eventData.events.map((event) => {
        const start = event.schedule.start.time;
        const end = event.schedule.end.time;

        const date1 = new Date(`1970-01-01 ${start}`);
        const date2 = new Date(`1970-01-01 ${end}`);

        const differenceInMinutes = (date2.getTime() - date1.getTime()) / 60000;

        return differenceInMinutes;
      });

      let minutesSum = allMinutes.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      setTotalMinutes(minutesSum);
    }
  };

  const calcRentPerMinute = () => {
    if (totalMinutes != 0) {
      const rentMinute = Math.round((rent * 100) / totalMinutes) / 100;
      setRentPerMinute(rentMinute);
    }
  };

  useEffect(() => {
    fetchBookingXML()
      .then(fetchMemberXML)
      .then(fetchEventJson)
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fetchBookingXML, fetchMemberXML, fetchEventJson]);

  useEffect(() => {
    if (memberData && bookingData && eventData) {
      calcTotalMinutes();
      calcRentPerMinute();
      populateEventsArray();
      populateInstructorsArray();
    }
  }, [memberData, bookingData, eventData]);

  // const populateInstructorsArray = () => {
  //   if (memberData && bookingData) {
  //     let allInstructors: Instructor[] = memberData.bookings.booking.map(
  //       (member) => {
  //         const instructorEvents: DanceEvent[] = [];

  //         //Kollar vilka evenameng instruktören har hållit
  //         bookingData.bookings.booking.forEach((booking) => {
  //           if (
  //             member.participant._attributes.userId ===
  //               booking.participant._attributes.userId &&
  //             booking.status._attributes.regStatusCode === "INSTRUCTOR"
  //           ) {
  //             // Här behöver tryckas in event förtjänst med
  //             // If the member is an instructor, add the event to their events array
  //             instructorEvents.push(new DanceEvent(booking.event._text, 0)); // You need to provide a value for totalAddmissionFees
  //           }
  //         });
  //         let newInstructor = new Instructor(
  //           member.participant._attributes.userId,
  //           member.participant.name._text,
  //           instructorEvents,
  //           0
  //         );
  //         return newInstructor;
  //       }
  //     );
  //     setInstructors(allInstructors);
  //   }
  // };

  const populateInstructorsArray = () => {
    if (memberData && bookingData && eventData && events) {
      console.log(events);
      let allInstructors: Instructor[] = memberData.bookings.booking.map(
        (member) => {
          const userId = member.participant._attributes.userId;
          const instructorEvents: DanceEvent[] = [];

          // Get all bookings for the current instructor
          const instructorBookings = bookingData.bookings.booking.filter(
            (booking) =>
              booking.participant._attributes.userId === userId &&
              booking.status._attributes.regStatusCode === "INSTRUCTOR"
          );

          // Process events for the current instructor
          instructorBookings.forEach((booking) => {
            const eventId = booking.event._attributes.integer_value;
            const event = eventData.events.find((e) => e.id === eventId);
            const admissionFees = 10;

            if (event) {
              // Check if an event with the same ID already exists in instructorEvents
              const existingEventIndex = instructorEvents.findIndex(
                (e) => e.eventId === eventId
              );

              if (existingEventIndex !== -1) {
                // If exists, update the totalAdmissionFees
                instructorEvents[existingEventIndex].totalAdmissionFees +=
                  admissionFees;
              } else {
                // If not, add a new DanceEvent to instructorEvents with correct totalAdmissionFees
                const newDanceEvent = new DanceEvent(
                  event.id,
                  event.name,
                  0,
                  0,
                  0,
                  admissionFees
                );
                instructorEvents.push(newDanceEvent);
              }
            }
          });

          let newInstructor = new Instructor(
            userId,
            member.participant.name._text,
            instructorEvents, // Pass instructorEvents array here
            0
          );

          return newInstructor;
        }
      );

      setInstructors(allInstructors);
    }
  };

  const populateEventsArray = () => {
    if (eventData) {
      const allEvents: DanceEvent[] = [];
      eventData.events.forEach((event) => {
        let newEvent = new DanceEvent(
          event.id,
          event.name,
          event.statistics?.accepted ? Number(event.statistics.accepted) : 0,
          event.statistics?.instructors
            ? Number(event.statistics.instructors)
            : 0,
          getDuration(event),
          getCourseProfit(event)
        );
        allEvents.push(newEvent);
      });
      setEvents(allEvents);
    }
  };

  const getDuration = (event: IEvent) => {
    let occasions = event.schedule?.occasions?.map((occasion: any) => {
      return occasion.length;
    });
    if (occasions != undefined) {
      const duration: number = occasions.reduce((acc, curr) => acc + curr, 0);
      return duration / 60;
    }
    return 0;
  };

  const getCourseProfit = (event: IEvent): number => {
    // console.log(event);
    const participantPayments: number[] = [];
    if (!bookingData) {
      console.log("booking data finns ej");
      return 0;
    }
    const participants: Booking[] = bookingData.bookings.booking.filter(
      (booking) => {
        if (booking.event._attributes.integer_value === event.id) {
          console.log(booking);
          return booking;
        }
      }
    );

    // console.log(participants);
    participants.forEach((participant: Booking) => {
      let payment: number = participant.payment?.amount_paid?._text
        ? Number(participant?.payment.amount_paid._text)
        : 0;
      participantPayments.push(payment);
    });

    let profit: number = participantPayments.reduce(
      (acc, curr) => acc + curr,
      0
    );
    return profit!;
  };

  return (
    <>
      <p>Dansarna skatt: {organisatonTax * 100}%</p>

      <p>Totala kursminuter: {totalMinutes} min</p>

      <p>Hyra: {rent} kr</p>
      <p>Hyra per minut: {rentPerMinute} kr</p>

      <h1>Instruktörer ({instructors.length} st)</h1>
      <table>
        <thead>
          <tr>
            <th>Instruktör</th>
            <th>Antal Evenmang</th>
            <th>Arvode</th>
          </tr>
        </thead>
        <tbody>
          {/* Lägg in att endast det event som instruktören medverkat på visas :)*/}
          {instructors.map((instructor, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{instructor.name}</td>
                  <td>{instructor.events.length} st</td>
                  <td>Totalt Arvode SEK</td>
                </tr>
                <tr>
                  <td col-span="3">
                    <table>
                      <thead>
                        <tr>
                          <th>Kursnamn</th>

                          <th>Arvode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instructor.events.map((event, index1) => {
                          return (
                            <tr key={index1}>
                              <td>{event.eventName}</td>
                              <td>{event.totalAdmissionFees}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Namn</td>
            <td>Deltagare</td>
            <td>Instruktörer</td>
            <td>Längd</td>
            <td>Inkomst</td>
          </tr>
        </thead>
        <tbody>
          {eventData !== undefined &&
            eventData.events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.statistics?.accepted}</td>
                <td>{event.statistics?.instructors}</td>
                <td>{getDuration(event)} min</td>
                <td>Inkomst</td>
                {/* Ta denna info och spara istället vid hämtning */}
              </tr>
            ))}
        </tbody>
      </table>

      {/* <table>
        <tbody>
          {bookingData !== undefined &&
            bookingData.bookings.booking.map((booking) => (
              <tr key={booking._attributes.id}>
                <td>{booking._attributes.id}</td>
                <td>{booking.event._attributes.integer_value}</td>

                <td>{booking.payment?.amount_paid._text}</td>
              </tr>
            ))}
        </tbody>
      </table> */}
    </>
  );
}
