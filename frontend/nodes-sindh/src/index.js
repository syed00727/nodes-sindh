import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { fetchAllNodeDetails, fetchNodes } from './actions/nodes';
import App from './App';
import { fetchAllNodeDetailsEpic, fetchNodeDetailEpic, fetchNodeHistoryEpic, fetchNodesEpic, sendCommandEpic } from './epics/nodeEpics';
import './index.css';
import { detail } from './reducers/detailReducer';
import { history } from './reducers/historyReducer';
import { nodes } from './reducers/nodeReducer';

const configureStore = (preLoadedState) => {

  // combine epics
  const rootEpic = combineEpics(
    fetchNodesEpic, fetchNodeDetailEpic, sendCommandEpic, fetchAllNodeDetailsEpic, fetchNodeHistoryEpic /*, updateNodeHistoryEpic */
  );
  // combine reducers
  const rootReducer = combineReducers({
    nodes, detail, history
  });


  const epicMiddleWare = createEpicMiddleware();
  let store = createStore(
    rootReducer,
    applyMiddleware(logger, epicMiddleWare)
  );
  epicMiddleWare.run(rootEpic);
  return store;

}


let store = configureStore();

const renderApp = () => render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp()
  })
}

renderApp()

// fetching just Ids is no longer required
// interval(3000)
//   .pipe(
//     map(
//       () => store.dispatch(fetchNodes())
//     )
//     , take(1)
//   )
//   .subscribe();

interval(3000)
  .pipe(
    map(
      () => store.dispatch(fetchAllNodeDetails())
    )
    , take(1)
  ).subscribe();

// ws.onmessage = webSocketRes => {
//   store.dispatch(updateNodeDetail(JSON.parse(webSocketRes.data)))
// } 