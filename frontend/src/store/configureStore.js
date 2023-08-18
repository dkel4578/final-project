import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
// import { browserHistory } from 'react-router'
// import { connectRouter } from "connected-react-router"
// import { routerMiddleware, push } from 'react-router-redux'

import Chatting from "./modules/chatting.js"
import User from './modules/user.js'

export const customHistory = createBrowserHistory();
// export const navigate = useNavigate();

const rootReducer = combineReducers({
  user: User,
  chatting: Chatting,
})

const middlewares = [thunk.withExtraArgument({ history: customHistory })];

// const env = process.env.NODE_ENV;
// if (env === "development") {
//   const { logger } = require("redux-logger");
//   middlewares.push(logger);
// }

const composeEnhancers = 
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

// // Apply the middleware to the store
// const middleware = routerMiddleware(browserHistory)
// const store = createStore(
//   rootReducer,
//   applyMiddleware(middleware)
// )

export default store();