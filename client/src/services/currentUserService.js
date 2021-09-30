import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/me";

export function getMe() {
  return http.get(apiEndpoint);
}
