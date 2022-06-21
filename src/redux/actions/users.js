import {
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USERS_DETAILS,
  GET_USERS_DETAILS_SUCCESS,
  GET_USERS_DETAILS_ERROR,
  ADD_USERS,
  ADD_USERS_SUCCESS,
  ADD_USERS_ERROR,
  UPDATE_USERS,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_ERROR,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  CHANGE_LIMIT,
  CHANGE_SKIP,
  CHANGE_PAGE,
} from "../actionType/users"
export const getUsers = (payload, callback) => {
  return {
    type: GET_USERS,
    payload: payload,
    callback,
  }
}

export const getUsersSuccess = (payload, callback) => {
  return {
    type: GET_USERS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const getUsersError = (payload, callback) => {
  return {
    type: GET_USERS_ERROR,
    payload: payload,
    callback,
  }
}

export const getUsersDetails = (payload, callback) => {
  return {
    type: GET_USERS_DETAILS,
    payload: payload,
    callback,
  }
}

export const getUsersDetailsSuccess = (payload, callback) => {
  return {
    type: GET_USERS_DETAILS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const getUsersDetailsError = (payload, callback) => {
  return {
    type: GET_USERS_DETAILS_ERROR,
    payload: payload,
    callback,
  }
}

export const addUsers = (payload, callback) => {
  return {
    type: ADD_USERS,
    payload: payload,
    callback,
  }
}

export const addUsersSuccess = (payload, callback) => {
  return {
    type: ADD_USERS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const addUsersError = (payload, callback) => {
  return {
    type: ADD_USERS_ERROR,
    payload: payload,
    callback,
  }
}

export const updateUsers = (payload, callback) => {
  return {
    type: UPDATE_USERS,
    payload: payload,
    callback,
  }
}

export const updateUsersSuccess = (payload, callback) => {
  return {
    type: UPDATE_USERS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const updateUsersError = (payload, callback) => {
  return {
    type: UPDATE_USERS_ERROR,
    payload: payload,
    callback,
  }
}

export const deleteUsers = (payload, callback) => {
  return {
    type: DELETE_USERS,
    payload: payload,
    callback,
  }
}

export const deleteUsersSuccess = (payload, callback) => {
  return {
    type: DELETE_USERS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const deleteUsersError = (payload, callback) => {
  return {
    type: DELETE_USERS_ERROR,
    payload: payload,
    callback,
  }
}
export const changeLimit = (limit) => {
  return { type: CHANGE_LIMIT, payload: limit }
}

export const changeSkip = (skip) => {
  return { type: CHANGE_SKIP, payload: skip }
}

export const changePage = (page) => {
  return { type: CHANGE_PAGE, payload: page }
}
