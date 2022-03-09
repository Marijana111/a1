import axios from "axios";
import { requestsURL } from "../components/Config/Url";

export const requestService = {
  getRequests,
  getRequestById,
  getRequestByIdDetails,
  createStatus,
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
  let url = `${requestsURL}?numRecords=10000&sortBy=-requestId&caseId=${caseId}&requestGuid=${guid}&adapterId=${adapterId}&requestDateInsert=${dateFrom}&requestDateFinish=${dateTo}&operatorName=${operator}&requestType=${type}&requestCategory=${category}&statusName=${status}&statusRef=${statusInt}`;
  url.replace(/[^=&]+=(?:&|$)/g, "");
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

async function createStatus({
  attachments,
  data,
  operator,
  requestId,
  status,
}) {
  return axios
    .post(`${requestsURL}`, {
      attachments,
      data,
      operator,
      requestId,
      status,
    })
    .then((res) => res)
    .catch((err) => err);
}
