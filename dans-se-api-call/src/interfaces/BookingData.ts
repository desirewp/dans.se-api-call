interface IBookingData {
  bookings: {
    search: {
      maxRows: {
        maxRowsDefault: string;
        maxRowsAllowed: string;
        value: string;
      };
      result: {
        numRowsFound: string;
        numRowsShown: string;
        firstShownRowNum: string;
        lastShownRowNum: string;
      };
    };
    booking: Booking[];
  };
}

interface Booking {
  _attributes: {
    id: string;
  };

  event: {
    _attributes: {
      // code: string;
      integer_value: number;
      // eventStartDate: string;
      // eventStartShowing: string;
      // eventStopShowing: string;
    };
    // _text: string;
  };

  status: {
    _attributes: {
      regStatusCode: string;
      //     integer_value: string;
    };
    //   statusText: string;
  };

  participant: {
    _attributes: {
      userId: string;
    };
    //   userKey: string;
    //   name: {
    //     nickname: string;
    //   };
    //   dateOfBirth: string;
    //   pid: {
    //     classicFormat: string;
    //   };
  };

  // dance_role: {
  //   _attributes: {
  //     integerValue: string;
  //   };
  //   _text: string;
  // };

  payment: {
    // price_agreed: {
    //   _attributes: {
    //     currency: string;
    //   };
    //   _text: string;
    // };
    amount_paid: {
    //   _attributes: {
    //     currency: string;
    //   };
       _text: string;
     };
    // payment_fullfilled: {
    //   _text: string;
    // };
  };

  comment: {
    _text: string;
  };
}
