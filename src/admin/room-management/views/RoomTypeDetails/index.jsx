import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AppStateContext from "../../../context/AppState/context";
import { createApiRequest } from "./../../../utils/createApiRequest";
import {
  GET_ROOM_TYPE,
  UPDATE_ROOM_TYPE,
  UPLOAD_ROOM_IMAGE,
  CREATE_ROOM,
} from "../../api";
import apiAxios from "./../../../../apiAxios";
import RoomTypeUpdateDetailsPage from "../../components/RoomTypeUpdateDetailsPage";
import { useSnackbar } from "notistack";
import createDialogActionHandlers from "./../../../utils/createDialogActionHandlers";
import { parse as parseQs } from "qs";
import { roomTypePathParamsUrl } from "./../../url";
import CreateRoomDialog from "./../../components/CreateRoomDialog";
// const initialState = {
//   name: "",
// };

const RoomTypeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [roomType, setRoomType] = React.useState({});
  const { appStateDispatch } = React.useContext(AppStateContext);
  const { enqueueSnackbar } = useSnackbar();
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const fetchRoomType = async () => {
    const result = await createApiRequest(
      {
        id,
      },
      GET_ROOM_TYPE,
      "POST",
      null,
      appStateDispatch
    );
    setRoomType(result.data);
  };

  const updateRoomType = async (data) => {
    try {
      await createApiRequest(
        {
          id,
          data,
        },
        UPDATE_ROOM_TYPE,
        "POST",
        null,
        appStateDispatch
      );

      fetchRoomType();
      enqueueSnackbar("Saved Changes!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      enqueueSnackbar("success", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const uploadRoomImage = async (data) => {
    data.append("data", JSON.stringify({ id: id }));

    try {
      await apiAxios(
        {
          url: UPLOAD_ROOM_IMAGE,
          method: "POST",
          data,
          headers: {
            "Content-Type": "multipart/form-data",
            data: "application/json",
          },
        },
        appStateDispatch
      );

      fetchRoomType();
      enqueueSnackbar("Saved Changes!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      enqueueSnackbar(
        "Invalid file format. Please use valid image file (png/jpg)",
        {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }
      );
    }
  };

  const createRoom = async (room_number, onClose) => {
    try {
      await apiAxios(
        {
          url: CREATE_ROOM,
          method: "POST",
          data: { id, room_number },
        },
        appStateDispatch
      );

      fetchRoomType();
      onClose();
      enqueueSnackbar("Saved Changes!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      enqueueSnackbar("Something Went Wrong", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    id,
    roomTypePathParamsUrl,
    params
  );

  React.useEffect(() => {
    fetchRoomType();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RoomTypeUpdateDetailsPage
        updateRoomType={updateRoomType}
        roomType={roomType}
        uploadRoomImage={uploadRoomImage}
        onCreateRoom={() => openModal("onCreateRoom")}
      />
      <CreateRoomDialog
        open={params.action === "onCreateRoom"}
        onClose={closeModal}
        onSubmit={createRoom}
      />
    </>
  );
};

export default RoomTypeDetails;
