import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import PlaceDetails from "./PlaceDetails";
import ReactLoading from "react-loading";
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;
  console.log(props.places);

  const styles = {
    line2: {
      borderTop: "0.5px solid rgb(230, 230, 230)",
      margin: "30px 0px",
    },
  };
  const [elRefs, setElRefs] = React.useState([]);
  React.useEffect(() => {
    setElRefs((refs) =>
      Array(props.places?.length)
        .fill()
        .map((_, i) => refs[i] || React.createRef())
    );
  }, [props.places]);
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <center>
            <Typography
              variant={props.isMobile ? "subtitle1" : "h6"}
              sx={{ p: 3 }}
            >
              Stays Available For Your Destination
            </Typography>
          </center>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "scroll",
            mt: 4,
          }}
        >
          {/* <Skeleton variant="rectangular" height="100%" /> */}
          {props.isLoading ? (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10vh",
              }}
            >
              <ReactLoading
                type="bubbles"
                color="  #EB4E5F"
                height={200}
                width={100}
              />
            </Box>
          ) : (
            <>
              {props.places?.map((place, i) => (
                <Box key={i} ref={elRefs[i]}>
                  {i !== 0 && <hr style={styles.line2} />}
                  <PlaceDetails
                    isMobile={props.isMobile}
                    place={place}
                    selected={Number(props.childClicked) === i}
                    refProp={elRefs[i]}
                  />
                </Box>
              ))}
            </>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
