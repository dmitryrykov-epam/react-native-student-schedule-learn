import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isSameWeek from 'date-fns/is_same_week';
import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';

export const weekConfig = { weekStartsOn: 1 };

export const getDatePeriod = (start, end) => {
    let currentDay = start;
    const result = [];

    do {
        result.push(currentDay);
        currentDay = addDays(currentDay, 1);
    } while (isSameDay(currentDay, end) || isBefore(currentDay, end));
    
    return result;
}

export const getWeekDays = (day) => getDatePeriod(startOfWeek(day, weekConfig), endOfWeek(day, weekConfig));

export const getMonthDaysWithAdditionalDays = (day) => getDatePeriod(
    startOfWeek(startOfMonth(day), weekConfig),
    endOfWeek(endOfMonth(day), weekConfig),
);

export const monthAliases = ['Январь', 'Февряль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
export const getMonthAlias = monthId => monthAliases[monthId];

export const weekDayAliases = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
export const getWeekDayAlias = dayId => weekDayAliases[dayId];

export const formatDate = date => `${getWeekDayAlias(date.getDay())}, ${getMonthAlias(date.getMonth())} ${date.getDate()}`;
