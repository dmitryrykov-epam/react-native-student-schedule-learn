import { AsyncStorage } from 'react-native';
import mockData from './data/';

const storageAppPrefix = '@rnSchedule';

export const getSchedule = async (university, groupId, force = false) => {
    let data;
    if (!force) {
        data = await AsyncStorage
            .getItem(`${storageAppPrefix}:schedule(${university}|${groupId})`)
            .then(data => JSON.parse(data))
            .catch(() => null);
    }

    if (!data) {
        const timeSlots = mockData[university].timeSlots;
        const schedule = mockData[university].schedule;
        
        const scheduleObject = {
            numerator: schedule[groupId].map(day => day.map(slot => slot ? slot.numerator : null)),
            denominator: schedule[groupId].map(day => day.map(slot => slot ? slot.denominator : null)),
        };
        const lessonObjectsList = scheduleObject.numerator.concat(scheduleObject.denominator)
            .reduce((acc, next) => acc.concat(next), [])
            .filter(lesson => lesson);
        const lectorsList = lessonObjectsList
            .map(lesson => lesson.lector)
            .reduce((acc, next) => acc.concat(next), [])
            .reduce((acc, next) => acc.indexOf(next) > -1 ? acc : acc.concat(next), []);
        const lessonsList = lessonObjectsList
            .map(lesson => lesson.name)
            .reduce((acc, next) => acc.indexOf(next) > -1 ? acc : acc.concat(next), []);

        data = {
            timeSlots,
            schedule: scheduleObject,
            lectorsList,
            lessonsList,
        };

        AsyncStorage.setItem(`${storageAppPrefix}:schedule(${university}|${groupId})`, JSON.stringify(data));
    }

    return data;
}

export const getIsNumeratorOdd = () => AsyncStorage
    .getItem(`${storageAppPrefix}:isNumeratorOdd`)
    .then(data => JSON.parse(data))
    .then(data => typeof data === 'boolean' ? data : saveIsNumeratorOdd(true))
    .catch(() => true);

export const saveIsNumeratorOdd = isOdd => AsyncStorage
    .setItem(`${storageAppPrefix}:isNumeratorOdd`, JSON.stringify(isOdd))
    .then(() => isOdd);

export const getUniversity = () => AsyncStorage
    .getItem(`${storageAppPrefix}:university`)
    .then(data => JSON.parse(data))
    .then(data => typeof data === 'string' ? data : null)
    .catch(() => null);

export const saveUniversity = university => AsyncStorage
    .setItem(`${storageAppPrefix}:university`, JSON.stringify(university))
    .then(() => university);
    
export const getGroup = () => AsyncStorage
    .getItem(`${storageAppPrefix}:group`)
    .then(data => JSON.parse(data))
    .then(data => typeof data === 'string' ? data : null)
    .catch(() => null);

export const saveGroup = university => AsyncStorage
    .setItem(`${storageAppPrefix}:group`, JSON.stringify(university))
    .then(() => university);
