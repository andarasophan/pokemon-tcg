export const getLocalStorage = (keyName) => window.localStorage.getItem(keyName)

export const saveLocalStorage = (keyName, payload) => {
  window.localStorage.setItem(keyName, payload)
}

export const destroyLocalStorage = (keyName) => {
  window.localStorage.removeItem(keyName)
}

export const transformToQuery = (arr, fieldName) => {
  const result = arr.reduce((acc, cur, i) => acc + `${fieldName}:"${cur}"` + `${i === arr.length - 1 ? '' : ' AND '}`, '')
  return arr.length > 1 ? `(${result})` : result
}
