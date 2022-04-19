import axios from "axios";
import { userURL } from "../components/Config/Url";

export const userService = {
  login,
};

async function login(password, userName) {
  return axios
    .post(`${userURL}/user/login`, {
      password,
      userName,
    })
    .then((res) => res)
    .catch((err) => err);
}
