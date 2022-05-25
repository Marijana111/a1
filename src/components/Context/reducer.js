import React, { useState, useReducer } from "react";

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).jwttoken
  : "";

export const initialState = {
  token: "" || token,
  loading: false,
  errorMessage: "",
  type: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        token: action.payload.jwttoken,
        loading: false,
        errorMessage: "",
        type: action.payload.type,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        roles: action.payload.roles,
      };
    case "LOGOUT":
      return {
        ...initialState,
        token: "",
        loading: false,
        errorMessage: "",
        type: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        roles: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
