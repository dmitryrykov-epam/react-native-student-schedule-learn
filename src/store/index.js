import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const middlewares = applyMiddleware(thunk);

export default createStore(
    reducers,
    middlewares,
);