import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';
import CanDoScrollView from '@/components/CanDoScrollView';
import { AddTaskPane } from '@/components/AddTaskPane';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { CheckBox } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { collection, addDoc, doc, getDocs, deleteDoc, getFirestore, app, onSnapshot, query, where } from "@react-native-firebase/firestore";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStaticNavigation,useNavigation, useRoute} from '@react-navigation/native';

//database connection
const db = getFirestore()

export default function TasksScreen() {
    const navigation = useNavigation();
    const route = useRoute()
    const { taskId, taskName, taskDescription, taskFrequency, taskPoints } = route.params;

    //function to delete a task
    const deleteTask = async () => {
        const taskDet = doc(db, 'Tasks', taskId)
        try{
            await deleteDoc(taskDet)
            navigation.goBack();
        } catch(error){
            console.error(error)
        }
    }

    return(
        <CanDoScrollView>
            <View style={styles.container}>
                {/*displays task information*/}
                <Text style={styles.title}>{taskName}</Text>
                <Text style={styles.description}>{taskDescription}</Text>
                <Text style={styles.frequency}>Frequency: {taskFrequency}</Text>
                <Text style={styles.points}>Points: {taskPoints}</Text>
                {/*delete button*/}
                <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 8, width: 150, justifyContent: 'center', alignSelf: 'center'}} onPress={deleteTask} >
                    <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>Delete Task</Text>
                    <View style={{ flex: 5 }} />
                </TouchableOpacity>
            </View>
        </CanDoScrollView>
    )
}

const styles = StyleSheet.create({
  description: {
    fontSize: 15,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 0,
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  frequency:{
    fontSize: 15,
    color: 'white',
    marginVertical: 20,
  },
  points:{
    fontSize: 15,
    color: 'white',
    marginVertical: 20,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
