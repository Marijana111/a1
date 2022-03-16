import axios from "axios";
import { reportOrdersURL } from "../components/Config/Url";

export const reportOrdersService = {
  getReportOrders,
  getReportOrderById,
  getReportOrderByIdDetails,
};

async function getReportOrders(caseId, guid, operator, type, dateFrom, dateTo) {
  const x = {
    reportId: caseId,
    reportGuid: guid,
    operatorName: operator,
    reportType: type,
    dateFrom: dateFrom,
    dateTo: dateTo,
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

  let url = `${reportOrdersURL}?numRecords=10000&sortBy=-reportId${myParams}`;
  return axios
    .get(url)
    .then((res) => res)
    .catch((err) => err);
}

async function getReportOrderById(id) {
  return axios
    .get(`${reportOrdersURL}/${id}`)
    .then((res) => res)
    .catch((err) => err);
}

async function getReportOrderByIdDetails(id) {
  return axios
    .get(`${reportOrdersURL}/${id}/details`)
    .then((res) => res)
    .catch((err) => err);
}
