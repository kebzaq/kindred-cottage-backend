import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit, showDelete } from "./addEditBooking.js";

let bookingDiv = null;
let bookingTable = null;
let bookingTableHandler = null;

export const handleBooking = () => {
    bookingDiv = document.getElementById("booking");
  const logoff = document.getElementById("logoff");
  const addBooking = document.getElementById("add-booking");
  bookingTable = document.getElementById("booking-table");
  bookingTableHandler = document.getElementById("booking-table-header");

  bookingDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addBooking) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);

        message.textContent = "You have been logged off.";

        bookingTable.replaceChildren([bookingTableHeader]);

        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        enableInput(false);
        // showDelete(e.target.dataset.id);
        let method = "DELETE";
        let url = `/api/v1/todos/${e.target.dataset.id}`;
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 204) {
            message.textContent = data.msg;
            await showBooking();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      }
    }
  });
};
// to show all bookings
export const showBooking = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/booking", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [bookingTableHandler];

    if (response.status === 200) {
      if (data.count === 0) {
        bookingTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.bookings.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.todos[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.todos[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.bookings[i].startDate}</td>
            <td>${data.bookings[i].startDate}</td>
            <td>${data.bookings[i].numberOfGuests}</td>
            <td>${data.bookings[i].numberOfNights}</td>
            <td>${data.bookings[i].status}</td>
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        bookingTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
//   setDiv(bookingDiv);
};
