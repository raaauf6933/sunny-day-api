import { useSnackbar as SnackBar } from "notistack";

export function Notify({ message, type }) {
  const { enqueueSnackbar } = SnackBar();

  return enqueueSnackbar(message, {
    variant: type,
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
}
