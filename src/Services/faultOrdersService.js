import axios from "axios";
import { faultOrdersURL, faultStatusURL } from "../components/Config/Url";

export const faultOrdersService = {
  getFaultOrders,
  getFaultOrderById,
  getFaultOrderByIdDetails,
  createStatusWithParameters,
  createStatusNoParameters,
};

async function getFaultOrders(
  caseId,
  guid,
  adapterId,
  dateFrom,
  dateTo,
  operator,
  type,
  category,
  status,
  statusInt
) {
  const x = {
    requestId: caseId,
    requestGuid: guid,
    adapterId: adapterId,
    dateFrom: dateFrom,
    dateTo: dateTo,
    operatorName: operator,
    requestType: type,
    requestCategory: category,
    statusName: status,
    internalStatusName: statusInt,
  };

  let params = new URLSearchParams(x);
  let keysForDel = [];
  params.forEach((value, key) => {
    if (value == "") {
      keysForDel.push(key);
    }
    if (value == 0) {
      keysForDel.push(key);
    }
    if (value == "null") {
      keysForDel.push(key);
    }
  });

  keysForDel.forEach((key) => {
    params.delete(key);
  });

  let myParams = params == "" ? "" : "&" + params.toString();

  let url = `${faultOrdersURL}?numRecords=10000&sortBy=-requestId${myParams}`;
  return axios
    .get(url)
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
