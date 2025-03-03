import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showBooking } from "./booking.js";

let addEditDiv = null;
let startDate = null;
let endDate = null;
let bookingStatus = null;
let addingBooking = null;

export const handleAddEditBooking = () => {
  addEditDiv = document.getElementById("edit-booking");
  startDate = document.getElementById("startDate");
  endDate = document.getElementById("endDate");
  numberOfGuests = document.getElementById("numberOfGuests");
  numberOfNights = document.getElementById("numberOfNights");
  bookingStatus = document.getElementById("bookingStatus");
  addingBooking = document.getElementById("adding-booking");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingBooking) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/bookings";
        // edit functionality
        if (addingBooking.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/bookings/${addEditDiv.dataset.id}`;
        }
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              startDate: startDate.value,
              endDate: endDate.value,
              numberOfGuests: numberOfGuests.value,
              numberOfNights: numberOfNights.value,
              bookingStatus: bookingStatus.value,
            }),
          });

          const data = await response.json();
          if (response.bookingStatus === 200 || response.bookingStatus === 201) {
            if (response.bookingStatus === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The booking entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The booking entry was created.";
            }
              startDate.value="",
              endDate.value ="",
              numberOfGuests.value="",
              numberOfNights.value="",
              bookingStatus.value="pending",

            showBooking();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        // delete
        if (addingBooking.textContent === "delete") {
          method = "DELETE";
          // console.log(">>>>>>", addEditDiv.dataset.id);
          url = `/api/v1/bookings/${addEditDiv.dataset.id}`;
          try {
            const response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();
            if (response.bookingStatus === 200 || response.bookingStatus === 204) {
              message.textContent = data.msg;
              await showBooking();
            } else {
              message.textContent = data.msg;
            }
          } catch (err) {
            console.log(err);
            message.textContent = "A communication error occurred.";
          }
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showBooking();
      }
    }
  });
};

export const showAddEdit = async (bookingId) => {
  if (!bookingId) {
    startDate.value = "";
    endDate.value = "";
    numberOfGuests.value = "";
    numberOfNights.value = "";
    bookingStatus.value = "pending";
    addingBooking.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/booking/${bookingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.bookingStatus === 200) {
        startDate.value = data.booking.startDate;
        endDate.value = data.booking.endDate;
        numberOfGuests.value = data.booking.numberOfGuests;
        numberOfNights.value = data.booking.numberOfNights;
        bookingStatus.value = data.booking.status;
        addingBooking.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = bookingId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The bookings entry was not found";
        showBooking();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showBooking();
    }

    enableInput(true);
  }
};

export const showDelete = async (bookingId) => {
  if (!bookingId) {
    startDate.value = "";
    endDate.value = "";
    numberOfGuests.value = "";
    numberOfNights.value = "";
    bookingStatus.value = "pending";
    addingBooking.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/bookings/${bookingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.bookingStatus === 200) {
        startDate.value = data.booking.startDate;
        endDate.value = data.booking.endDate;
        numberOfGuests.value = data.booking.numberOfGuests;
        numberOfNights.value = data.booking.numberOfNights;
        bookingStatus.value = data.booking.status;
        addingBooking.textContent = "delete";
        message.textContent = "Are you sure to DELETE this booking? ";
        addEditDiv.dataset.id = bookingId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The bookings entry was not found";
        showBooking();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showBooking();
    }

    enableInput(true);
  }
};
