// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;
contract aibnb{
  
  address public owner;

    constructor(){
    owner = msg.sender;
    }

   struct BookingDetails{
       string name;         // rental name
       string destination;
       string bookingDate;
       string imageUrl;
   
   }
   event newDatebooked(
       string name,
       string destination,
       string bookingDate,
       string imageUrl
   );

   mapping(address => BookingDetails[]) bookings;

   function addNewBooking(string memory name,string memory destination,string memory bookingDate,string memory imageUrl) public payable{
      
    //   BookingDetails[] memory newBooking = bookings[msg.sender] ;
    //     uint index = newBooking.length;
    //     newBooking[index].name = name;
    //     newBooking[index].destination = destination;
    //     newBooking[index].bookingDate = bookingDate;
    //     newBooking[index].imageUrl = imageUrl;

        // BookingDetails memory newBooking;
        // newBooking.name = name;
        // newBooking.destination = destination;
        // newBooking.bookingDate = bookingDate;
        // newBooking.imageUrl = imageUrl;
        // bookings[msg.sender].push(newBooking);

         bookings[msg.sender].push(BookingDetails(
            name,destination,bookingDate,imageUrl
        ));

        
        payable(owner).transfer(msg.value);
        emit newDatebooked(name,destination,bookingDate,imageUrl);
   }

    function showAllBookings() public view returns (BookingDetails[] memory){
        return bookings[msg.sender];
    }
    function noOfBookings() public view returns (uint256) {
        return bookings[msg.sender].length ;
    }
}