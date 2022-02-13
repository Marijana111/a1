import axios from "axios";
import { requestsURL } from "../components/Config/Url";

export const requestService = {
  getRequests,
  getRequestById,
  getRequestByIdDetails,
};

async function getRequests() {
  return axios
    .get(`${requestsURL}`)
    .then((res) => res)
    .catch((err) => err);
}

async function getRequestById(id) {
  return axios
    .get(`${requestsURL}/${id}`)
    .then((res) => res)
    .catch((err) => err);
}

async function getRequestByIdDetails(id) {
  return axios
    .get(`${requestsURL}/${id}/details`)
    .then((res) => res)
    .catch((err) => err);
}
