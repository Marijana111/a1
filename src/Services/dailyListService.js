import axios from "axios";
import {
  requestsURL,
  faultOrdersURL,
  businessPersistenceURL,
} from "../components/Config/Url";

export const dailyListService = {
  getRequests,
  getFaultOrders,
  confirmOrder,
};

async function getRequests() {
  let url = `${requestsURL}?numRecords=10000&sortBy=-requestId&backOfficeAction=true`;
  return axios
    .get(url)
    .then((res) => res)
    .catch((err) => err);
}

async function getFaultOrders() {
  let url = `${faultOrdersURL}?numRecords=10000&sortBy=-requestId&backOfficeAction=true`;
  return axios
    .get(url)
    .then((res) => res)
    .catch((err) => err);
}

async function confirmOrder(id) {
  let url = `${businessPersistenceURL}/order/${id}?backOfficeAction=false`;
  return axios
    .put(url)
    .then((res) => res)
    .catch((err) => err);
}
