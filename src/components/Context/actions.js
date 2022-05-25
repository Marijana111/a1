import { userURL } from "../Config/Url";

const ROOT_URL = userURL;

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/user/login`, requestOptions);
    let data = await response.json();

    if (data.status !== 401) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      localStorage.setItem("roles", JSON.stringify(data.roles));
      return data;
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
      localStorage.removeItem("userToken");
      localStorage.removeItem("roles");
      dispatch({ type: "LOGIN_ERROR", error: data.username });
    }

    return;
  } catch (error) {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("roles");
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.removeItem("userToken");
  localStorage.removeItem("roles");
}
