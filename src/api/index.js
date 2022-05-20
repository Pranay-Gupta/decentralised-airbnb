import axios from "axios";

export const getData = async (bound, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bound.sw_lat,
          tr_latitude: bound.ne_lat,
          bl_longitude: bound.sw_lng,
          tr_longitude: bound.ne_lng,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
