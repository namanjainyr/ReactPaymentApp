/* eslint-disable  */

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./store/Reducer/index";
import App from './App';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);
ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
);
