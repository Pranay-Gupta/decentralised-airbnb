import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../images/homeBg.jpg";
import mobileLogo from "../images/mobileWhiteLogo.png";
import logo from "../images/airbnb.png";
import SearchIcon from "@mui/icons-material/Search";
import { ConnectButton } from "web3uikit";
import { Autocomplete } from "@react-google-maps/api";
import {
  Box,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { searchFilterContext } from "../Context";
import PersonIcon from "@mui/icons-material/Person";
import { useMoralis } from "react-moralis";

const Home = ({ onLoad, onPlaceChanged }) => {
  let isMedium = useMediaQuery("(max-width:900px)");
  let isMobile = useMediaQuery("(max-width:750px)");

  const {
    destination,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
  } = useContext(searchFilterContext);
  const { account } = useMoralis();

  localStorage.setItem("destination", JSON.stringify(destination));
  localStorage.setItem("checkIn", checkIn);
  localStorage.setItem("checkOut", checkOut);
  localStorage.setItem("guests", guests);

  const navigate = useNavigate();

  const styles = {
    banner: {
      background: `url(${bg}) center center/cover no-repeat`,
      height: "100vh",
      width: "100%",
      opacity: 1,
      zIndex: -1,
      position: "absolute",
      top: 0,
      left: 0,
      "&:after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "linear-gradient(rgb(0,0,0,0.8), rgb(0,0,0,0.3))",

        opacity: 0.7,
        zIndex: -10,
      },
    },

    tabs: {
      color: "white",
      display: "flex",
      justifyContent: "center",
      gap: "5rem",
      width: "80vw",
      ...(isMedium && {
        position: "absolute",
        top: "10rem",
        left: "5rem",
      }),
      ...(isMobile && {
        display: "none",
      }),
    },
    searchFields: {
      backgroundColor: "white",
      height: "65px",
      borderRadius: "100rem",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingLeft: "30px",
      width: "45rem",

      ...(isMedium && {
        position: "absolute",
        top: "15rem",

        width: "80vw",
      }),
      ...(isMobile && {
        position: "absolute",
        top: "10rem",
        p: 1,
        width: "70vw",
        flexDirection: "column",
        height: "45vh",
        borderRadius: "1rem",
      }),
    },
    inputs: {
      fontSize: "12px",
      fontWeight: "bold",
      mt: "10px",
      width: "10rem",
      ...(isMobile && {
        width: "80%",
      }),
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
    hl: {
      position: "relative",
      top: "20px",

      backgroundColor: "rgb(228, 228, 228)",
      width: "100%",
      mt: "-2rem",
      mb: "1rem",
      paddingBottom: "1px",
    },
  };

  return (
    <Box sx={styles.banner}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "2rem",
          ...(isMedium && {
            p: "1rem",
          }),
        }}
      >
        <Box>
          <img
            style={{ width: "8vw", marginRight: "3rem" }}
            src={isMedium ? mobileLogo : logo}
            alt="logo"
          />
        </Box>

        <Box sx={styles.tabs}>
          <Typography
            variant="subtitle1"
            sx={{ pb: "5px", borderBottom: "2px solid white" }}
          >
            Places To Stay
          </Typography>
          <Typography variant="subtitle1">Experiences</Typography>
          <Typography variant="subtitle1">Online Experiences</Typography>
        </Box>
        <Box display="flex">
          <ConnectButton />
          {account && (
            <IconButton
              sx={{ color: "#fff" }}
              onClick={() => navigate("/trip")}
            >
              <PersonIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box sx={styles.searchFields}>
          <Box
            style={{
              marginTop: "-5px",
              fontSize: "12px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
              ...(isMobile && {
                width: "80%",
              }),
            }}
          >
            <Box sx={styles.inputs}>
              Location
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <TextField
                  variant="standard"
                  autoFocus
                  sx={{
                    "&::placeholder": {
                      color: "gray",
                    },
                  }}
                  placeholder="Where are you going?"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                />
              </Autocomplete>
            </Box>
          </Box>
          <Box sx={isMobile ? styles.hl : styles.vl} />

          <Box sx={styles.inputs}>
            Check In
            <TextField
              variant="standard"
              type="date"
              fullWidth
              InputProps={{ disableUnderline: true }}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
              value={checkIn}
            />
          </Box>
          <Box sx={isMobile ? styles.hl : styles.vl} />
          <Box sx={styles.inputs}>
            Check Out
            <TextField
              id="outlined-basic"
              type="date"
              fullWidth
              variant="standard"
              InputProps={{ disableUnderline: true }}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
              value={checkOut}
            />
          </Box>

          <Box sx={isMobile ? styles.hl : styles.vl} />
          <Box sx={styles.inputs}>
            Guests
            {isMobile && <br />}
            <InputBase
              defaultValue={2}
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              onChange={(e) => setGuests(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#EB4E5F",
              padding: "5px",
              borderRadius: "60%",
              marginRight: "5px",

              visibility: "hidden",
              ...(destination &&
                checkIn &&
                checkOut &&
                guests && {
                  visibility: "visible",
                }),
              ...(isMobile && {
                width: "60vw",
                borderRadius: "0.5rem",
                justifyContent: "center",

                cursor: "pointer",
              }),
            }}
            onClick={() => navigate("/rentals")}
          >
            <IconButton onClick={() => navigate("/rentals")}>
              <SearchIcon
                sx={{
                  color: "white",
                  ...(isMobile && {
                    mr: 2,
                  }),
                }}
              />
              {isMobile && (
                <Typography variant="body1" color="white">
                  Search
                </Typography>
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          color: "white",
          mt: "35vh",
          ml: "10vw",
          width: "20rem",
          ...(isMobile && {
            width: "10rem",
            mt: "65vh",
            ml: "2rem",
          }),
        }}
      >
        <Typography variant={isMobile ? "h6" : "h4"}>
          Feel Adventurous
        </Typography>
        <Typography variant={isMobile ? "subtitile1" : "body1"}>
          Let us decide and discover new places to stay, live, work or just
          relax.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
