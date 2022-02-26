import React from "react";
import { GET_ROOM_TYPES } from "../../api";
import AppStateContext from "../../../context/AppState/context";
// import { createApiRequest } from "./../../../utils/createApiRequest";
import RoomTypeListPage from "../../components/RoomTypeListPage";
import { useNavigate } from "react-router-dom";
import { roomManagementAddUrl } from "./../../url";
import ApiAxios from "./../../../../apiAxios";

const RoomTypeList = () => {
  const [roomTypes, setRoomTypes] = React.useState();
  const { appStateDispatch } = React.useContext(AppStateContext);
  const navigate = useNavigate();

  const fetchRoomTypes = async () => {
    try {
      const result = await ApiAxios(
        { url: GET_ROOM_TYPES, method: "GET" },
        appStateDispatch
      );
      setRoomTypes(result.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchRoomTypes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RoomTypeListPage
        roomTypes={roomTypes}
        onAdd={() => navigate(roomManagementAddUrl)}
      />
    </>
  );
};

export default RoomTypeList;
