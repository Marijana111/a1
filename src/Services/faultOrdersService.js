import axios from "axios";
import { faultOrdersURL } from "../components/Config/Url";

export const faultOrdersService = {
  getFaultOrders,
  getFaultOrderById,
  getFaultOrderByIdDetails,
};

async function getFaultOrders() {
  return axios
    .get(`${faultOrdersURL}`)
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
