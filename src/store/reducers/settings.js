import mockData from './../../data';

import {
    FETCH_DATA_FAILED,
    FETCH_DATA_FINISHED,
    FETCH_DATA_START,
    SETTINGS_SELECT_GROUP,
    SETTINGS_SELECT_UNIVERSITY,
} from './../actions';

const universitiesAliases = {
    rsreu: 'РГРТУ',
};

const initialState = {
    selectedUniversity: null,
    selectedGroup: null,
    universitiesList: Object.keys(mockData).map(name => ({ name, alias: universitiesAliases[name] })),
    groupsList: Object.entries(mockData)
        .map(([key, value]) => [key, Object.keys(value.schedule)])
        .reduce((acc, [key ,value]) => ({ ...acc, [key]: value }), {}) || {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SETTINGS_SELECT_UNIVERSITY:
            return { ...state, selectedUniversity: action.payload };
        case SETTINGS_SELECT_GROUP:
            return { ...state, selectedGroup: action.payload };
        default:
            return state;
    }
}