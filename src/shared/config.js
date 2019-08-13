const getOrThrow = val => {
  const errorMsg = val => `App not properly configured, missing ${val}`

  if (process.env[val]) {
    return process.env[val]
  }

  throw new Error(errorMsg(val))
}

export const API_BASEURL = getOrThrow('REACT_APP_API_BASEURL')
