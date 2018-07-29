import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { fetchNodes } from './actions/nodes';
import App from './App';
import { fetchNodeDetailEpic, fetchNodesEpic } from './epics/nodeEpics';
import './index.css';
import { detail } from './reducers/detailReducer';
import { nodes } from './reducers/nodeReducer';
import './scheduled/scheduledTasks';


const configureStore = (preLoadedState) => {

  // combine epics
  const rootEpic = combineEpics(
    fetchNodesEpic, fetchNodeDetailEpic
  );
  // combine reducers
  const rootReducer = combineReducers({
    nodes, detail
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
    <App />
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    renderApp()
  })
}

renderApp()

interval(3000)
  .pipe(map(() => store.dispatch(fetchNodes())), take(2))
  .subscribe();