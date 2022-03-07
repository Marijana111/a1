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
  //   let getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId`;
  //   switch (getUrl) {
  //     case caseId:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&caseID=${caseId}`;
  //       break;
  //     case guid:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&requestGuid=${guid}`;
  //       break;
  //     case adapterId:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&adapterId=${adapterId}`;
  //       break;
  //     case dateFrom:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&requestDateInsert=${dateFrom}`;
  //       break;
  //     case dateTo:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&requestDateFinish=${dateTo}`;
  //       break;
  //     case operator:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&operatorName=${operator}`;
  //       break;
  //     case type:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&requestType=${type}`;
  //       break;
  //     case category:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&requestCategory=${category}`;
  //       break;
  //     case status:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&statusName=${status}`;
  //       break;
  //     case statusInt:
  //       getUrl = `${requestsURL}?numRecords=10000&sortBy=-requestId&statusRef=${statusInt}`;
  //       break;
  //     default:
  //       getUrl = getUrl;
  //   }
  return axios
    .get(
      `${requestsURL}?numRecords=10000&sortBy=-requestId&caseId=${caseId}&requestGuid=${guid}&adapterId=${adapterId}&requestDateInsert=${dateFrom}&requestDateFinish=${dateTo}&operatorName=${operator}&requestType=${type}&requestCategory=${category}&statusName=${status}&statusRef=${statusInt}`
    )
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
