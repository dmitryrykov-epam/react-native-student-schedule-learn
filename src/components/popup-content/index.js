import React from 'react';
import { View, Text, Switch, Picker } from 'react-native';

export const PopupContent = ({
    isSelectedWeekNumerator,
    switchIsSelectedWeekNumerator,
    selectedUniversity,
    universitiesList,
    onUniversitySelect,
    selectedGroup,
    groupsList,
    onGroupSelect,
}) => (
    <View>
        <View>
            <Text>Выбранная неделя - "числитель":</Text>
            <Switch value={ isSelectedWeekNumerator } onValueChange={ switchIsSelectedWeekNumerator } />
        </View>
        <View>
            <Text>Выберите университет:</Text>
            <Picker selectedValue={ selectedUniversity } onValueChange={ onUniversitySelect } >
                { universitiesList.map(uni => <Picker.Item label={ uni.alias } value={ uni.name } />) }
            </Picker>
        </View>
        { selectedUniversity &&
            <View>
                <Text>Выберите группу:</Text>
                <Picker selectedValue={ selectedGroup } onValueChange={ onGroupSelect } >
                    { groupsList.map(uni => <Picker.Item label={ uni.alias } value={ uni.name } />) }
                </Picker>
            </View>
        }
    </View>
);
