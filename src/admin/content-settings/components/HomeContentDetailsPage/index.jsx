import React from "react";
import { makeStyles } from "@mui/styles";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import FileUpload from "react-material-file-upload";
import RichTextEditor from "../../../components/RichTextEditor";

const useStyles = makeStyles(
  () => ({
    header: {
      display: "flex",
      marginBottom: 0,
    },
    headerHolder: {
      display: "flex",
      alignItems: "center",
    },
    section: {
      margin: "1em 0 0 0",
    },
    statusHolder: {
      display: "flex",
      marginLeft: "10px",
    },
    pageHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "2em",
    },
    test: {
      color: "purple",
    },
  }),
  {
    name: "ContentSettings",
  }
);
const HomeContentDetailsPage = (props) => {
  const { change, data, submit, disabled } = props;
  const classes = useStyles(props);

  return (
    <>
      <div
        style={{
          marginBottom: "5em",
        }}
      >
        <div className={classes.pageHeader}>
          <div className={classes.headerHolder}>
            <PageHeader
              className={classes.header}
              inline
              title="Edit Contents"
            />
          </div>
        </div>
        <div className={classes.root}>
          <Card>
            <CardHeader title={"Home Page"} />
            <Divider variant="fullWidth" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={12} item>
                  <TextField
                    label="Heading"
                    name="home_heading"
                    variant="outlined"
                    value={data.home_heading}
                    onChange={change}
                    // disabled={!data?.new}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                  <Typography variant="h6">Description</Typography>
                  <RichTextEditor
                    initialValue={data.home_description}
                    onEditorChange={(value) =>
                      change({
                        target: {
                          name: "home_description",
                          value,
                        },
                      })
                    }
                  />
                  {/* <TextField
                    label="Description"
                    name="home_description"
                    variant="outlined"
                    value={data.home_description}
                    onChange={change}
                    // disabled={!data?.new}
                    fullWidth
                    multiline
                    rows={4}
                  /> */}
                </Grid>
                <Grid xs={12} sm={12} md={12} item>
                  <Typography variant="h6">Background Image</Typography>
                  <FileUpload
                    onChange={(e) =>
                      change({
                        target: {
                          name: "home_background",
                          value: e,
                        },
                      })
                    }
                    value={data.home_background}
                    maxFiles={1}
                    accept="image/png, image/jpeg"
                    maxSize={500000}
                    title="Drag 'n' drop some files here, or click to select files, NOTE: uploading image will replace the existing image"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={submit} disabled={disabled}>
                Save
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomeContentDetailsPage;
