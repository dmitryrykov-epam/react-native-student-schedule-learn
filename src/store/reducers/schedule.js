import {
    FETCH_DATA_FAILED,
    FETCH_DATA_FINISHED,
    FETCH_DATA_START,
} from './../actions';

const initialState = {
    timeSlots: [],
    numerator: null,
    denominator: null,
    isFetching: false,
    isSuccess: true,
};

export default (state = initialState, action = null) => {
    switch (action.type) {
        case (FETCH_DATA_START):
            return { ...state, isFetching: true, isSuccess: true };
        case (FETCH_DATA_FAILED):
            return { ...state, isFetching: false, isSuccess: false };
        case (FETCH_DATA_FINISHED):
            return {
                ...state,
                isFetching: false,
                isSuccess: true,
                timeSlots: action.payload.timeSlots,
                numerator: action.payload.schedule.numerator,
                denominator: action.payload.schedule.denominator,
            };
        default:
            return state;
    }
}