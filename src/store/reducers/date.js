import { DATE_SET_IS_NUMERATOR_ODD, DATE_SET_DATE } from './../actions';

const initialState = {
    date: new Date(),
    isNumeratorOdd: true,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case DATE_SET_DATE:
            return { ...state, date: action.payload };
        case DATE_SET_IS_NUMERATOR_ODD:
            return { ...state, isNumeratorOdd: action.payload };
        default:
            return state;
    }
}