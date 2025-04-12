import getCookie from "@/util/getCookie";

const jsonHeader = {
  "content-type": "application/json",
}

const jsonHeaderWithToken = {
  "content-type": "application/json",
  "Authorization": `Bearer ${getCookie("accessToken")}`,
  "refreshToken": `${getCookie("refreshToken")}`,
}

export { jsonHeader, jsonHeaderWithToken };
