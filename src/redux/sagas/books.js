import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import {
  getBooksSuccess,
  getBooksError,
  getBooksDetailsSuccess,
  getBooksDetailsError,
  addBooksSuccess,
  addBooksError,
  updateBooksSuccess,
  updateBooksError,
  deleteBooksSuccess,
  deleteBooksError,
} from "../actions/books"
import {
  GET_USERS,
  GET_USERS_DETAILS,
  ADD_USERS,
  UPDATE_USERS,
  DELETE_USERS,
  GET_BOOKS,
  GET_BOOKS_DETAILS,
  ADD_BOOKS,
  UPDATE_BOOKS,
  DELETE_BOOKS,
} from "../actionType/books"
import { getHeader } from "../services/api"

const getUsersAsync = async (data) => {
  try {
    let query = `limit=${data.limit}&page=${data.page}`
    if (data.search) {
      query += `&search=${data.search}`
    }

    const response = await axios.get(
      `http://localhost:8686/v1/users?${query}`,
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* getUsers(action) {
  let response = yield call(getUsersAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(getBooksSuccess(response.data))
  } else {
    yield put(getBooksError(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const getUsersDetailsAsync = async (data) => {
  try {
    const response = await axios.get(
      `http://localhost:8686/v1/users/${data._id}`,
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* getUsersDetails(action) {
  let response = yield call(getUsersDetailsAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(getBooksDetailsSuccess(response.data))
  } else {
    yield put(getBooksDetailsError(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const addUsersAsync = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8686/v1/auth/sign-up`,
      { ...data },
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* addUsers(action) {
  let response = yield call(addUsersAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(addBooksSuccess(response.data))
  } else {
    yield put(addBooksError(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const updateUsersAsync = async (data) => {
  try {
    const response = await axios.patchundefined
    return response
  } catch (error) {
    return error
  }
}

function* updateUsers(action) {
  let response = yield call(updateUsersAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(updateBooksSuccess(response.data))
  } else {
    yield put(updateBooksError(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const deleteUsersAsync = async (data) => {
  try {
    const response = await axios.delete(
      `http://localhost:8686/v1/users/${data._id}`,
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* deleteUsers(action) {
  let response = yield call(deleteUsersAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(deleteBooksSuccess(response.data))
  } else {
    yield put(deleteBooksError(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const getBooksAsync = async (data) => {
  try {
    let query = `limit=${data.limit}&page=${data.page}`
    if (data.search) {
      query += `&search=${data.search}`
    }

    const response = await axios.get(
      `http://localhost:8686/v1/books?${query}`,
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* getBooks(action) {
  let response = yield call(getBooksAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(undefined(response.data))
  } else {
    yield put(undefined(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const getBooksDetailsAsync = async (data) => {
  try {
    const response = await axios.get(
      `http://localhost:8686/v1/books/${data._id}`,
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* getBooksDetails(action) {
  let response = yield call(getBooksDetailsAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(undefined(response.data))
  } else {
    yield put(undefined(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const addBooksAsync = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8686/v1/auth/sign-up`,
      { ...data },
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* addBooks(action) {
  let response = yield call(addBooksAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(undefined(response.data))
  } else {
    yield put(undefined(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const updateBooksAsync = async (data) => {
  try {
    const response = await axios.patchundefined
    return response
  } catch (error) {
    return error
  }
}

function* updateBooks(action) {
  let response = yield call(updateBooksAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(undefined(response.data))
  } else {
    yield put(undefined(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

const deleteBooksAsync = async (data) => {
  try {
    const response = await axios.delete(
      `http://localhost:8686/v1/books/${data._id}`,
      { headers: getHeader() }
    )
    return response
  } catch (error) {
    return error
  }
}

function* deleteBooks(action) {
  let response = yield call(deleteBooksAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(undefined(response.data))
  } else {
    yield put(undefined(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

function* booksSaga() {
  yield takeEvery(GET_USERS, getUsers)

  yield takeEvery(GET_USERS_DETAILS, getUsersDetails)

  yield takeEvery(ADD_USERS, addUsers)

  yield takeEvery(UPDATE_USERS, updateUsers)

  yield takeEvery(DELETE_USERS, deleteUsers)

  yield takeEvery(GET_BOOKS, getBooks)

  yield takeEvery(GET_BOOKS_DETAILS, getBooksDetails)

  yield takeEvery(ADD_BOOKS, addBooks)

  yield takeEvery(UPDATE_BOOKS, updateBooks)

  yield takeEvery(DELETE_BOOKS, deleteBooks)
}
export default booksSaga
