import axios from "axios";
import { businessPersistenceURL } from "../components/Config/Url";

export const selectService = {
  getOperators,
  getRequestTypes,
};

async function getOperators() {
  return axios
    .get(`${businessPersistenceURL}/operators`)
    .then((res) => res)
    .catch((err) => err);
}

async function getRequestTypes() {
  return axios
    .get(`${businessPersistenceURL}/requestTypes`)
    .then((res) => res)
    .catch((err) => err);
}
