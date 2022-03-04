import React from "react";
import AmenitiesListPage from "../components/AmenitiesListPage";
import ApiAxios from "./../../../apiAxios";
import AppStateContext from "../../context/AppState/context";
import {
  GET_AMENITIES,
  CREATE_AMENITY,
  EDIT_AMENITY,
  GET_AMENITY,
} from "./../api";
import { useSnackbar } from "notistack";
import createDialogActionHandlers from "./../../utils/createDialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import { amenitiesUrl } from "./../url";
import CreateForm from "./../components/CreateForm";
import EditForm from "./../components/EditForm";

const AmenitiesList = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);
  const [amenities, setAmenities] = React.useState();
  const [amenity, setAmenity] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const fetchAmenities = async () => {
    try {
      const result = await ApiAxios(
        { url: GET_AMENITIES, method: "GET" },
        appStateDispatch
      );

      setAmenities(result?.data);
    } catch (error) {
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
    }
  };

  React.useEffect(() => {
    fetchAmenities();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAmenity = async () => {
    setAmenity();
    try {
      const result = await ApiAxios(
        { url: GET_AMENITY, method: "POST", data: { id: params.id } },
        appStateDispatch
      );

      setAmenity(result.data);
    } catch (error) {
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
    }
  };

  React.useEffect(() => {
    fetchAmenity();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const createAmenity = async (formData) => {
    try {
      await ApiAxios(
        { url: CREATE_AMENITY, method: "POST", data: formData },
        appStateDispatch
      );

      enqueueSnackbar("Saved Changes!", { variant: "success" });
      fetchAmenities();
    } catch (error) {
      enqueueSnackbar(error.data.message || "Something Went Wrong", {
        variant: "error",
      });
    }
  };

  const editAmenity = async (formData) => {
    try {
      await ApiAxios(
        {
          url: EDIT_AMENITY,
          method: "POST",
          data: { id: params.id, ...formData },
        },
        appStateDispatch
      );

      enqueueSnackbar("Saved Changes!", { variant: "success" });
      fetchAmenities();
    } catch (error) {
      enqueueSnackbar(error.data.message || "Something Went Wrong", {
        variant: "error",
      });
    }
  };

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    null,
    amenitiesUrl,
    params
  );

  return (
    <>
      <AmenitiesListPage
        amenities={amenities}
        showCreateModal={() => openModal("onCreateAmenity")}
        showEditModal={(id) => openModal("onEditAmenity", { id })}
      />
      <CreateForm
        open={params.action === "onCreateAmenity"}
        createAmenity={createAmenity}
        onClose={closeModal}
      />
      <EditForm
        open={params.action === "onEditAmenity"}
        editAmenity={editAmenity}
        onClose={closeModal}
        initialData={{
          name: amenity?.name,
          rate: amenity?.rate,
          status: amenity?.status,
        }}
      />
    </>
  );
};

export default AmenitiesList;
