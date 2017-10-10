import formatDate  from 'date-fns/format';
import { connect } from 'react-redux';

import { Schedule } from './../components/schedule';

const getIsNumerator = (date, isNumeratorOdd) => {
    const isOdd = (0 + formatDate(date, 'W')) % 2 === 0;
    return isOdd === isNumeratorOdd;
}

const isNotHighlighted = () => lesson => false;
const isLessonHighlighted = name => lesson => !!(lesson && lesson.name === name);
const isLectorHighlighted = name => lesson => !!(lesson && lesson.lector && lesson.lector.indexOf(name) > -1);

const getIsHighlightedFn = searchType => {
    switch (searchType) {
        case 'lector':
            return isLectorHighlighted;
        case 'lesson':
            return isLessonHighlighted;
        default:
            return isNotHighlighted;
    }
}

const mapStateToProps = (state) => ({
    numerator: state.schedule.numerator || [],
    denominator: state.schedule.denominator || [],
    isNumerator: getIsNumerator(state.date.date, state.date.isNumeratorOdd),
    isHighlighted: getIsHighlightedFn(state.search.type)(state.search.keyword),
    date: state.date.date,
});

export default connect(mapStateToProps)(Schedule);
