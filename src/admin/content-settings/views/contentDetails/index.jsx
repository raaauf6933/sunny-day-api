import React from "react";
import FormComponent from "../../../components/Form/Form";
import HomeContentDetailsPage from "../../components/HomeContentDetailsPage";
import {
  GET_CONTENT_SETTINGS,
  UPDATE_CONTENT_SETTINGS_HOMEPAGE,
  UPDATE_CONTENT_SETTINGS_HOMEPAGE_PROMO,
  UPDATE_GALLERY_IMAGES,
} from "../../api";
import AppStateContext from "../../../context/AppState/context";
import apiAxios from "./../../../../apiAxios";
import HomePromoContentCard from "../../components/HomePromoContentCard";
import useFetch from "../../../../hooks/useFetch";
import HomeGalleryContent from "../../components/HomeGalleryContent";
import { useSnackbar } from "notistack";

const ContentDetails = () => {
  const { appStateDispatch } = React.useContext(AppStateContext);

  const { enqueueSnackbar } = useSnackbar();

  const { response } = useFetch({
    url: GET_CONTENT_SETTINGS,
  });

  const homeContentDataDb = response?.data;

  const homeContentdata = {
    home_heading: homeContentDataDb?.home_heading || "",
    home_description:
      homeContentDataDb?.home_description || "<p>Initial Content</p>",
    home_background: [],
  };

  const homePromoData = {
    promo_pictures: [],
    description:
      homeContentDataDb?.home_description2 || "<p>Initial Content</p>",
  };

  const galleryData = {
    gallery_images: [],
  };

  const handleSaveHomePageDetails = async (e) => {
    const form_data = new FormData();
    e.home_background.map((e) => form_data.append("files", e));
    form_data.append(
      "data",
      JSON.stringify({
        home_heading: e.home_heading,
        home_description: e.home_description,
      })
    );
    try {
      await apiAxios(
        {
          url: UPDATE_CONTENT_SETTINGS_HOMEPAGE,
          method: "POST",
          data: form_data,
          headers: {
            "Content-Type": "multipart/form-data",
            data: "application/json",
          },
        },
        appStateDispatch
      );
    } catch (error) {}

    enqueueSnackbar("Update on process, will take few minutes to apply.", {
      variant: "success",
    });
  };

  const handleSaveHomePagePromoDetails = async (e) => {
    const form_data = new FormData();
    e.promo_pictures.map((e) => form_data.append("files", e));
    form_data.append(
      "data",
      JSON.stringify({
        description: e.description,
      })
    );
    try {
      await apiAxios(
        {
          url: UPDATE_CONTENT_SETTINGS_HOMEPAGE_PROMO,
          method: "POST",
          data: form_data,
          headers: {
            "Content-Type": "multipart/form-data",
            data: "application/json",
          },
        },
        appStateDispatch
      );
    } catch (error) {}

    enqueueSnackbar("Update on process, will take few minutes to apply.", {
      variant: "success",
    });
  };

  const handleSaveGalleryImage = async (e) => {
    const form_data = new FormData();

    e.gallery_images.map((e) => form_data.append("files", e));

    form_data.append(
      "data",
      JSON.stringify({
        id: "test_place_holder",
      })
    );

    await apiAxios(
      {
        url: UPDATE_GALLERY_IMAGES,
        method: "POST",
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
          data: "application/json",
        },
      },
      appStateDispatch
    );

    enqueueSnackbar("Update on process, will take few minutes to apply.", {
      variant: "success",
    });
  };

  return (
    <>
      <FormComponent
        initial={homeContentdata}
        onSubmit={handleSaveHomePageDetails}
      >
        {({ change, data, hasChanged, submit }) => (
          <>
            <HomeContentDetailsPage
              change={change}
              data={data}
              submit={submit}
              disabled={!hasChanged}
            />
          </>
        )}
      </FormComponent>
      <FormComponent
        initial={homePromoData}
        onSubmit={handleSaveHomePagePromoDetails}
      >
        {({ change, data, hasChanged, submit }) => (
          <>
            <HomePromoContentCard
              change={change}
              data={data}
              submit={submit}
              disabled={!hasChanged}
            />
          </>
        )}
      </FormComponent>
      <FormComponent initial={galleryData} onSubmit={handleSaveGalleryImage}>
        {({ change, data, hasChanged, submit }) => (
          <>
            <HomeGalleryContent
              change={change}
              data={data}
              submit={submit}
              disabled={!hasChanged}
            />
          </>
        )}
      </FormComponent>
    </>
  );
};

export default ContentDetails;
