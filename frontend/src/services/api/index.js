import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getJwtToken = () => {
  return Cookies.get("_auth");
};

export const decodeJwtToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

export const isAdmin = () => {
  const token = getJwtToken();
  const decodedToken = decodeJwtToken(token);
  return decodedToken?.roles?.includes("ROLE_ADMIN");
}

export function retrieveToken() {
  const token = getJwtToken();
  return token ? token : null;
}

function makeHeaders() {
  if(retrieveToken() !== null) {
    return {
      Authorization: `Bearer ${retrieveToken()}`,
    };
  }
}

function makeConfig() {
  return {
    headers: makeHeaders(),
  };
}

export function makeUrl(url) {
  return `${process.env.REACT_APP_API_URL}/${url}`;
}

export function httpGet(url) {
  return axios.get(makeUrl(url), {
    ...makeConfig(),
  });
}

export function httpPost(url, body) {
  return axios.post(makeUrl(url), body, {
    ...makeConfig(),
  });
}

export function httpPut(url, body) {
  return axios.put(
    makeUrl(url),
    {
      ...body,
    },
    {
      ...makeConfig(),
    }
  );
}

export function httpDelete(url) {
  return axios.delete(makeUrl(url), {
    ...makeConfig(),
  });
}

export function isAuthed() {
  return retrieveToken() !== null;
}
