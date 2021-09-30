import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/bookings";

export function getBookings() {
  return http.get(apiEndpoint);
}

export function deleteBooking(bookingId) {
  return http.delete(apiEndpoint + "/" + bookingId);
}

export function getBooking(bookingId) {
  return http.get(apiEndpoint + "/" + bookingId);
}

export function saveBooking(booking) {
  const body = { ...booking };
  delete body._id;
  return http.post(apiEndpoint, body);
}

export function cancelBooking(booking) {
  const body = { ...booking };
  return http.post(apiEndpoint + "/" + "cancel-booking", body);
}
