import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';
import CanDoScrollView from '@/components/CanDoScrollView';
import { AddTaskPane } from '@/components/AddTaskPane';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { CheckBox } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc, getFirestore, app, onSnapshot, query, where, whereArrayContains } from "@react-native-firebase/firestore";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStaticNavigation,useNavigation, useRoute} from '@react-navigation/native';

//database connection
const db = getFirestore()

export default function GroupsScreen() {
    //state variables
    const [checked, setChecked] = useState({});
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null)
    //handles navigation and route parameters
    const navigation = useNavigation();
    const route = useRoute()
    const {groupVal, groupName, groupUser, groupDescription, groupBool,groupPassword} = route.params;

    //connects to firebase database to get the tasks
    useEffect(() => {
        //gets the task collection
        const taskCollection = collection(db, 'Tasks')
        //finds the tasks based on the group chosen
        const findQuery = query(taskCollection, where('groupName', '==', groupVal))
        //gets tasks and stores it in an array
        const subscribe = onSnapshot(findQuery,(querySnapshot) => {
            const getTasks = []
            querySnapshot.forEach((list) => {
                getTasks.push({...list.data(), id: list.id})
            })
            setTasks(getTasks)
            console.log(getTasks)
        });
        return () => subscribe();
    }, [groupVal]); //if groupVal changes useEffect() is called again to get tasks

    //function for handling checkbox
    const handleCheckbox = async(id, points) =>{
        //update the checked state based on the task id
        setChecked((prevChecked) => {const checkedTasks = { ...prevChecked, [id]: !prevChecked[id]}
        //gets the current user by finding the name
        const currUser = groupUser.find(user => user.name === 'You')
        //if task is checked, the points are updated
        if(checkedTasks[id]){
            //gets the score and adds it to the points
            const newPoints = currUser.score + points
            //gets the index of the current user
            const index = groupUser.findIndex((user) => user.name === 'You')

            const groupsDoc = doc(db, 'Groups', groupVal)
            //updates the user score
            updateDoc(groupsDoc, {users: groupUser.map((user, i) =>
                i === index ? {...user, score: newPoints}:user
            )
            })
        }
        return checkedTasks
        })
    }

    //Function to navigate to task details when a task is clicked
    const handleTask = (taskId, taskName, taskDescription, taskFrequency, taskPoints) => {
        //navigates and passes task information as parameters
        navigation.navigate('taskDetail', {taskId, taskName, taskDescription, taskFrequency, taskPoints});
    }

    //Function to delete group and related tasks
    const deleteGroup = async () => {
        const groupDet = doc(db, 'Groups', groupVal)

        try{
            //gets the tasks related to the specific group
            const tasks = collection(db, 'Tasks')
            const taskQ = query(tasks, where('groupName', '==', groupVal))
            const taskCollection = await getDocs(taskQ)
            //delete the tasks related to the chosen group
            taskCollection.forEach((task) => {
                deleteDoc(doc(db, 'Tasks', task.id))
            });
            //deletes the group
            await deleteDoc(groupDet)
            //goes to the previous page
            navigation.goBack();
        } catch(error){
            console.error(error)
        }
    }
    return (
        <CanDoScrollView>
            {/*displays the group name and group description from the database*/}
            <Text style={[{fontSize:25},{textAlign: 'center'},{color: 'white'}]}>{groupName}</Text>
            <Text style={[styles.TitleText,{color: '#7A88DD' }]}>Description:</Text>
            <Text style={[styles.centerText]} >{groupDescription}</Text>


            <Text style={[styles.TitleText,{color: '#54E2FF' }]}>Personal Tasks:</Text>

            {/*displays all tasks related to the group with checkboxes*/}
            <Text style={[styles.TitleText,{color: '#7ADDBC'}]}>All Tasks:</Text>
            <View style={{ flexDirection: 'row' }}>
                <FlatList data={tasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
                    <TouchableOpacity style={styles.taskButton} onPress={() => handleTask(item.id, item.taskName, item.description, item.frequency, item.points)}>
                        <Text style={[styles.centerText,{textAlign: 'center'}]}>{item.taskName}</Text>
                        <View style={{ flex: 5 }} />
                        <CheckBox checked={checked[item.id] || false} onPress = {() => handleCheckbox(item.id, item.points)} containerStyle = {styles.checkboxContainer}/>
                    </TouchableOpacity>

                )}
                />
            </View>

            {/*displays the participants name and score from the database*/}
            <Text style={[styles.TitleText,{color: '#DDD87A'}]}>Participants:</Text>
            <View >
                {groupUser ?(groupUser.map((user, index) => (
                    <View style={styles.participantRow} key={index}>
                        <Text style={[styles.centerText]}>{user.name}</Text>
                        <Text style={[styles.centerText, { marginLeft: 'auto' }]}>Score: {user.score}</Text>
                    </View>
                ))):(
                    <Text style={styles.centerText}> No Users </Text>
                 )}
            </View>

            {/*displays the edit group button*/}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius: 8, width: 150 }}
                onPress={() => navigation.navigate('updateGroup', { groupVal, groupName, groupDescription, groupBool, groupPassword, groupUser})}
                >
                    <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>Edit Group</Text>
                </TouchableOpacity>
            </View>

            {/*displays the delete group button*/}
            <View style = {styles.buttonRow}>
                <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 8, width: 150}} onPress={deleteGroup} >
                    <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>Delete Group</Text>
                    <View style={{ flex: 5 }} />
                </TouchableOpacity>
            </View>
        </CanDoScrollView>
    );
}

const styles = StyleSheet.create({
    centerText: {
        fontSize: 17,
        color: 'white',
    },
    TitleText: {
        fontSize: 20,
        marginVertical: 0
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    icon: {
        flex: 0,
        color: 'white',
        marginRight: 10,
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    participantRow: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
