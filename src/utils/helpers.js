export const getLocalStorage = (keyName) => window.localStorage.getItem(keyName)

export const saveLocalStorage = (keyName, payload) => {
  window.localStorage.setItem(keyName, payload)
}

export const destroyLocalStorage = (keyName) => {
  window.localStorage.removeItem(keyName)
}
