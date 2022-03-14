import { image } from "./base64logo";
import moment from "moment";
import { currencyFormat, getNoNights } from "./../../misc";
import { VAT_RATE } from "./../../config";

export const getInvoice = (booking) => {
  // playground requires you to assign document definition to a variable called dd
  const {
    guest,
    check_in,
    check_out,
    billing,
    rooms,
    status,
    events,
    additionals,
  } = booking;

  const getNoQuantity = (roomtype_id) => {
    return rooms
      ? rooms.filter((obj) => obj.roomtype_id === roomtype_id).length
      : 1;
  };

  const getRoomAmount = (roomtype_id, rate) => {
    const roomTotalAmount = parseInt(getNoQuantity(roomtype_id)) * rate;
    return roomTotalAmount;
  };

  const handleGetRooms = () => {
    const removeDuplicates = rooms
      ? rooms.filter(
          (v, i, a) => a.findIndex((t) => t.roomtype_id === v.roomtype_id) === i
        )
      : [];

    const countRooms = removeDuplicates.map((e) => {
      return {
        room_name: e.roomtype_name,
        rate: e.room_amount,
        qty: getNoQuantity(e.roomtype_id),
        amount: getRoomAmount(e.roomtype_id, e.room_amount),
      };
    });

    const format_data = countRooms.map((e) => [
      {
        text: e.room_name,
        style: "tableBody",
      },
      {
        text: currencyFormat(e.rate),
        style: "tableBody",
      },
      {
        text: e.qty,
        style: "tableBody",
      },
      {
        text: currencyFormat(e.amount),
        style: "tableBody",
      },
    ]);

    return format_data;
  };

  const handleGetAdditionalAmount = (rate, qty) => {
    const additionalTotalAmount = parseFloat(rate * qty);
    return additionalTotalAmount;
  };
  const handleGetAdditionals = () => {
    const additionalsBody = additionals.map((e) => {
      return [
        {
          text: e.name,
          style: "tableBody",
        },
        {
          text: currencyFormat(e.rate),
          style: "tableBody",
        },
        {
          text: e.qty,
          style: "tableBody",
        },
        {
          text: currencyFormat(handleGetAdditionalAmount(e.rate, e.qty)),
          style: "tableBody",
        },
      ];
    });

    return additionalsBody;
  };

  const handleVat = () => {
    const vatable_sales = billing.total_amount / VAT_RATE;
    const vat = billing.total_amount - vatable_sales;

    return {
      vatable_sales,
      vat,
    };
  };

  return {
    content: [
      {
        alignment: "",
        columns: [
          {
            stack: [
              {
                columns: [
                  {
                    image: image,
                    width: 50,
                  },
                  {
                    margin: [10, 10, 10, 10],
                    text: "Villa Gregoria Resort",
                    width: "auto",
                  },
                ],
              },
            ],
            // text: 'Villa Gregoria Resort',
            style: "header",
          },
          {
            margin: [10, 10, 10, 10],
            text: `${moment().format("LLL")}`,
            style: "date",
          },
        ],
      },

      "\n",
      {
        columns: [
          {
            stack: [
              {
                text: "Brgy. Buboy Nagcarlan, Laguna \n +639 00662 4346",
                fontSize: 14,
              },
              {
                margin: [0, 5, 0, 0],
                text: "TIN : 0000 42112 4212141",
                fontSize: 14,
              },
              {
                margin: [0, 5, 0, 0],
                text: "PREPARED BY: Juan Dela Cruz",
                fontSize: 14,
              },
            ],
          },
          {
            alignment: "left",
            stack: [
              {
                margin: [0, 3, 0, 0],
                text: `Booing Ref: ${booking.booking_reference}`,
                bold: true,
                fontSize: 14,
              },
              {
                margin: [0, 3, 0, 0],
                text: `Name: ${booking.guest.first_name} ${booking.guest.last_name}`,
                fontSize: 14,
              },
              {
                margin: [0, 3, 0, 0],
                text: `Address : ${booking.guest.street_address}, ${booking.guest.city}, ${booking.guest.province}`,
                fontSize: 14,
              },
              {
                margin: [0, 3, 0, 0],
                text: `Email: ${booking.guest.email}`,
                fontSize: 14,
              },
              {
                margin: [0, 3, 0, 0],
                text: `Contact: ${booking.guest.contact_number}`,
                fontSize: 14,
              },
              {
                margin: [0, 10, 0, 0],
                text: `Check-In: ${moment(booking.check_in).format("LL")}`,
                fontSize: 14,
              },
              {
                margin: [0, 3, 0, 0],
                text: `CheckOut:  ${moment(booking.check_out).format(
                  "LL"
                )} (2 nights)`,
                fontSize: 14,
              },
              {
                margin: [0, 3, 0, 0],
                text: `Guest: ${booking.guest.no_guest}`,
                fontSize: 14,
              },
            ],
          },
        ],
      },

      "\n",

      {
        style: "tableExample",
        margin: [0, 20, 0, 0],

        table: {
          widths: ["*", "*", "*", "*"],
          body: [
            [
              {
                text: "ITEM",
                style: "tableheader",
                width: "auto",
              },
              {
                text: "RATE",
                style: "tableheader",
              },
              {
                text: "QTY",
                style: "tableheader",
              },
              {
                text: "TOTAL",
                style: "tableheader",
              },
            ],
            ...handleGetRooms(),
            ...handleGetAdditionals(),
          ],
        },
      },

      {
        margin: [0, 20, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Sub-total (Rooms) :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(
                      booking.billing.sub_total
                    )} \n X (${getNoNights(check_in, check_out)} nights)`,
                    style: "total_currency",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        alignment: "",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Additionals:",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(billing.additional_total)}`,
                    style: "total_currency",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Subtotal :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(booking.billing.total_amount)}`,
                    style: "total_currency",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Discount :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `( ${currencyFormat(billing?.discount?.amount)} )`,
                    style: "total_currency",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Vatable :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(handleVat().vatable_sales)}`,
                    style: "total_currency",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "VAT :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(handleVat().vat)}`,
                    style: "total_currency",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Total Amount :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(billing.total_amount)}`,
                    style: "total_currency",
                  },
                ],
              },
            ],
            // text: 'Total Sales : ₱ 98,400.00',
            // style: 'date'
          },
        ],
      },
      {
        margin: [0, 30, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Total Payment :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(booking?.payment_amount)}`,
                    style: "total_currency",
                  },
                ],
              },
            ],
            // text: 'Total Sales : ₱ 98,400.00',
            // style: 'date'
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        alignment: "justify",
        columns: [
          {
            text: "",
            style: "total_currency",
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: "Amount Due :",
                    style: "total_currency",
                  },
                  {
                    alignment: "right",
                    text: `${currencyFormat(booking?.total_balance)}`,
                    style: "total_currency",
                  },
                ],
              },
            ],
            // text: 'Total Sales : ₱ 98,400.00',
            // style: 'date'
          },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      tableheader: {
        bold: true,
        fontWeight: 600,
        margin: [5, 5, 5, 5],
      },
      tableBody: {
        margin: [5, 5, 5, 5],
      },
      date: {
        fontSize: 16,
        alignment: "right",
      },
      total_currency: {
        fontSize: 12,
        bold: true,
        alignment: "justify",
      },
      title1: {
        fontSize: 14,
        bold: true,
        alignment: "justify",
      },
      title2: {
        fontSize: 14,
        bold: false,
        alignment: "justify",
      },
      titleImage: {
        columnGap: 10,
      },
    },
    defaultStyle: {
      columnGap: 1,
    },

    pageMargins: [20, 20, 20, 10],
  };
};
