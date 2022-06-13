import { call, put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import {
  getExampleSuccess,
  getExampleError,
  getExampleDetailsSuccess,
  getExampleDetailsError,
  addExampleSuccess,
  addExampleError,
  updateExampleSuccess,
  updateExampleError,
  deleteExampleSuccess,
  deleteExampleError,
} from "./action"
import {
  GET_EXAMPLE,
  GET_EXAMPLE_DETAILS,
  ADD_EXAMPLE,
  UPDATE_EXAMPLE,
  DELETE_EXAMPLE,
} from "./actionTypes"

const getExampleAsync = async (data) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/example?limit=${data.limit}&skip=${data.skip}`
    )
    return response
  } catch (error) {
    return error
  }
}

function* getExample(action) {
  let response = yield call(getExampleAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(getExampleSuccess(response.data))
  } else {
    yield put(getExampleError(response.error.message))
  }
}

const getExampleDetailsAsync = async (data) => {
  try {
    const response = await axios.get(`http://localhost:3000/example${data.id}`)
    return response
  } catch (error) {
    return error
  }
}

function* getExampleDetails(action) {
  let response = yield call(getExampleDetailsAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(getExampleDetailsSuccess(response.data))
  } else {
    yield put(getExampleDetailsError(response.error.message))
  }
}

const addExampleAsync = async (data) => {
  try {
    const response = await axios.post(`http://localhost:3000/example`, {
      ...data,
    })
    return response
  } catch (error) {
    return error
  }
}

function* addExample(action) {
  let response = yield call(addExampleAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(addExampleSuccess(response.data))
  } else {
    yield put(addExampleError(response.error.message))
  }
}

const updateExampleAsync = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/example${data.id}`,
      { ...data }
    )
    return response
  } catch (error) {
    return error
  }
}

function* updateExample(action) {
  let response = yield call(updateExampleAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(updateExampleSuccess(response.data))
  } else {
    yield put(updateExampleError(response.error.message))
  }
}

const deleteExampleAsync = async (data) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/example${data.id}`
    )
    return response
  } catch (error) {
    return error
  }
}

function* deleteExample(action) {
  let response = yield call(deleteExampleAsync, action.payload)
  if (response.status == 200 || response.status == 201) {
    yield put(deleteExampleSuccess(response.data))
  } else {
    yield put(deleteExampleError(response.error.message))
  }
}

function* exampleSaga() {
  yield takeEvery(GET_EXAMPLE, getExample)

  yield takeEvery(GET_EXAMPLE_DETAILS, getExampleDetails)

  yield takeEvery(ADD_EXAMPLE, addExample)

  yield takeEvery(UPDATE_EXAMPLE, updateExample)

  yield takeEvery(DELETE_EXAMPLE, deleteExample)
}
export default exampleSaga
