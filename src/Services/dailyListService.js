import axios from "axios";
import { requestsURL, faultOrdersURL } from "../components/Config/Url";

export const dailyListService = {
  getRequests,
  getFaultOrders,
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
