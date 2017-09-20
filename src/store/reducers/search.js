import {
    FETCH_DATA_START,
    FETCH_DATA_FINISHED,
    SEARCH_CLEAR,
    SEARCH_LECTOR,
    SEARCH_LESSON
} from './../actions';

const initialState = {
    lessons: [],
    lectors: [],
    type: null,
    keyword: null,
};

export default (state = initialState, action = null) => {
    switch (action.type) {
        case (FETCH_DATA_START):
            return { ...initialState };
        case (FETCH_DATA_FINISHED):
            return {
                ...state,
                lessons: action.payload.lessonsList,
                lectors: action.payload.lectorsList,
            };
        case SEARCH_CLEAR:
            return {
                ...state,
                type: null,
                keyword: null,
            };
        case SEARCH_LECTOR:
            return {
                ...state,
                type: 'lector',
                keyword: action.payload,
            };
        case SEARCH_LESSON:
            return {
                ...state,
                type: 'lesson',
                keyword: action.payload,
            };
        default:
            return state;
    }
}