import axios from "axios";
import { reportOrdersURL } from "../components/Config/Url";

export const reportOrdersService = {
  getReportOrders,
  getReportOrderById,
  getReportOrderByIdDetails,
};

async function getReportOrders() {
  return axios
    .get(`${reportOrdersURL}?numRecords=10000&sortBy=reportId`)
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
