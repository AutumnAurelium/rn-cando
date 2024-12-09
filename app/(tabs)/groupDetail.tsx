import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';

import CanDoScrollView from '@/components/CanDoScrollView';
import { AddTaskPane } from '@/components/AddTaskPane';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { CheckBox } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { collection, addDoc, doc, getDocs, deleteDoc, getFirestore, app, onSnapshot, query, where } from "firebase/firestore";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStaticNavigation,useNavigation, useRoute} from '@react-navigation/native';

const db = getFirestore(app)

export default function GroupsScreen() {

  const navigation = useNavigation();
  const [checked, setChecked] = useState(null);
  const [tasks, setTasks] = useState([]);
  const route = useRoute()
  const {groupVal, groupName, groupUser, groupDescription, groupBool,groupPassword} = route.params;

  useEffect(() => {
    const taskCollection = collection(db, 'Tasks')

    const findQuery = query(taskCollection, where('groupName', '==', groupVal))

    const subscribe = onSnapshot(findQuery,(querySnapshot) => {
        const getTasks = []
        querySnapshot.forEach((list) => {
            getTasks.push({...list.data(), id: list.id})
        })
        setTasks(getTasks)
        console.log(getTasks)
    });
    return () => subscribe();
  }, [groupVal]);

  const handleCheckbox = (checkbox) =>{
    setChecked((prevChecked) => (prevChecked === checkbox ? null:checkbox));
  }
  const handleTask = (taskId, taskName, taskDescription, taskFrequency, taskPoints) => {
      navigation.navigate('taskDetail', {taskId, taskName, taskDescription, taskFrequency, taskPoints});
      }
  const deleteGroup = async () => {
      const groupDet = doc(db, 'Groups', groupVal)

      try{
          const tasks = collection(db, 'Tasks')
          const taskQ = query(tasks, where('groupName', '==', groupVal))
          const taskCollection = await getDocs(taskQ)

          taskCollection.forEach((task) => {
            deleteDoc(doc(db, 'Tasks', task.id))
          });
          await deleteDoc(groupDet)
          navigation.goBack();
      } catch(error){
          console.error(error)
          }
    }
console.log(groupUser)
  return (
    <CanDoScrollView>
       <Text style={[{fontSize:25},{textAlign: 'center'},{color: 'white'}]}>{groupName}</Text>
       <Text style={[styles.TitleText,{color: '#7A88DD' }]}>Description:</Text>
       <Text style={[styles.centerText]} >{groupDescription}</Text>


       <Text style={[styles.TitleText,{color: '#54E2FF' }]}>Personal Tasks:</Text>


        <Text style={[styles.TitleText,{color: '#7ADDBC'}]}>All Tasks:</Text>
        <View style={{ flexDirection: 'row' }}>
        <FlatList data={tasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
                <TouchableOpacity style={styles.taskButton} onPress={() => handleTask(item.id, item.taskName, item.description, item.frequency, item.points)}>
                       <Text style={[styles.centerText,{textAlign: 'center'}]}>{item.taskName}</Text>
                        <View style={{ flex: 5 }} />
                    <CheckBox checked={checked === item.id} onPress = {() => handleCheckbox(item.id)} containerStyle = {styles.checkboxContainer}/>
                    </TouchableOpacity>

                )}
                />
        </View>
        <Text style={[styles.TitleText,{color: '#DDD87A'}]}>Participants:</Text>
        <View >
                {groupUser ?(
                    groupUser.map((user, index) => (
                    <Text style={[styles.centerText]} key={index}>
                    {user}
                    </Text>
                    ))
                    ):(
                    <Text style={styles.centerText}> No Users </Text>
                 )}
        </View>
        <View style={styles.buttonRow}>
           <TouchableOpacity
             style={{ backgroundColor: 'blue', borderRadius: 8, width: 150 }}
             onPress={() => navigation.navigate('UpdateGroup', { groupVal, groupName, groupDescription, groupBool, groupPassword, groupUser})}
           >
             <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
               Edit Group
             </Text>
           </TouchableOpacity>
         </View>

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

});
