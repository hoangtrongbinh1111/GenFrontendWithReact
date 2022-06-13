import {
  GET_EXAMPLE,
  GET_EXAMPLE_SUCCESS,
  GET_EXAMPLE_ERROR,
  GET_EXAMPLE_DETAILS,
  GET_EXAMPLE_DETAILS_SUCCESS,
  GET_EXAMPLE_DETAILS_ERROR,
  ADD_EXAMPLE,
  ADD_EXAMPLE_SUCCESS,
  ADD_EXAMPLE_ERROR,
  UPDATE_EXAMPLE,
  UPDATE_EXAMPLE_SUCCESS,
  UPDATE_EXAMPLE_ERROR,
  DELETE_EXAMPLE,
  DELETE_EXAMPLE_SUCCESS,
  DELETE_EXAMPLE_ERROR,
  CHANGE_LIMIT,
  CHANGE_SKIP,
  CHANGE_PAGE,
} from "./actionTypes.js"
export const getExample = (payload) => {
  return {
    type: GET_EXAMPLE,
    payload: payload,
  }
}

export const getExampleSuccess = (payload) => {
  return {
    type: GET_EXAMPLE_SUCCESS,
    payload: payload,
  }
}

export const getExampleError = (payload) => {
  return {
    type: GET_EXAMPLE_ERROR,
    payload: payload,
  }
}

export const getExampleDetails = (payload) => {
  return {
    type: GET_EXAMPLE_DETAILS,
    payload: payload,
  }
}

export const getExampleDetailsSuccess = (payload) => {
  return {
    type: GET_EXAMPLE_DETAILS_SUCCESS,
    payload: payload,
  }
}

export const getExampleDetailsError = (payload) => {
  return {
    type: GET_EXAMPLE_DETAILS_ERROR,
    payload: payload,
  }
}

export const addExample = (payload) => {
  return {
    type: ADD_EXAMPLE,
    payload: payload,
  }
}

export const addExampleSuccess = (payload) => {
  return {
    type: ADD_EXAMPLE_SUCCESS,
    payload: payload,
  }
}

export const addExampleError = (payload) => {
  return {
    type: ADD_EXAMPLE_ERROR,
    payload: payload,
  }
}

export const updateExample = (payload) => {
  return {
    type: UPDATE_EXAMPLE,
    payload: payload,
  }
}

export const updateExampleSuccess = (payload) => {
  return {
    type: UPDATE_EXAMPLE_SUCCESS,
    payload: payload,
  }
}

export const updateExampleError = (payload) => {
  return {
    type: UPDATE_EXAMPLE_ERROR,
    payload: payload,
  }
}

export const deleteExample = (payload) => {
  return {
    type: DELETE_EXAMPLE,
    payload: payload,
  }
}

export const deleteExampleSuccess = (payload) => {
  return {
    type: DELETE_EXAMPLE_SUCCESS,
    payload: payload,
  }
}

export const deleteExampleError = (payload) => {
  return {
    type: DELETE_EXAMPLE_ERROR,
    payload: payload,
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
