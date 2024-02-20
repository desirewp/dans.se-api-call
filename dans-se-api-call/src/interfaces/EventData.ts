interface IEventData {
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
