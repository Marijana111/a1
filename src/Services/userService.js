import axios from "axios";
import { userURL } from "../components/Config/Url";

export const userService = {
  getUsers,
  getUserByUserName,
  updateUser,
  createUser,
  changePassword,
  deleteUser,
};

async function getUsers(password, userName) {
  return axios
    .get(`${userURL}/user/all`)
    .then((res) => res)
    .catch((err) => err);
}

async function deleteUser(ref) {
  return axios
    .delete(`${userURL}/user/${ref}`)
    .then((res) => res)
    .catch((err) => err);
}

async function getUserByUserName(userName) {
  return axios
    .get(`${userURL}/user/${userName}`)
    .then((res) => res)
    .catch((err) => err);
}

async function updateUser(
  ref,
  username,
  firstName,
  lastName,
  email,
  status,
  createdDate,
  deactivateDate,
  roles
) {
  return axios
    .put(`${userURL}/user/updateUser`, {
      ref,
      username,
      firstName,
      lastName,
      email,
      status,
      createdDate,
      deactivateDate,
      roles,
    })
    .then((res) => res)
    .catch((err) => err);
}

async function createUser(
  email,
  password,
  role,
  username,
  firstName,
  lastName
) {
  let roles = role.map((r) => ({
    name: r,
  }));
  return axios
    .post(`${userURL}/user/createUser`, {
      email,
      password,
      roles,
      username,
      firstName,
      lastName,
    })
    .then((res) => res)
    .catch((err) => err);
}

async function changePassword(
  userRef,
  confirmPassword,
  currentPassword,
  newPassword
) {
  return axios
    .post(`${userURL}/user/changePassword/${userRef}`, {
      confirmPassword,
      currentPassword,
      newPassword,
    })
    .then((res) => res)
    .catch((err) => err);
}
