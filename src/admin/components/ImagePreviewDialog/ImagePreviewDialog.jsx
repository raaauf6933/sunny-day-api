/* eslint-disable jsx-a11y/alt-text */
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(
  () => ({
    "@-webkit-keyframes zoom": {
      from: { WebkitTransform: "scale(0)" },
      to: { WebkitTransform: "scale(1)" },
    },
    "@keyframes zoom": {
      from: { transform: "scale(0)" },
      to: { transform: "scale(1)" },
    },
    close: {
      color: "#f1f1f1",
      cursor: "pointer",
      fontSize: "40px",
      fontWeight: "bold",
      position: "absolute",
      right: "35px",
      top: "15px",
      transition: " 0.3s",
    },
    imageCaption: {
      color: "#ccc",
      display: "block",
      height: "150px",
      margin: "auto",
      maxWidth: "700px",
      padding: "10px 0",
      textAlign: "center",
      width: "80%",
    },
    modal: {
      backgroundColor: "rgba(0,0,0,0.9)",
      display: "none",
      height: "100%",
      left: 0,
      overflow: "auto",
      paddingTop: "100px",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 3000,
    },
    modalClose: {
      display: "none",
    },
    modalContent: {
      WebkitAnimation: "$zoom 0.6s",
      animation: `$zoom 0.6s`,
      display: "block",
      margin: "auto",
      maxWidth: "700px",
      width: "80%",
    },
    modalOpen: {
      display: "block",
    },
  }),
  { name: "ImagePreviewDialog" }
);

const ImagePreviewDialog = (props) => {
  const { imageSrc, isOpenModal, setIsOpenModal, caption } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classNames(classes.modal, {
        [classes.modalOpen]: isOpenModal,
        [classes.modalClose]: !isOpenModal,
      })}
    >
      <span className={classes.close} onClick={() => setIsOpenModal(false)}>
        &times;
      </span>
      <img className={classes.modalContent} src={imageSrc} />
      {caption ? <div className={classes.imageCaption}>{caption}</div> : null}
    </div>
  );
};

export default ImagePreviewDialog;
