import { useEffect, useState } from "react";

export default function LandingPage() {
  interface EventData {
    meta: {
      retrieved: string;
      session: {
        username: string;
        orgId: number;
        orgName: string;
      };
      request: {
        requestedURI: string;
        type: string;
        org: string;
        pw: string;
      };
      org: {
        id: number;
      };
      fed: {
        id: number;
      };
    };
    search: {
      numRowsFound: number;
      shown: {
        numRowsShown: number;
        firstShownRowNum: number;
        lastShownRowNum: number;
      };
      limits: {
        maxRows: number;
        maxRowsDefault: number;
        maxRowsAllowed: number;
        maxRowsFound: number;
      };
    };
    events: Array<{
      id: number;
      key: string;
      code: string;
      uid: string;
      source: string;
      name: string;
      created: string;
      creator: {
        id: string;
        key: string;
        name: string;
      };
      category: {
        id: number;
        name: string;
      };
      place: string;
      pricing: {
        currency: string;
        basePriceInclVat: number;
      };
      registration: {
        status: string;
        showing: boolean;
        open: boolean;
        url: string;
        statusName: string;
        statusText: string;
        periods: {
          startShowing: string;
          startDirectReg: string;
          startLateReg: string;
          closeReg: string;
        };
      };
      schedule: {
        dayAndTimeInfo: string;
        start: {
          date: string;
          time: string;
          dayOfWeek: string;
        };
        end: {
          date: string;
          time: string;
          dayOfWeek: string;
        };
        numberOfPlannedOccasions: number;
        numberOfScheduledOccasions: number;
        occasions: Array<{
          length: number;
          startDateTime: string;
          startDayOfWeek: string;
          endDateTime: string;
        }>;
      };
      statistics: {
        instructors: number;
        accepted: number;
        withDrawn: number;
        leaders: number;
        followers: number;
        singleLeaders: number;
        singleFollowers: number;
        couples: number;
        acceptedLeaders: number;
        acceptedFollowers: number;
        acceptedSingleLeaders: number;
        acceptedSingleFollowers: number;
        acceptedCouples: number;
      };
      grouping: {
        eventBlock: {
          key: string;
          id: number;
          name: string;
        };
        primaryEventGroup: {
          key: string;
          id: number;
          name: string;
        };
      };
      categories: Array<{
        id: number;
        code: string;
        name: string;
      }>;
      requirements: {
        minAge: number;
        levelShort: string;
        levelLong: string;
        minLevelNumeric: number;
        minParticipants: number;
        maxParticipants: number;
      };
      instructorsName: string;
      staff: {
        hiddenStaff: {
          person: {
            id: number;
            key: string;
            name: string;
            nickname: string;
          };
        };
      };
      longdescription: string;
    }>;
  }

  const [eventData, setEventData] = useState<EventData>();

  // const fetchBookkeeping = async () => {
  //   try {
  //     const response = await fetch("");
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     // Update the state with the error message
  //     // setError(error.message || 'An error occurred');
  //   } finally {
  //     // Set loading to false, regardless of success or failure
  //     // setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Make the GET request to the API
        const response = await fetch(
          "https://dans.se/api/public/events/?org=dansarna&pw="
        );
        // Check if the request was successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setEventData(responseData);
      } catch (error) {
        // Update the state with the error message
        // setError(error.message || 'An error occurred');
      } finally {
        // Set loading to false, regardless of success or failure
        // setLoading(false);
      }
    };
    fetchCourses();
    console.log(eventData);
  }, []);

  return (
    <>
      <h1>Evenemang</h1>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Kursnamn</th>
            <th>Tid/Tillfälle</th>
            <th>Tilfällen</th>
            <th>Grundpris</th>
            <th>Antagna deltagare</th>
            <th>Instruktörer</th>
          </tr>
        </thead>
        <tbody>
          {eventData?.events.map((event) => (
            <tr>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>
                {/* Får ej tag på denna info pga ej innloggad ska vara: 
                
                
                 {event.schedule && event.schedule.occasions && event.schedule.occasions.length > 0 ? (
    event.schedule.occasions.map((occasion, index) => (
      <p key={index}>{occasion.length / 60} minutes</p>
    ))
  ) : (
    <p>No occasions found</p>
  )}
                
                */}
                {event.schedule.dayAndTimeInfo}
              </td>
              <td>{event.schedule.numberOfPlannedOccasions} ggr</td>
              <td>{event.pricing.basePriceInclVat} SEK</td>
              {/* Får ej tag på denna info pga ej innloggad */}
              {/* <td>{event.statistics.accepted}</td> */}
              <td>{event.instructorsName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
