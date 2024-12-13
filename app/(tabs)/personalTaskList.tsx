import { Image, StyleSheet, View, TouchableOpacity, Alert, Text, FlatList } from 'react-native';
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc, getFirestore, app, onSnapshot, query, where, whereArrayContains } from "@react-native-firebase/firestore";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { CheckBox } from 'react-native-elements'
import { useState, useEffect } from 'react'
import {createStaticNavigation,useNavigation, useRoute} from '@react-navigation/native';

//database connection
const db = getFirestore()

export default function LeaderboardScreen() {
    const navigation = useNavigation();
    //state variables
    const [checked, setChecked] = useState({});
    const [tasks, setTasks] = useState([])

    //Function to navigate to task details when a task is clicked
    const handleTask = (taskId, taskName, taskDescription, taskFrequency, taskPoints) => {
        //navigates and passes task information as parameters
        navigation.navigate('taskDetail', {taskId, taskName, taskDescription, taskFrequency, taskPoints});
    }

    //function ot handle checkboxes
    const handleCheckbox = (task) => {
        setChecked((prev) => ({
            ...prev,
            [task]: !prev[task],
        }));
    };

    //gets the task information from the database
    useEffect(() => {
        const getTasks = collection(db, 'Tasks')

        const subscribe = onSnapshot(getTasks, (querySnapshot) => {
            const addTasks = []
            querySnapshot.forEach((list) => {
                addTasks.push({...list.data(), id: list.id})
            })
            setTasks(addTasks)
            console.log(addTasks)
        });
        return () => subscribe();
    }, []);

    const personalTasks = tasks.filter(task => task.groupName === 0)
    const homeTasks = tasks.filter(task => task.category === 'home')
    const workTasks = tasks.filter(task => task.category === 'work')

    return (
        <CanDoScrollView>
            <View style = {styles.container}>
                {/*displays all tasks*/}
                <ThemedText style={styles.title}>All Tasks:</ThemedText>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList data={personalTasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
                        <TouchableOpacity style={styles.taskButton} onPress={() => handleTask(item.id, item.taskName, item.description, item.frequency, item.points)}>
                            <Text style={[styles.centerText,{textAlign: 'center'}]}>{item.taskName}</Text>
                            <View style={{ flex: 5 }} />
                            <CheckBox checked={checked[item.id] || false} onPress = {() => handleCheckbox(item.id)} containerStyle = {styles.checkboxContainer}/>
                        </TouchableOpacity>
                    )}
                    />
                </View>

                {/*displays work tasks*/}
                <ThemedText style={styles.title}>Work Tasks:</ThemedText>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList data={workTasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
                        <TouchableOpacity style={styles.taskButton} onPress={() => handleTask(item.id, item.taskName, item.description, item.frequency, item.points)}>
                            <Text style={[styles.centerText,{textAlign: 'center'}]}>{item.taskName}</Text>
                            <View style={{ flex: 5 }} />
                            <CheckBox checked={checked[item.id] || false} onPress = {() => handleCheckbox(item.id)} containerStyle = {styles.checkboxContainer}/>
                        </TouchableOpacity>
                    )}
                    />
                </View>

                {/*displays home tasks*/}
                <ThemedText style={styles.title}>Home Tasks:</ThemedText>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList data={homeTasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
                        <TouchableOpacity style={styles.taskButton} onPress={() => handleTask(item.id, item.taskName, item.description, item.frequency, item.points)}>
                            <Text style={[styles.centerText,{textAlign: 'center'}]}>{item.taskName}</Text>
                            <View style={{ flex: 5 }} />
                            <CheckBox checked={checked[item.id] || false} onPress = {() => handleCheckbox(item.id)} containerStyle = {styles.checkboxContainer}/>
                        </TouchableOpacity>
                    )}
                    />
                </View>
            </View>
        </CanDoScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
        marginTop: 15,
        color: '#0353A4',

    },
    centerText: {
        color: 'white',
        fontSize: 15,
    },
    taskButton: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 85,
        flex: 1,
        maxWidth: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: 'grey'
    },

});