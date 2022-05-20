import React from "react";
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { Rating, Button, Box, useMediaQuery } from "@mui/material";
import styled from "styled-components";

const PlaceDetails = ({ selected, place, refProp, isMobile }) => {
  const isSmall = useMediaQuery("(max-width:420px)");
  const rentalsList = {
    attributes: {
      unoDescription: "2 Guests • 2 Beds • 1 Rooms",
      dosDescription: "Wifi • Kitchen • Living Area",
    },
  };

  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#EB4E5F",
    },
  });

  const styles = {
    rentalDivH: {
      animation: "mymove 5s",
      borderRadius: "20px",
      "@keyframes mymove": {
        from: {
          backgroundColor: "#dddddd",
        },

        to: {
          backgroundColor: "#dddddd00",
        },
      },
    },

    rentalDiv: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      ...(isMobile && {
        flexDirection: "column",
      }),
    },
    rentalImg: {
      height: "200px",
      minWidth: "300px",
      borderRadius: "20px",
      marginRight: "20px",
      ...(isMobile && {
        width: "100%",
        m: 0,
        height: "300px",
      }),
      ...(isSmall && {
        height: "200px",
      }),
    },
    rentalInfo: {
      padding: "10px",
      width: "100%",
    },
    rentalTitle: {
      fontSize: "23px",
      marginBottom: "15px",
      ...(isMobile && {
        fontSize: "18px",
        mb: 1,
      }),
    },
    rentalDesc: {
      color: "gray",
      marginTop: "5px",
      ...(isMobile && {
        fontSize: "14px",
      }),
    },
    bottomButton: {
      marginTop: "20px",
      justifyContent: "space-between",
      display: "flex",
      width: "100%",
      alignItems: "center",
      ...(isMobile && {
        fontSize: "18px",
        mt: 1,
      }),
    },
    price: {
      display: "flex",
      justifyContent: "end",
      gap: "5px",
      color: "#808080",
      fontSize: "12px",
    },
  };

  return (
    <Box sx={selected && styles.rentalDivH}>
      <Box sx={styles.rentalDiv}>
        <img
          style={styles.rentalImg}
          src={
            place.photo
              ? place.photo.images.large.url
              : "https://imgs.search.brave.com/eoIZlg2L0ttNGXCr45Nq_l3TtsSqY7MQ3YlS5n6jIqs/rs:fit:789:883:1/g:ce/aHR0cHM6Ly9sZWlm/ZXJwcm9wZXJ0aWVz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/Tk8tSU1BR0UtQVZB/SUxBQkxFLmpwZw"
          }
          alt="place"
        />
        <Box sx={styles.rentalInfo}>
          <Box sx={styles.rentalTitle}>{place.name}</Box>
          <Box sx={styles.rentalDesc}>
            {rentalsList.attributes.unoDescription}
          </Box>
          <Box sx={styles.rentalDesc}>
            {rentalsList.attributes.dosDescription}
          </Box>
          <Box
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              ...(isMobile && {
                justifyContent: "space-between",
              }),
            }}
          >
            <StyledRating
              name="read-only"
              size="small"
              value={Number(place.rating)}
              readOnly
              precision={0.5}
            />
            <Box>
              <span
                style={{
                  marginLeft: "5px",
                  fontWeight: "bold",
                  ...(isMobile && {
                    fontSize: "14px",
                  }),
                }}
              >
                {Number(place.rating)}
              </span>
              <span
                style={{
                  color: "gray",
                  marginLeft: "5px",
                  ...(isMobile && {
                    fontSize: "14px",
                  }),
                }}
              >
                ({place.num_reviews} reviews)
              </span>
            </Box>
          </Box>
          <Box sx={styles.bottomButton}>
            <Link
              to={"/details"}
              style={{ textDecoration: "none" }}
              state={place}
            >
              <Button
                size="small"
                variant="outlined"
                sx={{
                  color: "#d44957",
                  borderColor: "#d44957",
                  ":hover": {
                    borderColor: "#d44957",
                  },
                }}
              >
                Details
              </Button>
            </Link>
            <Box sx={styles.price}>
              <Icon fill="#808080" size={10} svg="matic" />
              {place.rating ? Number(place.rating) / 50 : 0.07} / Day
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceDetails;
