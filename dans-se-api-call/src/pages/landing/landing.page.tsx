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

  const [data, setData] = useState<EventData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request to the API
        const response = await fetch(
          "https://dans.se/api/public/events/?org=dansarna&pw="
        );

        // Check if the request was successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const responseData = await response.json();

        // Update the state with the fetched data
        setData(responseData);
      } catch (error) {
        // Update the state with the error message
        // setError(error.message || 'An error occurred');
      } finally {
        // Set loading to false, regardless of success or failure
        // setLoading(false);
      }
    };

    fetchData();
    console.log(data);
  }, []);

  return (
    <>
      <h1>Heeeeeeejjj</h1>

      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Kursnamn</th>
            <th>Tid/Tilfälle</th>
            <th>Tilfällen</th>
            <th>Grundpris</th>
            <th>Antagna deltagare</th>
            <th>Instruktörer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Event id</td>
            <td>Kursnamn</td>
            <td>Tid/tilfälle</td>
            <td>Tillfällen</td>
            <td>Grundpris</td>
            <td>Antagna deltagare</td>
            <td>Instruktörer</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
