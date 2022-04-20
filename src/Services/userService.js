import axios from "axios";
import { userURL } from "../components/Config/Url";

export const userService = {
  getUsers,
};

async function getUsers(password, userName) {
  return axios
    .get(`${userURL}/user/all`)
    .then((res) => res)
    .catch((err) => err);
}
