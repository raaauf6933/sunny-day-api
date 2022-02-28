import React from "react";
import DiscountListPage from "./../components/DiscountListPage";
import ApiAxios from "./../../../apiAxios";
import AppStateContext from "../../context/AppState/context";
import { GET_DISCOUNTS } from "./../api";
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
      />
      <CreateForm
        open={params.action === "onCreateDiscount"}
        onClose={closeModal}
      />
    </>
  );
};

export default DiscountList;
