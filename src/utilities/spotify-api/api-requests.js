import axios from "axios";

const HEADERS = {
  Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

export async function request(url, params = {}) {
  return axios
    .get("https://api.spotify.com/v1" + url, {
      headers: HEADERS,
      params: params,
    })
    .then(({ status, data }) => {
      return { status, data };
    });
}

export async function aggrRequest(url, params = {}) {
  let status;
  let items = [];
  let offset = 0;
  let total;
  do {
    Object.assign(params, { offset: offset });
    await request(url, params).then(({ status: _status, data }) => {
      status = _status;
      items = items.concat(data.items);
      total = data.total;
      offset += data.limit;
    });
  } while (offset < total);
  return { status, data: items };
}
