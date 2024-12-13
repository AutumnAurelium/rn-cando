import { StyleSheet, Switch, TextInput, useColorScheme, View, TouchableOpacity, Alert, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getApp } from "@react-native-firebase/app";
import { collection, addDoc, getFirestore, onSnapshot, query, where } from "@react-native-firebase/firestore";
import { app } from "@/app/init";

//database connection
const db = getFirestore()

export default function AddTaskScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;
    const colorTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

    //state variables
    const [task, setTask] = useState('');
    const [desc, setDesc] = useState('');
    const [points, setPoints] = useState('');
    const pointsToInt = Number(points);
    const [notifications, setNotifications] = useState(false);
    const [frequency, setFrequency] = useState("none");
    const [group, setGroup] = useState(0);
    const [groups, setGroups] = useState([]);
    const [date,setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startTime,setStartTime] = useState(new Date());
    const [showSTimePicker, setSTimePicker] = useState(false);
    const [endTime,setEndTime] = useState(new Date());
    const [showETimePicker, setETimePicker] = useState(false);
    const [category, setCategory] = useState('')

    //function for handling the date selection
    const handleDate = (e, dateVal) =>{
        if(dateVal) {
            setDate(dateVal);
        }
        if(showDatePicker){
            setShowDatePicker(false);
        }
    }
    //function for updating the state for date picker
    const handleDatePicker = () => {
        if(!showDatePicker){
            setShowDatePicker(true);
        }
    }

    //function for handling the start time selection
    const handleStartTime = (e, startT) =>{
        if(startT) {
            setStartTime(startT);
        }
        if(showSTimePicker){
            setSTimePicker(false);
        }
    }
    //function for updating the state for time picker
    const handleSTimePicker = () => {
        if(!showSTimePicker){
            setSTimePicker(true);
        }
    }

    //function for handling the end time selection
    const handleEndTime = (e, endT) =>{
        if(endT) {
            setEndTime(endT);
        }
        if(showETimePicker){
            setETimePicker(false);
        }
    }
    //function for updating the state for time picker
    const handleETimePicker = () => {
        if(!showETimePicker){
            setETimePicker(true);
        }
    }

    //function to add task information ot the database
    const addTasks = () => {
        console.log(group)
        addDoc(collection(db, "Tasks"), {
            date: date,
            description: desc,
            endTime: endTime,
            frequency: frequency,
            groupName: group,
            notification: notifications,
            startTime: startTime,
            taskName: task,
            points: pointsToInt,
            category: category,
        }).then(() => {
            console.log("tasks added to database")
            //resets the state
            setTask('');
            setDesc('');
            setDate(new Date());
            setStartTime(new Date());
            setEndTime(new Date());
            setFrequency("none")
            setNotifications(false)
            setGroup(0);
            setPoints('')
            setCategory('')
        });
    }

    //use effect to get groups from the database and updates the state with the list of groups
    useEffect(() => {
        const getGroups = collection(db, 'Groups')

        const subscribe = onSnapshot(getGroups, (querySnapshot) => {
            const addGroups = []
            querySnapshot.forEach((list) => {
                addGroups.push({...list.data(), id: list.id})
            })
            setGroups(addGroups)
            console.log(addGroups)
        });
        return () => subscribe();
    }, []);
    return (
        <CanDoScrollView>
            <View style={styles.container}>
                {/*input for task name and description*/}
                <TextInput
                style={styles.input}
                placeholder="Task Name"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                value = {task}
                onChangeText = {setTask}
                />
                <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                value = {desc}
                onChangeText = {setDesc}
                />

                {/*date picker*/}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ margin: 20, alignItems: 'center' }}>
                        <ThemedText style={{ textAlign: 'center' }}>Date</ThemedText>
                        <TouchableOpacity onPress = {handleDatePicker}>
                            <Ionicons name="calendar-number" color={tint} size={48} />
                        </TouchableOpacity>

                        {showDatePicker && (
                        <DateTimePicker
                        value = {date}
                        mode = "date"
                        display = "default"
                        onChange = {handleDate}
                        />
                        )}
                        <Text>{date.toLocaleDateString()}</Text>
                    </View>
                </View>

                {/*start time picker*/}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ margin: 30, alignItems: 'center' }}>
                        <ThemedText style={{ textAlign: 'center' }}>Start Time</ThemedText>
                        <TouchableOpacity onPress = {handleSTimePicker}>
                            <Ionicons name="time" color={tint} size={48} />
                        </TouchableOpacity>

                        {showSTimePicker && (
                        <DateTimePicker
                        value = {startTime}
                        mode = "time"
                        display = "default"
                        onChange = {handleStartTime}
                        />
                        )}
                        <Text>{startTime.toLocaleTimeString()}</Text>
                    </View>
                    {/*end time picker*/}
                    <View style={{ margin: 30, alignItems: 'center' }}>
                        <ThemedText style={{ textAlign: 'center' }}>End Time</ThemedText>
                        <TouchableOpacity onPress = {handleETimePicker}>
                            <Ionicons name="time" color={tint} size={48} />
                        </TouchableOpacity>
                        {showETimePicker && (
                        <DateTimePicker
                        value = {endTime}
                        mode = "time"
                        display = "default"
                        onChange = {handleEndTime}
                        />
                        )}
                        <Text>{endTime.toLocaleTimeString()}</Text>
                    </View>
                </View>

                {/*frequency picker*/}
                <View style={styles.labeledInputContainer}>
                    <ThemedText style={styles.label}>Frequency</ThemedText>
                    <Picker selectedValue={frequency} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setFrequency}>
                        <Picker.Item label="None" value="none" />
                        <Picker.Item label="Monthly" value="monthly" />
                        <Picker.Item label="Weekly" value="weekly" />
                        <Picker.Item label="Daily" value="daily" />
                    </Picker>
                </View>

                 {/*notification toggle*/}
                <View style={styles.labeledInputContainer}>
                    <ThemedText style={{verticalAlign: 'middle', flexGrow: 1, margin: 14}}>Notifications</ThemedText>
                    <Switch trackColor={{false: colorTheme.colors.border, true: colorTheme.colors.border}} value={notifications} onChange={() => setNotifications(!notifications)} />
                </View>

                {/*group picker*/}
                <View style={styles.labeledInputContainer}>
                    <ThemedText style={styles.label}>Group</ThemedText>
                    <Picker selectedValue={group} onValueChange={setGroup} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem}>
                        <Picker.Item label="Personal" value={0} />
                        {groups.map((group) => (
                            <Picker.Item key={group.id} label={group.groupName} value={group.id} />
                        ))}
                    </Picker>
                </View>
                {/*shows the personal task category when the personal option is chosen*/}
                {group === 0 && (
                    <View style={styles.labeledInputContainer}>
                        <ThemedText style={styles.label}>Category</ThemedText>
                        <Picker selectedValue={category} onValueChange={setCategory} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem}>
                            <Picker.Item label="Home" value="home" />
                            <Picker.Item label="Work" value="work" />
                        </Picker>
                    </View>
                )}
                {/*shows the points input if any group names are chosen*/}
                {group !== 0  && (
                    <TextInput
                    style={styles.pInput}
                    placeholder="Points"
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="done"
                    value = {points}
                    onChangeText = {setPoints}
                    />
                )}

                {/*add task button*/}
                <View style = {styles.buttonRow}>
                    <TouchableOpacity style = {{backgroundColor: 'white', borderRadius:8, marginVertical: 20, padding: 10}} onPress = {addTasks}>
                        <Text style = {{color: 'black', fontSize: 20}}>Add Task</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </CanDoScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    verticalAlign: 'middle',
    flex: 1,
    margin: 14
  },
  labeledInputContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    gap: 8,
    marginBottom: 8,
  },
  input: {
    color: '#999',
    fontSize: 24,
    margin: 14
  },
  pInput: {
    color: '#999',
    fontSize: 15,
    margin: 14,
    textAlign: 'right'
  },
  dropdown: {
    color: '#999',
    justifyContent: 'flex-end',
    flexShrink: 1,
    flexGrow: 1,
  },
  dropdownItem: {
    fontSize: 24
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
