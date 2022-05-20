import {
  Box,
  Container,
  Divider,
  useMediaQuery,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ReactLoading from "react-loading";
import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";
import { ConnectButton } from "web3uikit";
import logo from "../images/airbnbRed.png";
import mobileLogo from "../images/mobileLogoRed.png";
const Trip = () => {
  const { account } = useMoralis();
  let isMobile = useMediaQuery("(max-width:850px)");
  const styles = {
    logo: {
      width: "6vw",
      marginRight: "3rem",
      minWidth: "6rem",
      ...(isMobile && {
        minWidth: "0.5rem ",
      }),
    },
    line: {
      borderTop: "1px solid rgb(230, 229, 229)",
      mb: "0px",
    },
  };
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const contractProcessor = useWeb3ExecuteFunction();
  const allBooking = async () => {
    let options = {
      contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
      functionName: "showMyBookings",
      abi: [
        {
          inputs: [],
          name: "showMyBookings",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "destination",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "checkIn",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "checkOut",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "imageUrl",
                  type: "string",
                },
              ],
              internalType: "struct aibnb.BookingDetails[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      params: {},
    };
    const data = await contractProcessor.fetch({
      params: options,
    });
    setTrips(...trips, data);
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    allBooking();
    setIsLoading(false);
  }, [account]);

  return (
    <Box>
      <Container
        minWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "1rem",
        }}
      >
        <Box>
          <Link to="/">
            <img
              style={styles.logo}
              src={isMobile ? mobileLogo : logo}
              alt="logo"
            ></img>
          </Link>
        </Box>
        <Box display="flex" alignItems="center">
          <ConnectButton />
        </Box>
      </Container>
      <Divider />
      <Container minWidth="xl">
        <Typography
          variant="h4"
          sx={{ mt: "2rem", mb: "2rem" }}
          color="initial"
        >
          Trips
        </Typography>
        <Divider />

        {isLoading ? (
          <ReactLoading
            type="bubbles"
            color="  #EB4E5F"
            height={200}
            width={100}
          />
        ) : trips ? (
          <Box sx={{ mt: "2rem" }}>
            <Grid container spacing={0}>
              {trips?.map((trip) => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    width: "350px  ",
                    height: "300px ",
                    p: "3rem",
                  }}
                >
                  <img
                    src={trip.imageUrl}
                    alt="place"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "100%",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <center>
                    <Typography variant="body1" color="initial">
                      {trip.name}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      From {trip.checkIn} to {trip.checkOut}
                    </Typography>
                  </center>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ mt: "2rem", mb: "2rem" }}>
            <Typography variant="h5" color="initial" gutterBottom>
              No trips booked ... yet!
            </Typography>
            <Typography variant="subtitle1" color="gray" gutterBottom>
              Time to dust off your bags and start planning your next adventure
            </Typography>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              sx={{
                color: "#d44957",
                borderColor: "#d44957",
                ":hover": {
                  borderColor: "#d44957",
                },
              }}
            >
              Start Searching
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Trip;
