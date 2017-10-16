import { AsyncStorage } from 'react-native';

const storageAppPrefix = '@rnSchedule';
const dataServerDomain = 'https://node-schedule.herokuapp.com';

export const getSchedule = async (university, groupId, force = false) => {
    let data;
    if (!force) {
        data = await AsyncStorage
            .getItem(`${storageAppPrefix}:schedule(${university}|${groupId})`)
            .then(data => JSON.parse(data))
            .catch(() => null);
    }

    if (!data) {
        data = await fetch(`${dataServerDomain}/${university}/${groupId}`)
            .then(response => response.json())
            .then(data => {
                AsyncStorage.setItem(`${storageAppPrefix}:schedule(${university}|${groupId})`, JSON.stringify(data));
                return data;
            });
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

export const getUniversitiesList = () => fetch(`${dataServerDomain}/list`)
    .then(response => response.json());

export const getGroupsList = uni => fetch(`${dataServerDomain}/${uni}/list`)
    .then(response => response.json());
