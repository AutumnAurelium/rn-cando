import { StyleSheet, TouchableOpacity, Text, FlatList, View } from 'react-native';

import {Agenda} from 'react-native-calendars';
import React, { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Moment from 'moment';
import { collection, getFirestore, onSnapshot} from "firebase/firestore";
import { app } from "@/app/init";
import {useNavigation} from '@react-navigation/native';
import { CheckBox } from 'react-native-elements'
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

const db = getFirestore(app)

export default function CalendarScreen() {
  const navigation = useNavigation();

  const [tasks, setTasks] = useState([])
  const [selected, setSelected] = useState<string>(Moment().format('YYYY-MM-DD'));
  const [markedDates, setMarkedDates] = useState<Array<Date>>([]);
  const [checked, setChecked] = useState({});

  const handleCheckbox = (task) => {
    setChecked((prev) => ({
        ...prev,
        [task]: !prev[task],
    }));
  };

  const handleTask = (taskId, taskName, taskDescription, taskFrequency, taskPoints) => {
    //navigates and passes task information as parameters
    navigation.navigate('taskDetail', {taskId, taskName, taskDescription, taskFrequency, taskPoints});
  }
  const isSameDay = (date1: string, date2: string): boolean => {
    //Compares two date strings
    return Moment(date1).isSame(Moment(date2), 'day');
  };

  useEffect(() => {
    //Gets tasks, adds them to a list of tasks and marks task dates
    const getTasks = collection(db, 'Tasks')
    const subscribe = onSnapshot(getTasks, (querySnapshot) => {
        const addTasks = []
        const customDates = {};
        querySnapshot.forEach((list) => {
          addTasks.push({...list.data(), id: list.id})
        })
        for (const item of addTasks){
          item.startTime = item["startTime"].toDate().toISOString().slice(0, 10);
          customDates[item.startTime] = {marked: true, dotColor: '#8bd8fc'};
        }

        setTasks(addTasks);
        setMarkedDates({...markedDates, ...customDates});
        console.log(addTasks)
    });
    return () => subscribe();
  }, []);
  
  var todayTasks = tasks.filter(task => isSameDay(task.startTime, selected));

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaProvider >
        <SafeAreaView style={styles.safeAreaView}>
          <Agenda
            selected={selected}
            onDayPress={(day: {dateString: string}) => setSelected(day.dateString)}
            renderList={() => {
              return (
                    <FlatList data={todayTasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
                        <TouchableOpacity style={styles.taskButton} onPress={() => handleTask(item.id, item.taskName, item.description, item.frequency, item.points)}>
                            <View style={[styles.horizontalContainer]}>
                              <Text style={[styles.titleText]}>{item.taskName}</Text>
                              <CheckBox checked={checked[item.id] || false} onPress = {() => handleCheckbox(item.id)} containerStyle = {styles.checkboxContainer}/>
                            </View>
                            <Text style={[styles.descText]}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    />
              );
            }}
            showOnlySelectedDayItems = {true}
            showClosingKnob={true}
            markedDates={markedDates}
            scrollEnabled = {true}
            disabledByDefault
            // Agenda theme
            theme={{
              agendaKnobColor: '#768390',
              calendarBackground: Colors.dark.background,
              reservationsBackgroundColor: Colors.dark.background,
              monthTextColor: 'white',
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#2d333b',
    color: '#2d333b'
  },
  taskButton: {
    padding: 15,
    textAlign: 'left',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'grey'
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 10,
    justifyContent: 'flex-start'
  },
  descText:{
    color: '#bdbdbd',
    fontSize: 15,
    paddingLeft: 10,
  },
  horizontalContainer:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  checkboxContainer:{

  }
  });
