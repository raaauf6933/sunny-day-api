import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Card, CardHeader, CardContent, Divider, Button } from "@mui/material";
import NoData from "../../../components/NoData/NoData";

const RoomTypeImages = (props) => {
  const { images, uploadRoomImage } = props;

  const upload = React.useRef(null);
  const theme = useTheme();
  const media_xs = useMediaQuery(theme.breakpoints.down("sm"));

  const checkFiles = async (files) => {
    const toUpload = [];

    Array.from(files).map((file) => toUpload.push(file));

    if (toUpload.length === 0) {
      alert("error");
    } else {
      var formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));
      uploadRoomImage(formData);
    }
  };

  return (
    <>
      <Card style={{ marginTop: "1em" }}>
        <CardHeader
          title="Images"
          action={
            <>
              <Button onClick={() => upload.current.click()} variant="outlined">
                <b>Upload Image</b>
              </Button>
              <input
                style={{ display: "none" }}
                id="fileUpload"
                onChange={(event) => checkFiles(event.target.files)}
                multiple
                type="file"
                ref={upload}
                accept="image/*"
              />
            </>
          }
        />
        <Divider variant="fullWidth" />
        <CardContent>
          {/* <ImageList sx={{ width: "100%", height: "250px" }}> */}
          {media_xs ? (
            <div
              style={{
                maxWidth: "500px",
                display: "block",
                overflow: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {" "}
              {images && images.length !== 0 ? (
                images.map((image) => (
                  <ImageListItem
                    key={image.src}
                    style={{
                      margin: "5px",
                      borderRadius: "40%",
                    }}
                  >
                    <img
                      src={`${image.src}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${image.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={image.src}
                      loading="lazy"
                      style={{
                        width: "200px",
                        height: "150px",
                        borderRadius: "5%",
                      }}
                    />
                    <ImageListItemBar
                      sx={{
                        background: "none",
                        // "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        // "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        color: "black",
                        // "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        // "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                      }}
                      position="top"
                      actionPosition="left"
                      actionIcon={
                        <IconButton
                          style={{
                            background: "#0000006e",
                            outline: "none",
                            margin: "5px",
                          }}
                          sx={{ color: "#ffffffc2" }}
                        >
                          <Delete />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))
              ) : (
                <NoData />
              )}
            </div>
          ) : (
            <div>
              {" "}
              {images && images.length !== 0 ? (
                images.map((image) => (
                  <ImageListItem
                    key={image.src}
                    style={{
                      margin: "5px",
                      borderRadius: "40%",
                    }}
                  >
                    <img
                      src={`${image.src}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${image.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={image.src}
                      loading="lazy"
                      style={{
                        width: "190px",
                        height: "140px",
                        borderRadius: "5%",
                      }}
                    />
                    <ImageListItemBar
                      sx={{
                        background: "none",
                        // "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        // "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        color: "black",
                        // "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        // "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                      }}
                      position="top"
                      actionPosition="left"
                      actionIcon={
                        <IconButton
                          style={{
                            background: "#0000006e",
                            outline: "none",
                            margin: "5px",
                          }}
                          sx={{ color: "#ffffffc2" }}
                        >
                          <Delete />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))
              ) : (
                <NoData />
              )}
            </div>
          )}
          {/* <ImageListItem
            key="add"
            style={{
              margin: "5px",
              borderRadius: "15%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
          >
            {" "}
            <AddIcon
              fontSize="large"
              style={{
                fontSize: "10em",
                color: "white",
              }}
            />
          </ImageListItem> */}
          {/* </ImageList> */}
        </CardContent>
      </Card>
    </>
  );
};

export default RoomTypeImages;
