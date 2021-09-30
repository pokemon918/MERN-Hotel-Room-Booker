import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/reset-password";

export function resetPassword(user) {
  return http.post(apiEndpoint, {
    password: user.password,
    email: user.email,
  });
}
