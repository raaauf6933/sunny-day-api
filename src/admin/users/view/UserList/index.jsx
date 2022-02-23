import React from "react";
import ApiAxios from "./../../../../apiAxios";
import AppStateContext from "../../../context/AppState/context";
import { GET_USERS, GET_USER, CREATE_USER } from "./../../api";
import UserListPage from "./../../components/UserListPage";
import UserDetailsDialog from "../../components/UserDetailsDialog";
import createDialogActionHandlers from "./../../../utils/createDialogActionHandlers";
import { useLocation, useNavigate } from "react-router-dom";
import { parse as parseQs } from "qs";
import { userUrl } from "./../../url";
import { useSnackbar } from "notistack";

const UserList = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = React.useState();
  const [user, setUser] = React.useState();
  const location = useLocation();
  const navigate = useNavigate();
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const fetchUsers = async () => {
    try {
      const result = await ApiAxios(
        { url: GET_USERS, method: "GET" },
        appStateDispatch
      );
      setUsers(result.data);
    } catch (error) {}
  };

  const fetchUser = async (id) => {
    try {
      const result = await ApiAxios(
        { url: GET_USER, method: "POST", data: { id } },
        appStateDispatch
      );
      setUser(result.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (params?.action === "userDialog" && params?.type === "edit") {
      fetchUser(params?.id);
    }
  }, [params?.id]);

  const createUser = async (data) => {
    try {
      await ApiAxios(
        { url: CREATE_USER, method: "POST", data },
        appStateDispatch
      );

      enqueueSnackbar("User Saved!", {
        variant: "success",
      });
      fetchUsers();
    } catch (error) {
      enqueueSnackbar("Something Went Wrong!", {
        variant: "error",
      });
    }
  };

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    null,
    userUrl,
    params
  );

  return (
    <div>
      <UserListPage
        users={users}
        openModal={(data) => openModal("userDialog", data)}
      />
      <UserDetailsDialog
        open={params.action === "userDialog"}
        createUser={createUser}
        user={user}
        params={params}
        onClose={closeModal}
      />
    </div>
  );
};

export default UserList;
