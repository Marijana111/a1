import axios from "axios";
import { requestsURL, orderStatusURL } from "../components/Config/Url";

export const requestService = {
  getRequests,
  getRequestById,
  getRequestByIdDetails,
  createStatusWithParameters,
  createStatusNoParameters,
};

async function getRequests(
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
    guid: guid,
    adapterId: adapterId,
    dateFrom: dateFrom,
    dateTo: dateTo,
    operator: operator,
    type: type,
    category: category,
    status: status,
    statusInt: statusInt,
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

  console.log(params.toString());

  let myParams = params == "" ? "" : "&" + params.toString();

  let url = `${requestsURL}?numRecords=10000&sortBy=-requestId${myParams}`;
  console.log("url", url);
  return axios
    .get(url)
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

async function createStatusWithParameters({ data, requestId, status }) {
  return axios
    .post(`${orderStatusURL}`, {
      data,
      requestId,
      status,
    })
    .then((res) => res)
    .catch((err) => err);
}

async function createStatusNoParameters({ requestId, status }) {
  return axios
    .post(`${orderStatusURL}`, {
      requestId,
      status,
    })
    .then((res) => res)
    .catch((err) => err);
}
