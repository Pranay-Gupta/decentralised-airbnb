import React, { createRef, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/airbnbRed.png";
import mobileLogo from "../../images/mobileLogoRed.png";
import ReactLoading from "react-loading";
import { ConnectButton } from "web3uikit";
import Map from "../../components/Map";
import PlaceDetails from "../../components/PlaceDetails";
import { searchFilterContext } from "../../Context";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SwipeableEdgeDrawer from "../../components/MobileDrawer";
import { useMoralis } from "react-moralis";
const Rentals = ({
  isLoading,
  places,
  coordinates,
  setCoordinates,
  setBound,
  childClicked,
  setChildClicked,
  autocomplete,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let isMedium = useMediaQuery("(max-width:1350px)");
  let isMobile = useMediaQuery("(max-width:700px)");
  const {
    destination,
    setDestination,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
  } = useContext(searchFilterContext);
  useEffect(() => {
    setDestination(JSON.parse(localStorage.getItem("destination")));
    setCheckIn(localStorage.getItem("checkIn"));
    setCheckOut(localStorage.getItem("checkOut"));
    setGuests(localStorage.getItem("guests"));

    return () => {};
  }, []);
  const [elRefs, setElRefs] = useState([]);

  if (autocomplete) {
    localStorage.setItem(
      "lat",
      JSON.stringify(autocomplete.getPlace().geometry.location.lat())
    );
    localStorage.setItem(
      "lng",
      JSON.stringify(autocomplete.getPlace().geometry.location.lng())
    );
  }

  useEffect(() => {
    const lat = JSON.parse(localStorage.getItem("lat"));
    const lng = JSON.parse(localStorage.getItem("lng"));
    setCoordinates({ lat, lng });
  }, []);

  const { account } = useMoralis();
  const navigate = useNavigate();
  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  const styles = {
    logo: {
      width: "8vw",
      marginRight: "3rem",
      minWidth: "1.5rem",
      ...(isMedium && { width: "3vw" }),
    },
    searchReminder: {
      width: "25rem",
      border: "1.5px solid rgb(242, 242, 242)",
      borderRadius: "100px",
      height: "3rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: "2rem",
      paddingRight: "0.5rem",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      ...(isMobile && {
        display: "none",
      }),
    },
    filter: {
      fontSize: "14px",
      fontWeight: "500",
      mr: "1.75rem",
    },
    vl: {
      position: "relative",
      top: "15",
      height: "20%",
      backgroundColor: "rgb(228, 228, 228)",
      width: "1.5px",
      marginRight: "20px",
      paddingBottom: "15px",
    },
    line: {
      borderTop: "1px solid rgb(230, 229, 229)",
      mb: "0px",
    },
    rentalsContent: {
      display: "flex",
      height: "calc(100vh - 121px)",
      ...(isMedium && {
        position: "relative",
        // overflow: "hidden",
        height: "5vh",
      }),
    },
    rentalsContentL: {
      width: "45%",
      padding: "30px",
      height: "calc(100vh - 11.5rem)",
      overflowY: "scroll",
      ...(isMedium && {
        width: "100vw",
        zIndex: 1,
        mt: "51vh",
      }),
    },
    line2: {
      borderTop: "0.5px solid rgb(230, 230, 230)",
      margin: "30px 0px",
    },

    rentalsContentR: {
      width: "55%",
      ...(isMedium && {
        width: "100vw",
        position: "absolute",
        left: 0,
        top: 10,
        height: "82vh",
        zIndex: 0,
      }),
    },
  };

  return (
    <Box style={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "2rem",
          ...(isMedium && {
            p: 2,
          }),
        }}
      >
        <Box>
          <Link to="/">
            <img
              style={styles.logo}
              src={isMedium ? mobileLogo : logo}
              alt="logo"
            />
          </Link>
        </Box>
        <Box sx={styles.searchReminder}>
          <Typography varient="body1" sx={styles.filter}>
            {destination.split(",")[0]}
          </Typography>
          <Box sx={styles.vl} />
          <Typography varient="body1" sx={styles.filter}>
            {`
           ${months[parseInt(checkIn.split("-")[1], 10) - 1]} 
           ${checkIn.split("-")[2]} 
           - 
             ${months[parseInt(checkOut.split("-")[1], 10) - 1]} 
           ${checkOut.split("-")[2]} 
        
          `}
          </Typography>
          <Box sx={styles.vl} />
          <Typography varient="body1" sx={styles.filter}>
            {guests} Guest
          </Typography>
        </Box>
        <Box display="flex">
          <ConnectButton />
          {account && (
            <IconButton
              sx={{ color: "#EB4E5F" }}
              onClick={() => navigate("/trip")}
            >
              <PersonIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* <hr style={styles.line} /> */}
      <Divider />
      <Box sx={styles.rentalsContent}>
        {isMedium ? (
          <SwipeableEdgeDrawer
            places={places}
            childClicked={childClicked}
            isMobile={isMobile}
            isLoading={isLoading}
          />
        ) : (
          <Box varient="body1" sx={styles.rentalsContentL}>
            <Box>
              <Typography varient="body2" fontSize={15}>
                Stays Available For Your Destination
              </Typography>
            </Box>
            {isLoading ? (
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
              places?.map((place, i) => (
                <Box ref={elRefs[i]} key={i}>
                  {/* <hr style={styles.line2} /> */}
                  <Divider sx={{ margin: "30px 0px" }} />
                  <Box>
                    <PlaceDetails
                      place={place}
                      selected={Number(childClicked) === i}
                      refProp={elRefs[i]}
                    />
                  </Box>
                </Box>
              ))
            )}
          </Box>
        )}
        <Box sx={styles.rentalsContentR}>
          <Map
            places={places}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            destination={destination}
            setBound={setBound}
            setChildClicked={setChildClicked}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Rentals;
