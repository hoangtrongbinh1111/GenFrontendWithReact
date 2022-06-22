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

const initialState = {
  books: { requestStatus: "loading", error: "", limit: 5, skip: 0, page: 0 },
  booksDetails: { requestStatus: "loading", error: "" },
}

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      state = { ...state, books: { ...state.books, requestStatus: "loading" } }
      break
    case GET_BOOKS_SUCCESS:
      state = {
        ...state,
        books: {
          ...state.books,
          requestStatus: "success",
          data: action.payload,
        },
      }
      break
    case GET_BOOKS_ERROR:
      state = {
        ...state,
        books: {
          ...state.books,
          requestStatus: "faield",
          error: action.payload,
        },
      }
      break
    case GET_BOOKS_DETAILS:
      state = {
        ...state,
        booksDetails: { ...state.booksDetails, requestStatus: "loading" },
      }
      break
    case GET_BOOKS_DETAILS_SUCCESS:
      state = {
        ...state,
        booksDetails: {
          ...state.booksDetails,
          requestStatus: "success",
          data: action.payload,
        },
      }
      break
    case GET_BOOKS_DETAILS_ERROR:
      state = {
        ...state,
        booksDetails: {
          ...state.booksDetails,
          requestStatus: "faield",
          error: action.payload,
        },
      }
      break
    case ADD_BOOKS:
      state = { ...state, books: { ...state.books, loader: true } }
      break
    case ADD_BOOKS_SUCCESS:
      state = {
        ...state,
        books: {
          ...state.books,
          loader: false,
          data: [...state.books.data, action.payload],
        },
      }
      break
    case ADD_BOOKS_ERROR:
      state = {
        ...state,
        books: { ...state.books, loader: false, error: action.payload },
      }
      break
    case UPDATE_BOOKS:
      state = { ...state, books: { ...state.books, loader: true } }
      break
    case UPDATE_BOOKS_SUCCESS:
      state = {
        ...state,
        books: {
          ...state.books,
          loader: false,
          updatedElement: action.payload,
        },
      }
      break
    case UPDATE_BOOKS_ERROR:
      state = {
        ...state,
        books: { ...state.books, loader: false, error: action.payload },
      }
      break
    case DELETE_BOOKS:
      state = { ...state, books: { ...state.books, loader: true } }
      break
    case DELETE_BOOKS_SUCCESS:
      state = {
        ...state,
        books: {
          ...state.books,
          loader: false,
          deletedElement: action.payload,
        },
      }
      break
    case DELETE_BOOKS_ERROR:
      state = {
        ...state,
        books: { ...state.books, loader: false, error: action.payload },
      }
      break
    case CHANGE_LIMIT:
      state = { ...state, books: { ...state.books, limit: action.payload } }
      break
    case CHANGE_SKIP:
      state = { ...state, books: { ...state.books, skip: action.payload } }
      break
    case CHANGE_PAGE:
      state = { ...state, books: { ...state.books, page: action.payload } }
      break
  }

  return state
}

export default booksReducer
