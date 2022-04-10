import axios from "axios";
import { operatorsURL, businessPersistenceURL } from "../components/Config/Url";

export const operatorsService = {
  getOperators,
  getOperatorByRef,
  getRequestTypes,
  updateOperator,
  createOperator,
};

async function getOperators() {
  return axios
    .get(`${operatorsURL}`)
    .then((res) => res)
    .catch((err) => err);
}

async function getOperatorByRef(ref) {
  return axios
    .get(`${operatorsURL}/${ref}`)
    .then((res) => res)
    .catch((err) => err);
}

async function createOperator() {
  return axios
    .post(`${operatorsURL}`, {})
    .then((res) => res)
    .catch((err) => err);
}

async function updateOperator(
  name,
  oib,
  typeRefArray,
  sblAccountIdArray,
  sblBillingAccountIdArray,
  sblBillingProfileIdArray,
  sblBillingProfileNameArray,
  reportArray
) {
  console.log(
    "bodyUpdateSerrr",
    name,
    oib,
    typeRefArray,
    sblAccountIdArray,
    sblBillingAccountIdArray,
    sblBillingProfileIdArray,
    sblBillingProfileNameArray,
    reportArray
  );
  let reportTypesList = [];
  for (let i = 0; i < reportArray.length; i++) {
    var reports = {
      reportType: reportArray[i],
    };
    reportTypesList.push(reports);
  }

  let requestTypesList = [];
  for (let i = 0; i < typeRefArray.length; i++) {
    var requests = {
      requestTypeRef: typeRefArray[i],
      sblAccountId: sblAccountIdArray[i],
      sblBillingAccountId: sblBillingAccountIdArray[i],
      sblBillingProfileId: sblBillingProfileIdArray[i],
      sblBillingProfileName: sblBillingProfileNameArray[i],
    };
    requestTypesList.push(requests);
  }

  return axios
    .put(`${operatorsURL}`, {
      operatorName: name,
      operatorReferenceId: oib,
      operatorReportTypes: reportTypesList,
      requestTypeList: requestTypesList,
    })
    .then((res) => res)
    .catch((err) => err);
}

async function getRequestTypes() {
  return axios
    .get(`${businessPersistenceURL}/requestTypes`)
    .then((res) => res)
    .catch((err) => err);
}
