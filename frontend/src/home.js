import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Outlet, Link } from "react-router-dom";
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core";
import cblogo from "./cblogo.PNG";
import image from "./bg.png";
import { DropzoneArea } from "material-ui-dropzone";
import { common } from "@material-ui/core/colors";
import Clear from "@material-ui/icons/Clear";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button);
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 400,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    backgroundColor: "#ebe9e9cc",
    height: "93vh",
    width: "90vw",
    marginTop: "25px",
    border: "3px solid #cecaca",
    borderRadius: "10px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 500,
    backgroundColor: "#07da67",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardEmpty: {
    height: "auto",
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: "none",
  },
  uploadIcon: {
    background: "white",
  },
  tableContainer: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  table: {
    backgroundColor: "transparent !important",
  },
  tableHead: {
    backgroundColor: "transparent !important",
  },
  tableRow: {
    backgroundColor: "transparent !important",
  },
  tableCell: {
    fontSize: "22px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableCell1: {
    fontSize: "14px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableBody: {
    backgroundColor: "transparent !important",
  },
  text: {
    color: "white !important",
    textAlign: "center",
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  appbar: {
    background: "white",
    boxShadow: "none",
    color: "white",
  },
  loader: {
    color: "#be6a77 !important",
  },
  myButton: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    margin: "10px",
    marginTop: "27px",
    fontSize: "17px",
  },
}));
export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  let confidence = 0;

  const sendFile = async () => {
    if (image) {
      let formData = new FormData();
      formData.append("file", selectedFile);
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      });
      if (res.status === 200) {
        setData(res.data);
      }
      setIsloading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    setIsloading(true);
    sendFile();
  }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  const heading = {
    color: "#676767",
    marginTop: "30px",
  };

  const eb = {
    marginTop: "100px",
    height: "700px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ee7747",
  };
  const lb = {
    marginTop: "100px",
    height: "700px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row-reverse",
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            <img height={"60px"} src="/logo.png" alt="" />{" "}
            <b style={{ color: "gray" }}>Vegi</b>
          </Typography>
          <div style={{ marginLeft: "350px" }}>
            <button
              className={classes.myButton}
              style={{ background: "#ee7747" }}
            >
              Potato
            </button>
            <Link to="/tomato">
              <button className={classes.myButton}>Tomato</button>
            </Link>
            <Link to="/pepper">
              <button className={classes.myButton}>Pepper</button>
            </Link>
          </div>
          <div className={classes.grow} />
          {/* <Avatar src={cblogo}>vegetables disease detection</Avatar> */}
          <h2 style={{ color: "gray", fontWeight: "normal" }}>
            Vegetables disease detection
          </h2>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        className={classes.mainContainer}
        disableGutters={true}
      >
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Card
              className={`${classes.imageCard} ${
                !image ? classes.imageCardEmpty : ""
              }`}
            >
              {image && (
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={preview}
                    component="image"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              )}
              {!image && (
                <CardContent className={classes.content}>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={
                      "Drag and drop an image of a potato plant leaf to process"
                    }
                    onChange={onSelectFile}
                  />
                </CardContent>
              )}
              {data && (
                <CardContent className={classes.detail}>
                  <TableContainer
                    component={Paper}
                    className={classes.tableContainer}
                  >
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="simple table"
                    >
                      <TableHead className={classes.tableHead}>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell1}>
                            Label:
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell1}
                          >
                            Confidence:
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className={classes.tableBody}>
                        <TableRow className={classes.tableRow}>
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.tableCell}
                          >
                            {data.class}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={classes.tableCell}
                          >
                            {confidence}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              {isLoading && (
                <CardContent className={classes.detail}>
                  <CircularProgress
                    color="secondary"
                    className={classes.loader}
                  />
                  <Typography className={classes.title} variant="h6" noWrap>
                    Processing
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
          {data && (
            <Grid item className={classes.buttonGrid}>
              <ColorButton
                variant="contained"
                className={classes.clearButton}
                color="primary"
                component="span"
                size="large"
                onClick={clearData}
                startIcon={<Clear fontSize="large" />}
              >
                Clear
              </ColorButton>
            </Grid>
          )}
        </Grid>
      </Container>
      {/* <div className="sol">
        <center>
          <h2 style={heading}>Diagnosis</h2>
          <div style={eb}>
            <h2 style={{ color: "white", fontSize: "30px" }}>
              For Early blight :
            </h2>
            <p
              style={{
                width: "500px",
                textAlign: "left",
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "inherit",
                border: "none",
              }}
            >
              Early blight is a common fungal disease that affects potato
              plants, causing dark lesions on the leaves and stems, and reducing
              the overall yield of the crop. Here are some steps you can take to
              manage early blight in your potato crop:
              <br />
              <br />
              Plant resistant varieties: Choose potato varieties that are known
              to be resistant to early blight.
              <br />
              <br />
              Crop rotation: Rotate your potato crop with other crops that are
              not in the same family (e.g. legumes, grasses) to reduce the
              buildup of fungal spores in the soil.
              <br />
              <br />
              Practice good hygiene: Remove and destroy any infected plant
              debris, and sanitize all tools and equipment to prevent the spread
              of the disease. <br /> <br /> Maintain proper spacing: Ensure that
              plants are spaced out adequately to increase air circulation and
              reduce humidity, which can promote the growth of the fungus.{" "}
              <br /> <br /> Use fungicides: If early blight is a recurring
              problem, you may need to use fungicides to control the disease.
              Consult with a local agricultural extension service or a licensed
              professional for recommendations on the best fungicide to use and
              how to apply it.
              <br />
              <br />
              By following these steps, you can help to prevent or manage early
              blight in your potato crop.
            </p>
          </div>
          <div style={lb}>
            <h2 style={heading}>: For Late blight</h2>
            <p
              style={{
                width: "500px",
                textAlign: "left",
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "inherit",
                border: "none",
              }}
            >
              Early blight is a common fungal disease that affects potato
              plants, causing dark lesions on the leaves and stems, and reducing
              the overall yield of the crop. Here are some steps you can take to
              manage early blight in your potato crop:
              <br />
              <br />
              Plant resistant varieties: Choose potato varieties that are known
              to be resistant to early blight.
              <br />
              <br />
              Crop rotation: Rotate your potato crop with other crops that are
              not in the same family (e.g. legumes, grasses) to reduce the
              buildup of fungal spores in the soil.
              <br />
              <br />
              Practice good hygiene: Remove and destroy any infected plant
              debris, and sanitize all tools and equipment to prevent the spread
              of the disease. <br /> <br /> Maintain proper spacing: Ensure that
              plants are spaced out adequately to increase air circulation and
              reduce humidity, which can promote the growth of the fungus.{" "}
              <br /> <br /> Use fungicides: If early blight is a recurring
              problem, you may need to use fungicides to control the disease.
              Consult with a local agricultural extension service or a licensed
              professional for recommendations on the best fungicide to use and
              how to apply it.
              <br />
              <br />
              By following these steps, you can help to prevent or manage early
              blight in your potato crop.
            </p>
          </div>
        </center>
      </div> */}
    </React.Fragment>
  );
};
