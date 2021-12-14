import axios from "axios";

export const userService = {
  getUsers,
};

async function getUsers() {
  return axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => res)
    .catch((err) => err);
}
