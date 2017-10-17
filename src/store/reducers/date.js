import formatDate  from 'date-fns/format';
import { DATE_SET_IS_NUMERATOR_ODD, DATE_SET_DATE } from './../actions';

const getIsWeekOdd = date => (0 + formatDate(date, 'W')) % 2 === 0;

const initialState = {
    date: new Date(),
    isNumeratorOdd: true,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case DATE_SET_DATE:
            return { ...state, date: action.payload };
        case DATE_SET_IS_NUMERATOR_ODD:
            return { ...state, isNumeratorOdd: getIsWeekOdd(state.date) === action.payload };
        default:
            return state;
    }
}