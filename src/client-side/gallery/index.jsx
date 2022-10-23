import React from "react";
import useFetch from "./../../hooks/useFetch";
import AppContainer from "../components/AppContainer";
import Hero from "../components/Hero";
import { Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import galleryImages from "./images.json";
import ImagePreviewDialog from "../components/ImagePreviewDialog";
import { parse as parseQs } from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import createDialogActionHandlers from "../utils/dialogActionHandlers";
import { bookingUrl } from "./url";
import { WindowTitle } from "../../admin/components/WindowTitle/WindowTitle";
import { resortName } from "./../../config";
import AppLayout from "../components/AppLayout";

const useStyles = makeStyles(
  () => ({
    img: {
      cursor: "pointer",
      transition: ".5s ease",
      "&:hover": {
        opacity: "0.3",
      },
    },
  }),
  { name: "Gallery" }
);

const Gallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles({});
  const qs = parseQs(location.search.substr(1));
  const params = qs;

  const { response } = useFetch({
    url: "get_content_settings",
  });

  const galleryImages = response?.data?.gallery_images
    ? response?.data?.gallery_images
    : [];
  console.log(response);

  const theme = useTheme();
  const media_xs = useMediaQuery(theme.breakpoints.down("sm"));

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    null,
    bookingUrl,
    params
  );

  return (
    <>
      <AppLayout awake={true}>
        <WindowTitle title={resortName("Gallery")} />
        {/* <Hero>
          <Box textAlign="center">
            <Typography variant="h1">Gallery</Typography>
          </Box>
        </Hero> */}
        <AppContainer>
          <div className="mt-5"></div>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            width="100%"
            padding="3em"
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight={600}
              sx={{
                color: "rgb(247, 177, 47)",
              }}
            >
              Our Gallery
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
              }}
              variant="h2"
            >
              Discover Our Place
            </Typography>
          </Box>
          <Box>
            <ImageList variant="masonry" cols={media_xs ? 2 : 4} gap={8}>
              {galleryImages.map((item) => (
                <ImageListItem key={item.src}>
                  <img
                    src={`${item.src}?w=348&fit=crop&auto=format`}
                    srcSet={`${item.src}?w=348&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.src}
                    loading="lazy"
                    onClick={() =>
                      openModal("showRoomImage", { roomImage: item.src })
                    }
                    className={classes.img}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <ImagePreviewDialog
            imageSrc={params.roomImage}
            isOpenModal={params.action === "showRoomImage"}
            closeModal={closeModal}
          />
        </AppContainer>
      </AppLayout>
    </>
  );
};

export default Gallery;
