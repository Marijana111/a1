import axios from "axios";

export const userService = {
  getUsers,
  getUserById,
};

async function getUsers() {
  return axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => res)
    .catch((err) => err);
}

async function getUserById(id) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => res)
    .catch((err) => err);
}
