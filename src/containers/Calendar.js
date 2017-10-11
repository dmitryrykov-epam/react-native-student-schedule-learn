import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formatDate  from 'date-fns/format';
import getISODay from 'date-fns/get_iso_day'

import { setDate } from './../store/actions';

import Calendar from './../components/calendar';

const getIsNumerator = (date, isNumeratorOdd) => {
    const isOdd = (0 + formatDate(date, 'W')) % 2 === 0;
    return isOdd === isNumeratorOdd;
}

const mapStateToProps = (state) => ({
    date: state.date.date,
    isDayHighlightedFn: (date) => {
        if (!state.search.keyword) {
            return false;
        }
        const isNum = getIsNumerator(date, state.date.isNumeratorOdd);
        const schedule = isNum ? state.schedule.numerator : state.schedule.denominator;

        if (!schedule) {
            return false;
        }

        const dayLessons = schedule[+getISODay(date)];

        if (!(dayLessons && dayLessons.length)) {
            return false;
        }

        switch (state.search.type) {
            case 'lector':
                return dayLessons
                    .filter(lesson => !!(lesson && lesson.lector))
                    .reduce((acc, next) => [...acc, ...next.lector], [])
                    .find(lector => lector === state.search.keyword);
            case 'lesson':
                return dayLessons
                    .filter(lesson => !!(lesson && lesson.name))
                    .reduce((acc, next) => [...acc, next.name], [])
                    .find(name => name === state.search.keyword);
        }
        return false;
    },
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onChange: setDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
