import React from "react";
import DiscountListPage from "./../components/DiscountListPage";
import ApiAxios from "./../../../apiAxios";
import AppStateContext from "../../context/AppState/context";
import { GET_DISCOUNTS, CREATE_DISCOUNT, UPDATE_STATUS } from "./../api";
import { useSnackbar } from "notistack";
import CreateForm from "./../components/CreateForm";
import createDialogActionHandlers from "./../../utils/createDialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import { discountsUrl } from "./../url";

const DiscountList = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);
  const [discounts, setDiscounts] = React.useState();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const fetchDiscounts = async () => {
    try {
      const result = await ApiAxios(
        { url: GET_DISCOUNTS, method: "GET" },
        appStateDispatch
      );

      setDiscounts(result?.data);
    } catch (error) {
      enqueueSnackbar("Something Went Wrong", { variant: "error" });
    }
  };

  React.useEffect(() => {
    fetchDiscounts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createDiscount = async (formData) => {
    try {
      await ApiAxios(
        {
          method: "POST",
          url: CREATE_DISCOUNT,
          data: formData,
        },
        appStateDispatch
      );
      fetchDiscounts();
      enqueueSnackbar("Saved Changes!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.data.message || "Something Went Wrong", {
        variant: "error",
      });
    }
  };

  const handleUpdateStatus = async ({ id, type, value }) => {
    try {
      await ApiAxios(
        {
          method: "POST",
          url: UPDATE_STATUS,
          data: {
            id,
            status: type === "STATUS" ? (value ? "ACT" : "DEACT") : "DEL",
          },
        },
        appStateDispatch
      );
      fetchDiscounts();
      enqueueSnackbar("Saved Changes!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.data.message || "Something Went Wrong", {
        variant: "error",
      });
    }
  };

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    null,
    discountsUrl,
    params
  );

  return (
    <>
      <DiscountListPage
        discounts={discounts}
        onCreateDiscount={() => openModal("onCreateDiscount")}
        handleUpdateStatus={handleUpdateStatus}
      />
      <CreateForm
        open={params.action === "onCreateDiscount"}
        createDiscount={createDiscount}
        onClose={closeModal}
      />
    </>
  );
};

export default DiscountList;
