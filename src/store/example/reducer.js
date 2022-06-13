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
} from "./actionTypes.js"

const initialState = {
  example: { requestStatus: "loading", error: "", limit: 5, skip: 0, page: 0 },
  exampleDetails: { requestStatus: "loading", error: "" },
}

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXAMPLE:
      state = {
        ...state,
        example: { ...state.example, requestStatus: "loading" },
      }
      break
    case GET_EXAMPLE_SUCCESS:
      state = {
        ...state,
        example: {
          ...state.example,
          requestStatus: "success",
          data: action.payload,
        },
      }
      break
    case GET_EXAMPLE_ERROR:
      state = {
        ...state,
        example: {
          ...state.example,
          requestStatus: "faield",
          error: action.payload,
        },
      }
      break
    case GET_EXAMPLE_DETAILS:
      state = {
        ...state,
        exampleDetails: { ...state.exampleDetails, requestStatus: "loading" },
      }
      break
    case GET_EXAMPLE_DETAILS_SUCCESS:
      state = {
        ...state,
        exampleDetails: {
          ...state.exampleDetails,
          requestStatus: "success",
          data: action.payload,
        },
      }
      break
    case GET_EXAMPLE_DETAILS_ERROR:
      state = {
        ...state,
        exampleDetails: {
          ...state.exampleDetails,
          requestStatus: "faield",
          error: action.payload,
        },
      }
      break
    case ADD_EXAMPLE:
      state = { ...state, example: { ...state.example, loader: true } }
      break
    case ADD_EXAMPLE_SUCCESS:
      state = {
        ...state,
        example: {
          ...state.example,
          loader: false,
          data: [...state.example.data, action.payload],
        },
      }
      break
    case ADD_EXAMPLE_ERROR:
      state = {
        ...state,
        example: { ...state.example, loader: false, error: action.payload },
      }
      break
    case UPDATE_EXAMPLE:
      state = { ...state, example: { ...state.example, loader: true } }
      break
    case UPDATE_EXAMPLE_SUCCESS:
      state = {
        ...state,
        example: {
          ...state.example,
          loader: false,
          updatedElement: action.payload,
        },
      }
      break
    case UPDATE_EXAMPLE_ERROR:
      state = {
        ...state,
        example: { ...state.example, loader: false, error: action.payload },
      }
      break
    case DELETE_EXAMPLE:
      state = { ...state, example: { ...state.example, loader: true } }
      break
    case DELETE_EXAMPLE_SUCCESS:
      state = {
        ...state,
        example: {
          ...state.example,
          loader: false,
          deletedElement: action.payload,
        },
      }
      break
    case DELETE_EXAMPLE_ERROR:
      state = {
        ...state,
        example: { ...state.example, loader: false, error: action.payload },
      }
      break
    case CHANGE_LIMIT:
      state = { ...state, example: { ...state.example, limit: action.payload } }
      break
    case CHANGE_SKIP:
      state = { ...state, example: { ...state.example, skip: action.payload } }
      break
    case CHANGE_PAGE:
      state = { ...state, example: { ...state.example, page: action.payload } }
      break
  }

  return state
}

export default exampleReducer
