import axios from "axios";
import { LOGIN_USER, LOGOUT_USER } from "./types";

export async function loginUser(dataToSubmit) {
  // const request = axios
  //   .post("/api/users/login", dataToSubmit)
  //   .then((response) => {
  //     console.log(response.data);
  //     return response.data;
  //   });
  const request = await axios.post("https://ggg-server.herokuapp.com/api/users/login", dataToSubmit);
  console.log(request);
  return {
    type: LOGIN_USER,
    payload: request.data.userId,
  };
}

export function logoutUser() {
  const data = axios.post("https://ggg-server.herokuapp.com/api/users/logout");

  return {
    type: LOGOUT_USER,
    payload: data,
  };
}