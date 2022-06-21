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

const initialState = {
  users: { requestStatus: "loading", error: "", limit: 5, skip: 0, page: 0 },
  usersDetails: { requestStatus: "loading", error: "" },
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      state = { ...state, users: { ...state.users, requestStatus: "loading" } }
      break
    case GET_USERS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          requestStatus: "success",
          data: action.payload,
        },
      }
      break
    case GET_USERS_ERROR:
      state = {
        ...state,
        users: {
          ...state.users,
          requestStatus: "faield",
          error: action.payload,
        },
      }
      break
    case GET_USERS_DETAILS:
      state = {
        ...state,
        usersDetails: { ...state.usersDetails, requestStatus: "loading" },
      }
      break
    case GET_USERS_DETAILS_SUCCESS:
      state = {
        ...state,
        usersDetails: {
          ...state.usersDetails,
          requestStatus: "success",
          data: action.payload,
        },
      }
      break
    case GET_USERS_DETAILS_ERROR:
      state = {
        ...state,
        usersDetails: {
          ...state.usersDetails,
          requestStatus: "faield",
          error: action.payload,
        },
      }
      break
    case ADD_USERS:
      state = { ...state, users: { ...state.users, loader: true } }
      break
    case ADD_USERS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          loader: false,
          data: [...state.users.data, action.payload],
        },
      }
      break
    case ADD_USERS_ERROR:
      state = {
        ...state,
        users: { ...state.users, loader: false, error: action.payload },
      }
      break
    case UPDATE_USERS:
      state = { ...state, users: { ...state.users, loader: true } }
      break
    case UPDATE_USERS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          loader: false,
          updatedElement: action.payload,
        },
      }
      break
    case UPDATE_USERS_ERROR:
      state = {
        ...state,
        users: { ...state.users, loader: false, error: action.payload },
      }
      break
    case DELETE_USERS:
      state = { ...state, users: { ...state.users, loader: true } }
      break
    case DELETE_USERS_SUCCESS:
      state = {
        ...state,
        users: {
          ...state.users,
          loader: false,
          deletedElement: action.payload,
        },
      }
      break
    case DELETE_USERS_ERROR:
      state = {
        ...state,
        users: { ...state.users, loader: false, error: action.payload },
      }
      break
    case CHANGE_LIMIT:
      state = { ...state, users: { ...state.users, limit: action.payload } }
      break
    case CHANGE_SKIP:
      state = { ...state, users: { ...state.users, skip: action.payload } }
      break
    case CHANGE_PAGE:
      state = { ...state, users: { ...state.users, page: action.payload } }
      break
  }

  return state
}

export default usersReducer
