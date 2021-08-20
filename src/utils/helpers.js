export const getLocalStorage = (keyName) => window.localStorage.getItem(keyName)

export const saveLocalStorage = (keyName, payload) => {
  window.localStorage.setItem(keyName, payload)
}

export const destroyLocalStorage = (keyName) => {
  window.localStorage.removeItem(keyName)
}

export const transformToQuery = (arr, fieldName) => {
  const result = arr.reduce((acc, cur, i) => acc + `${fieldName}:"${cur}"` + `${i === arr.length - 1 ? '' : ' OR '}`, '')
  return arr.length > 1 ? `(${result})` : result
}

// source https://stackoverflow.com/questions/18379254/regex-to-split-camel-case
export const splitCamelCase = str => str.replace(/([a-z])([A-Z])/g, '$1 $2')
