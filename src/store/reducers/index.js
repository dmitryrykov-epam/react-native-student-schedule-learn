import { combineReducers } from 'redux';

import schedule from './schedule';
import search from './search';
import menu from './menu';
import date from './date';
import popup from './popup';

export default combineReducers({
    schedule,
    search,
    menu,
    date,
    popup,
});