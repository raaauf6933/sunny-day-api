import React from "react";
import { Grid } from "@mui/material";
import RoomItems from "../components/RoomItems";
import { Card, CardContent, Divider } from "@mui/material";
// import PaginationComponent from "../../components/Pagination";
// import { paginate } from "../../utils/paginate";
import BookingSummary from "../components/BookingSummary";
import ChangeDateDialog from "./../components/ChangeDateDialog";
import ImagePreviewDialog from "../../components/ImagePreviewDialog";
import bookingContext from "../../context/booking/bookingContext";
import { getAvailableRooms } from "../api/booking";
import CardLoadingSpinner from "../../components/CardLoadingSpinner";
import SaveButton from "../components/SaveButton";
import { buttonMessage } from "../../utils/intl";
import { bookingSelectRooms, bookingGuestDetails, bookingUrl } from "../url";
import createDialogActionHandlers from "../../utils/dialogActionHandlers";
import { Navigate } from "react-router-dom";

const SelectRooms = ({ params, navigate }) => {
  // const [state, setState] = React.useState({ currentPage: 1, pageSize: 3 });
  const [rooms, setRooms] = React.useState([]);
  const { bookingState } = React.useContext(bookingContext);
  const { room_details: roomContext } = bookingState;

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    bookingSelectRooms,
    bookingUrl,
    params
  );

  const getRooms = async (dates) => {
    await getAvailableRooms(dates)
      .then((res) => setRooms(res.data.data))
      .catch((err) => err);
  };

  const handleSave = () => {
    navigate(bookingUrl(params, bookingGuestDetails));
  };

  const handleBack = () => {
    navigate("/");
  };

  React.useEffect(() => {
    // if (!bookingState.check_in || !bookingState.check_out) {
    //   navigate("/");
    // }
  });

  React.useEffect(() => {
    getRooms({
      checkIn: "testIn",
      checkOut: "testOut",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingState.check_in, bookingState.check_out]);

  // const handlePageChange = (page) => {
  //   setState({ ...state, currentPage: page });
  // };

  // const getPagedData = () => {
  //   const paginatedRooms = paginate(rooms, state.currentPage, state.pageSize);
  //   return paginatedRooms;
  // };

  if (bookingState.check_in && bookingState.check_out) {
    return (
      <>
        <Grid container spacing={4}>
          <Grid container item xs={12} sm={8} spacing={2}>
            <Card style={{ width: "100%", height: "fit-content" }}>
              <CardContent>
                {rooms.length !== 0 ? (
                  rooms.map((room, index, array) => {
                    if (index === array.length - 1) {
                      return (
                        <Grid
                          key={index}
                          container
                          item
                          xs={12}
                          sm={12}
                          spacing={2}
                        >
                          <RoomItems
                            key={index}
                            room={room}
                            openModal={openModal}
                          />
                        </Grid>
                      );
                    } else {
                      return (
                        <>
                          {" "}
                          <Grid container item xs={12} sm={12} spacing={2}>
                            <RoomItems
                              key={index}
                              room={room}
                              openModal={openModal}
                            />
                          </Grid>
                          <Grid container item xs={12} sm={12} display="block">
                            <Divider />
                          </Grid>
                        </>
                      );
                    }
                  })
                ) : (
                  <CardLoadingSpinner />
                )}
              </CardContent>
            </Card>
            <Grid
              container
              item
              sm={12}
              display="flex"
              justifyContent="center"
              margin="1em"
            >
              {" "}
              {/* <PaginationComponent
                itemsCount={rooms.length}
                pageSize={3}
                onPageChange={handlePageChange}
              /> */}
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={4} spacing={2}>
            <BookingSummary openModal={openModal} bookingState={bookingState} />
          </Grid>
        </Grid>
        <ChangeDateDialog
          isOpenModal={params.action === "onChangeDate"}
          closeModal={closeModal}
        />
        <ImagePreviewDialog
          imageSrc={params.roomImage}
          isOpenModal={params.action === "showRoomImage"}
          closeModal={closeModal}
        />
        <SaveButton
          onSubmit={handleSave}
          onBack={handleBack}
          saveLabel={buttonMessage.continue}
          disabledSave={roomContext.length === 0}
        />
      </>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default SelectRooms;
