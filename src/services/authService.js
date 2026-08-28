import tokenService from "./tokenService"

const BASE_URL = '/api/auth/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => res.json().then(payload => ({ ok: res.ok, payload })))
  .then(({ ok, payload }) => {
    if(ok && payload.token) return payload;
    throw new Error(payload.error || 'Could not create account')
  })
  .then(({ token }) => {
    tokenService.setToken(token)
  })
}

function getUser() {
  return tokenService.getUserFromToken()
}

function logout() {
  tokenService.removeToken()
}

function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
  .then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad Credentials!")
  })
  .then(({ token }) => tokenService.setToken(token));
}

// eslint-disable-next-line
export default {
  signup,
  getUser,
  logout,
  login,
};
