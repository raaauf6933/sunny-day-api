import React from "react";
import { Routes as Switch, Route, useNavigate } from "react-router-dom";
import MyBookingLogIn from "./views/myBookingLogin";
import MyBookingDetails from "./views/myBookingDetails";
import AppLayout from "../components/AppLayout";
import createDialogAction from "./../utils/dialogActionHandlers";
import { MyBookingPathParamsUrl } from "./url";

// import ConfirmationDialog from "../../admin/components/ConfirmationDialog/ConfirmationDialog";

const MyBooking = () => {
  const navigate = useNavigate();
  const [open, onClose] = createDialogAction(
    navigate,
    null,
    MyBookingPathParamsUrl,
    null
  );

  return (
    <>
      <AppLayout awake={true}>
        <Switch>
          <Route path="/" element={<MyBookingLogIn />} />
          <Route
            path=":id"
            element={
              <MyBookingDetails
                onModifyBooking={() => open("onModifyBooking")}
                onClose={onClose}
              />
            }
          />
        </Switch>
      </AppLayout>
    </>
  );
};

export default MyBooking;
