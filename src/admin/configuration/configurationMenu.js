import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export const createConfigurationMenu = () => {
  return [
    {
      description: "Define types of Discount",
      icon: <LocalOfferIcon fontSize="inherit" viewBox="0 0 44 44" />,
      title: "Discounts",
      url: "/admin/discounts",
    },
  ];
};
