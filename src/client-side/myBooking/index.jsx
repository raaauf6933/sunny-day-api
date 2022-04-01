import React from "react";
import {
  Routes as Switch,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { parse as parseQs } from "qs";
import MyBookingLogIn from "./views/myBookingLogin";
import MyBookingDetails from "./views/myBookingDetails";
import ModifyBookingModal from "./components/ModifyBookingModal";
import AppLayout from "../components/AppLayout";
import createDialogAction from "./../utils/dialogActionHandlers";
import { MyBookingPathParamsUrl } from "./url";
import Form from "./../../admin/components/Form/Form";
import moment from "moment";

const MyBooking = () => {
  const location = useLocation();
  const qs = parseQs(location.search.substr(1));
  const params = qs;
  const navigate = useNavigate();

  console.log(params);

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
              />
            }
          />
        </Switch>

        <Form
          initial={{
            date: [
              new Date(moment(new Date()).add(1, "days").format()),
              new Date(
                moment(new Date(moment(new Date()).add(1, "days").format()))
                  .add(1, "days")
                  .format()
              ),
            ],
            generate_invoice: true,
            room_details: [],
          }}
          // onSubmit={handleSubmit}
        >
          {({ data: formData, change, hasChanged }) => {
            return (
              <ModifyBookingModal
                open={params.action === "onModifyBooking"}
                onClose={onClose}
                formData={formData}
                change={change}
                hasChanged={hasChanged}
              />
            );
          }}
        </Form>
      </AppLayout>
    </>
  );
};

export default MyBooking;
