import Cookies from "js-cookie"

const TokenKey = "Token"

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookies(name) {
  return Cookies.get(name)
}

export function setCookies(name, value) {
  return Cookies.set(name, value)
}

export function removeCookies(name) {
  return Cookies.remove(name)
}
