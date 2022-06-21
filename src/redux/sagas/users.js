import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import {
  getUsersSuccess,
  getUsersError,
  getUsersDetailsSuccess,
  getUsersDetailsError,
  addUsersSuccess,
  addUsersError,
  updateUsersSuccess,
  updateUsersError,
  deleteUsersSuccess,
  deleteUsersError,
} from "../actions/users"
import {
  GET_USERS,
  GET_USERS_DETAILS,
  ADD_USERS,
  UPDATE_USERS,
  DELETE_USERS,
} from "../actionType/users"
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
    yield put(getUsersSuccess(response.data))
  } else {
    yield put(getUsersError(response.error.message))
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
    yield put(getUsersDetailsSuccess(response.data))
  } else {
    yield put(getUsersDetailsError(response.error.message))
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
    yield put(addUsersSuccess(response.data))
  } else {
    yield put(addUsersError(response.error.message))
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
    yield put(updateUsersSuccess(response.data))
  } else {
    yield put(updateUsersError(response.error.message))
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
    yield put(deleteUsersSuccess(response.data))
  } else {
    yield put(deleteUsersError(response.error.message))
  }
  if (action.callback) {
    action.callback(response.data)
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, getUsers)

  yield takeEvery(GET_USERS_DETAILS, getUsersDetails)

  yield takeEvery(ADD_USERS, addUsers)

  yield takeEvery(UPDATE_USERS, updateUsers)

  yield takeEvery(DELETE_USERS, deleteUsers)
}
export default usersSaga
