import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "../sagas/sagas";
import commentsSlice from "./slice";
import createSagaMiddleware from "redux-saga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    comments: commentsSlice,
  },
  middleware: [sagaMiddleware],
});

// then run the saga
sagaMiddleware.run(rootSaga);
