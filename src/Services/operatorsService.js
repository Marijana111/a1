import axios from "axios";
import { operatorsURL, businessPersistenceURL } from "../components/Config/Url";

export const operatorsService = {
  getOperators,
  getRequestTypes,
};

async function getOperators() {
  return axios
    .get(`${operatorsURL}`)
    .then((res) => res)
    .catch((err) => err);
}

async function getRequestTypes() {
  return axios
    .get(`${businessPersistenceURL}/requestTypes`)
    .then((res) => res)
    .catch((err) => err);
}
