import { Image, StyleSheet, View, TouchableOpacity, Alert, Text, FlatList } from 'react-native';
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc, getFirestore, app, onSnapshot, query, where, whereArrayContains } from "firebase/firestore";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { CheckBox } from 'react-native-elements'
import { useState, useEffect } from 'react'
import {createStaticNavigation,useNavigation, useRoute} from '@react-navigation/native';

//database connection
const db = getFirestore(app)

export default function LeaderboardScreen() {
    const navigation = useNavigation();
    //state variables
    const [checked, setChecked] = useState({});
    const [tasks, setTasks] = useState([])

    //function to handleCheckbox
    const handleCheckbox = (task) => {
        setChecked((prev) => ({
            ...prev,
            [task]: !prev[task],
        }));
    };

    //Function to navigate to task details when a task is clicked
    const handleTask = (taskId, taskName, taskDescription, taskFrequency, taskPoints) => {
        //navigates and passes task information as parameters
        navigation.navigate('taskDetail', {taskId, taskName, taskDescription, taskFrequency, taskPoints});
    }

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

    //gets specific tasks, filter gets all the tasks based on the query
    const personalTasks = tasks.filter(task => task.groupName === 0)
    const groupTasks = tasks.filter(task => task.groupName !== 0)

    return (
        <CanDoScrollView>
            <View style = {styles.container}>
                {/*displays all tasks*/}
                <ThemedText style={[styles.title, { color: '#0353A4' }]}>All Tasks:</ThemedText>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList data={tasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
                        <TouchableOpacity style={styles.taskButton} onPress={() => handleTask(item.id, item.taskName, item.description, item.frequency, item.points)}>
                            <Text style={[styles.centerText,{textAlign: 'center'}]}>{item.taskName}</Text>
                            <View style={{ flex: 5 }} />
                            <CheckBox checked={checked[item.id] || false} onPress = {() => handleCheckbox(item.id)} containerStyle = {styles.checkboxContainer}/>
                        </TouchableOpacity>
                    )}
                    />
                </View>

                {/*displays personal tasks*/}
                <ThemedText style={[styles.title, { color: '#7B2CBF' }]}>Personal Tasks:</ThemedText>
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

                {/*displays group tasks*/}
                <ThemedText style={[styles.title, { color: '#EB5E28' }]}>Group Tasks:</ThemedText>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList data={groupTasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
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