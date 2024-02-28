interface IMemberData {
  bookings: {
    booking: MemberBooking[];
  };
}

interface MemberBooking {
  id: string;
  event: {
    code: string;
    integer_value: number;
    eventStartDate: string;
    eventStartShowing: string;
    eventStopShowing: string;
    _text: string;
  };
  status: {
    _attributes: {
      integer_value: number;
      regStatusCode: string;
    };
    _text: string;
  };
  participant: {
    _attributes: {
      userId: string;
    };
    userKey: string;
    name: {
      nickname: string;
      _text: string;
    };
    dateOfBirth: string;
    pid: {
      classicFormat: string;
      _text: string;
    };
  };
  dance_role: {
    integerValue: string;
    _text: string;
  };
  payment: {
    price_agreed: {
      currency: string;
      _text: number;
    };
    amount_paid: {
      currency: string;
      _text: number;
    };
    payment_fullfilled: string;
  };
  comment: string;
}
