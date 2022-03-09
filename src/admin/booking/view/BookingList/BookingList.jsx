import React from "react";
import BookingListPage from "./../../components/BookingListPage/BookingListPage";
import AppStateContext from "../../../context/AppState/context";
import { GET_BOOKINGS } from "../../api";
import ApiAxios from "./../../../../apiAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import { BookingListUrl } from "./../../url";

const BookingList = () => {
  const [bookings, setBookings] = React.useState();
  const { appStateDispatch } = React.useContext(AppStateContext);
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const fetchBookings = async () => {
    setBookings();
    try {
      const result = await ApiAxios(
        {
          url: GET_BOOKINGS,
          method: "POST",
          data: {
            status: params?.bookingStatus ? params.bookingStatus : "ALL",
          },
        },
        appStateDispatch
      );
      setBookings(result.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.bookingStatus]);

  const tabs = [
    ...[
      {
        data: {
          bookingStatus: "ALL",
        },
        name: "ALL",
      },
      {
        data: {
          bookingStatus: "PENDING",
        },
        name: "PENDING",
      },
      {
        data: {
          bookingStatus: "CONFIRMED",
        },
        name: "CONFIRMED",
      },
      {
        data: {
          bookingStatus: "CHECK_IN",
        },
        name: "CHECK-IN",
      },
      {
        data: {
          bookingStatus: "CHECK_OUT",
        },
        name: "CHECK-OUT",
      },
      {
        data: {
          bookingStatus: "CANCELLED",
        },
        name: "CANCELLED",
      },
      {
        data: {
          bookingStatus: "EXPIRED",
        },
        name: "EXPIRED",
      },
    ],
  ];

  const currentTab =
    params.activeTab === undefined
      ? false
        ? tabs.length
        : 0
      : parseInt(params.activeTab, 0);

  const handleTabChange = (tab) => {
    navigate(
      BookingListUrl({
        activeTab: tab.toString(),
        ...tabs[tab].data,
      })
    );
  };

  return (
    <div>
      <BookingListPage
        bookings={bookings}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        tabs={tabs.map((tab) => tab.name)}
      />
    </div>
  );
};

export default BookingList;
