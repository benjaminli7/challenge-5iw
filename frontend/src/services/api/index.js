import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8888"
    : "https://api.game-elevate.ovh";
};

const REACT_APP_BASE_URL = getBaseUrl();

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
  if (!token) return false;
  const decodedToken = decodeJwtToken(token);
  return decodedToken?.roles?.includes("ROLE_ADMIN");
};

export function retrieveToken() {
  const token = getJwtToken();
  return token ? token : null;
}

function makeHeaders(type) {
  if (retrieveToken() !== null) {
    return {
      Authorization: `Bearer ${retrieveToken()}`,
      ContentType: type == "patch" && "application/merge-patch+json",
    };
  }
}

export function makeConfig(type) {
  return {
    headers: makeHeaders(type),
  };
}

export function makeUrl(url) {
  return `${REACT_APP_BASE_URL}/${url}`;
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

export function httpPatch(url, body) {
  return axios.patch(
      makeUrl(url),
      JSON.stringify(body),
      {
        headers: {
          ...makeHeaders(),
          'Content-Type': 'application/merge-patch+json'
        }
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