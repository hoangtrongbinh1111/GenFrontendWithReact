import {
  GET_BOOKS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_ERROR,
  GET_BOOKS_DETAILS,
  GET_BOOKS_DETAILS_SUCCESS,
  GET_BOOKS_DETAILS_ERROR,
  ADD_BOOKS,
  ADD_BOOKS_SUCCESS,
  ADD_BOOKS_ERROR,
  UPDATE_BOOKS,
  UPDATE_BOOKS_SUCCESS,
  UPDATE_BOOKS_ERROR,
  DELETE_BOOKS,
  DELETE_BOOKS_SUCCESS,
  DELETE_BOOKS_ERROR,
  CHANGE_LIMIT,
  CHANGE_SKIP,
  CHANGE_PAGE,
} from "../actionType/books"
export const getBooks = (payload, callback) => {
  return {
    type: GET_BOOKS,
    payload: payload,
    callback,
  }
}

export const getBooksSuccess = (payload, callback) => {
  return {
    type: GET_BOOKS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const getBooksError = (payload, callback) => {
  return {
    type: GET_BOOKS_ERROR,
    payload: payload,
    callback,
  }
}

export const getBooksDetails = (payload, callback) => {
  return {
    type: GET_BOOKS_DETAILS,
    payload: payload,
    callback,
  }
}

export const getBooksDetailsSuccess = (payload, callback) => {
  return {
    type: GET_BOOKS_DETAILS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const getBooksDetailsError = (payload, callback) => {
  return {
    type: GET_BOOKS_DETAILS_ERROR,
    payload: payload,
    callback,
  }
}

export const addBooks = (payload, callback) => {
  return {
    type: ADD_BOOKS,
    payload: payload,
    callback,
  }
}

export const addBooksSuccess = (payload, callback) => {
  return {
    type: ADD_BOOKS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const addBooksError = (payload, callback) => {
  return {
    type: ADD_BOOKS_ERROR,
    payload: payload,
    callback,
  }
}

export const updateBooks = (payload, callback) => {
  return {
    type: UPDATE_BOOKS,
    payload: payload,
    callback,
  }
}

export const updateBooksSuccess = (payload, callback) => {
  return {
    type: UPDATE_BOOKS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const updateBooksError = (payload, callback) => {
  return {
    type: UPDATE_BOOKS_ERROR,
    payload: payload,
    callback,
  }
}

export const deleteBooks = (payload, callback) => {
  return {
    type: DELETE_BOOKS,
    payload: payload,
    callback,
  }
}

export const deleteBooksSuccess = (payload, callback) => {
  return {
    type: DELETE_BOOKS_SUCCESS,
    payload: payload,
    callback,
  }
}

export const deleteBooksError = (payload, callback) => {
  return {
    type: DELETE_BOOKS_ERROR,
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
