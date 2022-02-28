import React from "react";
import AmenitiesListPage from "../components/AmenitiesListPage";
import ApiAxios from "./../../../apiAxios";
import AppStateContext from "../../context/AppState/context";
import { GET_AMENITIES, CREATE_AMENITY } from "./../api";
import { useSnackbar } from "notistack";
import createDialogActionHandlers from "./../../utils/createDialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import { amenitiesUrl } from "./../url";
import CreateForm from "./../components/CreateForm";

const AmenitiesList = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);
  const [amenities, setAmenities] = React.useState();
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

  const createAmenity = async (formData) => {
    try {
      await ApiAxios(
        { url: CREATE_AMENITY, method: "POST", data: formData },
        appStateDispatch
      );

      enqueueSnackbar("Saved Changes!", { variant: "success" });
      fetchAmenities();
    } catch (error) {
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
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
      />
      <CreateForm
        open={params.action === "onCreateAmenity"}
        createAmenity={createAmenity}
        onClose={closeModal}
      />
    </>
  );
};

export default AmenitiesList;
