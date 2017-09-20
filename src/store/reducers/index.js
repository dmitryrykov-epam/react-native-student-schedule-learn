import { combineReducers } from 'redux';

import schedule from './schedule';
import search from './search';
import menu from './menu';
import date from './date';

export default combineReducers({
    schedule,
    search,
    menu,
    date,
});