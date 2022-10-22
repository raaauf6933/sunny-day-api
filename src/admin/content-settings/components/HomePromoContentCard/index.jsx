import React from "react";
import { makeStyles } from "@mui/styles";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
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

const HomePromoContentCard = (props) => {
  const { change, data, submit, disabled } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Card>
        <CardHeader title={"Home Page Promo Details"} />
        <Divider variant="fullWidth" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={12} item>
              <Typography variant="h6">Promo Images</Typography>
              <FileUpload
                onChange={(e) =>
                  change({
                    target: {
                      name: "promo_pictures",
                      value: e,
                    },
                  })
                }
                value={data.promo_pictures}
                maxFiles={4}
                accept="image/png, image/jpeg"
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} item>
              <Typography variant="h6">Description</Typography>
              <RichTextEditor
                initialValue={data.description}
                onEditorChange={(value) =>
                  change({
                    target: {
                      name: "description",
                      value,
                    },
                  })
                }
              />
            </Grid>{" "}
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={submit} disabled={disabled}>
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default HomePromoContentCard;
