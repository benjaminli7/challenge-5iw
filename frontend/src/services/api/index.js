import axios from "axios";
import { LocalStorage } from "../localStorage";

export const TOKEN = "token.auth";

export function retrieveToken() {
  const token = LocalStorage.getItem(TOKEN);
  return token ? token.access : null;
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
