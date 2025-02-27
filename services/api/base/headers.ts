import getCookie from "@/util/getCookie";

const jsonHeader = {
  "content-type": "application/json",
}

const jsonHeaderWithToken = {
  "content-type": "application/json",
  "Authorization": `Bearer ${getCookie("token")}`,
}

export {jsonHeader, jsonHeaderWithToken};
