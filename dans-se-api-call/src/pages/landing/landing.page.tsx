import React from "react";
import { useCallback, useEffect, useState } from "react";
import { xml2json } from "xml-js";

import Instructor from "../../models/instructor";
import DanceEvent from "../../models/event";

export default function LandingPage() {
  const [eventData, setEventData] = useState<IEventData>();
  const [bookingData, setBookingData] = useState<IBookingData>();
  const [memberData, setMemberData] = useState<IMemberData>();

  const [instructors, setInstructors] = useState<Instructor[]>([]);

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

  const fetchEventJson = useCallback(async () => {;
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
      // console.log(rentMinute);
    }
  };

  useEffect(() => {
    fetchBookingXML()
      .then(fetchMemberXML)
      .then(fetchEventJson)
      .then(() => {
        if (memberData && bookingData) {
          calcTotalMinutes();
          calcRentPerMinute();
          populateInstructorsArray();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fetchBookingXML, fetchMemberXML, fetchEventJson]);

  useEffect(() => {
    if (memberData && bookingData) {
      calcTotalMinutes();
      calcRentPerMinute();
      populateInstructorsArray();
    }
  }, [memberData, bookingData, eventData]);

  const populateInstructorsArray = () => {
    if (memberData && bookingData) {
      let allInstructors: Instructor[] = memberData.bookings.booking.map(
        (member) => {
          const instructorEvents: DanceEvent[] = [];

          //Kollar vilka evenameng instruktören har hållit
          bookingData.bookings.booking.forEach((booking) => {
            if (
              member.participant._attributes.userId ===
                booking.participant._attributes.userId &&
              booking.status._attributes.regStatusCode === "INSTRUCTOR"
            ) {
              // If the member is an instructor, add the event to their events array
              instructorEvents.push(new DanceEvent(booking.event._text, 0)); // You need to provide a value for totalAddmissionFees
            }
          });
          let newInstructor = new Instructor(
            member.participant._attributes.userId,
            member.participant.name._text,
            instructorEvents,
            0
          );
          return newInstructor;
        }
      );
      setInstructors(allInstructors);

      // console.log(allInstructors);
    }
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
                  <td>Evenemang st</td>
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
                              <td>{event.totalAddmissionFees}</td>
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
    </>
  );
}
