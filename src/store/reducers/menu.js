import { MENU_CLOSE, MENU_OPEN, SEARCH_CLEAR, SEARCH_LECTOR, SEARCH_LESSON } from './../actions';

const initialState = {
    isOpened: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case MENU_OPEN:
            return { ...state, isOpened: true };
        case SEARCH_CLEAR:
        case SEARCH_LECTOR:
        case SEARCH_LESSON:
        case MENU_CLOSE:
            return { ...state, isOpened: false };
        default:
            return state;
    }
}