import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/rooms";

export function getRooms() {
  return http.get(apiEndpoint);
}

export function getRoom(roomId) {
  return http.get(apiEndpoint + "/" + roomId);
}

export function saveRoom(room) {
  return http.post(apiEndpoint, room);
}
