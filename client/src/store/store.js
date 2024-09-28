import { applyMiddleware, compose, createStore } from "redux";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { rootreducer } from "./root.reducer";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["user", "prompts", "response"],
// };

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleware];

// const persistedReducer = persistReducer(persistConfig, rootreducer);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootreducer,undefined, composedEnhancers);


store.dispatch({type: "default"})
// console.log(store.getState());

// export const persistor = persistStore(store);
