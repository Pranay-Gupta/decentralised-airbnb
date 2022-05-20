import React, { createContext, useState } from "react";

export const searchFilterContext = createContext();

const Context = ({ children }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [checkOut, setCheckOut] = useState(
    new Date().toISOString().split("T")[0]
  );
  //  const [destination,setDestination] = useState('')
  const [guests, setGuests] = useState(2);
  return (
    <searchFilterContext.Provider
      value={{
        destination,
        setDestination,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
      }}
    >
      {children}
    </searchFilterContext.Provider>
  );
};

export default Context;
