import axios from "axios";
import { operatorsURL } from "../components/Config/Url";

export const operatorsService = {
  getOperators,
};

async function getOperators() {
  return axios
    .get(`${operatorsURL}`)
    .then((res) => res)
    .catch((err) => err);
}
