import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/forgot-password";

export function forgotPassword(user) {
  return http.post(apiEndpoint, {
    email: user.email,
  });
}
