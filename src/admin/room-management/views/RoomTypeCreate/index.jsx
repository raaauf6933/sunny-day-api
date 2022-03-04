import React from "react";
import AppStateContext from "../../../context/AppState/context";
import { CREATE_ROOM_TYPE } from "../../api";
import apiAxios from "./../../../../apiAxios";
import RoomTypeCreatePage from "../../components/RoomTypeCreatePage";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { roomTypePath } from "./../../url";

const RoomTypeCreate = () => {
  //   const { id } = useParams();
  //   const [roomType, setRoomType] = React.useState(initialState);
  const { appStateDispatch } = React.useContext(AppStateContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const createRoomType = async (data) => {
    try {
      const result = await apiAxios(
        {
          url: CREATE_ROOM_TYPE,
          method: "POST",
          data,
        },
        appStateDispatch
      );

      navigate(roomTypePath(result.data._id));
    } catch (error) {
      enqueueSnackbar(
        error.data.message || "Something went Wrong, Changes not saved",
        {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        }
      );
    }
  };

  return (
    <>
      <RoomTypeCreatePage createRoomType={createRoomType} />
    </>
  );
};

export default RoomTypeCreate;
