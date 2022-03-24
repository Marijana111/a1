export let a1Url =
  "https://056d00c1-0acf-4ee4-8fcb-00aff455555a.mock.pstmn.io/api/v1";

export let a1processorURL =
  "http://a560d6f4-56bb-49b7-a524-4021c4a7580e.mock.pstmn.io/api/v1/business";

export const businessPersistenceURL = `${a1Url}/business/persistence`;
export const requestsURL = `${a1Url}/business/persistence/orders`;
export const faultOrdersURL = `${a1Url}/business/persistence/faultOrders`;
export const reportOrdersURL = `${a1Url}/business/persistence/reportOrders`;
export const operatorsURL = `${a1Url}/business/persistence/operators`;
export const homeURL = `${a1Url}/business/persistence`;
export const orderStatusURL = `${a1processorURL}/orderStatus`;
export const faultStatusURL = `${a1processorURL}/faultStatus`;
