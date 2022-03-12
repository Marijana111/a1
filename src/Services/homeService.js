import axios from "axios";
import { homeURL, requestsURL, faultOrdersURL } from "../components/Config/Url";

export const homeService = {
  getTodayRequests,
  getRequestsActive,
  getTodayFaultOrders,
  getFaultOrdersActive,
  getLastFiveRequests,
  getLastFiveFaultOrders,
};

async function getTodayRequests(date) {
  return axios
    .get(
      `${homeURL}/orders?numRecords=1&dateFrom=${date} 00:00:00&dateTo=${date} 23:59:00`
    )
    .then((res) => res)
    .catch((err) => err);
}

async function getRequestsActive() {
  return axios
    .get(
      `${homeURL}/orders?numRecords=1&statusName=PRIHVAĆEN&statusName=INFO&statusName=INITIAL`
    )
    .then((res) => res)
    .catch((err) => err);
}

async function getTodayFaultOrders(date) {
  return axios
    .get(
      `${homeURL}/faultOrders?numRecords=1&dateFrom=${date} 00:00:00&dateTo=${date} 23:59:00`
    )
    .then((res) => res)
    .catch((err) => err);
}

async function getFaultOrdersActive() {
  return axios
    .get(
      `${homeURL}/faultOrders?numRecords=1&statusName=PRIHVAĆEN&statusName=INFO&statusName=INITIAL&statusName=REALIZIRAN_NOK`
    )
    .then((res) => res)
    .catch((err) => err);
}

async function getLastFiveRequests() {
  return axios
    .get(`${requestsURL}?numRecords=5&sortBy=-requestId`)
    .then((res) => res)
    .catch((err) => err);
}

async function getLastFiveFaultOrders() {
  return axios
    .get(`${faultOrdersURL}?numRecords=5&sortBy=-requestId`)
    .then((res) => res)
    .catch((err) => err);
}
