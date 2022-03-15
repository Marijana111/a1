import axios from "axios";
import { faultOrdersURL, faultStatusURL } from "../components/Config/Url";

export const faultOrdersService = {
  getFaultOrders,
  getFaultOrderById,
  getFaultOrderByIdDetails,
  createStatusWithParameters,
  createStatusNoParameters,
};

async function getFaultOrders() {
  return axios
    .get(`${faultOrdersURL}?numRecords=10000&sortBy=-requestId`)
    .then((res) => res)
    .catch((err) => err);
}

async function getFaultOrderById(id) {
  return axios
    .get(`${faultOrdersURL}/${id}`)
    .then((res) => res)
    .catch((err) => err);
}

async function getFaultOrderByIdDetails(id) {
  return axios
    .get(`${faultOrdersURL}/${id}/details`)
    .then((res) => res)
    .catch((err) => err);
}

async function createStatusWithParameters({ data, requestId, status }) {
  return axios
    .post(`${faultStatusURL}`, {
      data,
      requestId,
      status,
    })
    .then((res) => res)
    .catch((err) => err);
}

async function createStatusNoParameters({ requestId, status }) {
  return axios
    .post(`${faultStatusURL}`, {
      requestId,
      status,
    })
    .then((res) => res)
    .catch((err) => err);
}
