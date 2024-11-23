import {Text, TextInput, View, StyleSheet, TouchableOpacity, useColorScheme,  Switch,Alert } from 'react-native';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Picker } from '@react-native-picker/picker';
import { app } from "@/app/init";
import { getApp } from "firebase/app";
const db = getFirestore(app)

export default function AddUserToGroup() {
  const [name, setName] = useState('');
  const [userArray, setUserArray] = useState<string[]>([]);
  const [showInputUser, setShowInputUser] = useState(false);
  const [showInputTask, setShowInputTask] = useState(false);
  const [taskArray, setTaskArray] = useState<string[]>([]);
  const [task, setTask] = useState('');



  return (
    <CanDoScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {if (!showInputUser) {setShowInputUser(true);}
                        else if (name.trim()) {setUserArray([...userArray, name]); setName('');setShowInputUser(false);}
          }}
        >
          <TabBarIcon name="add" style={styles.icon} />
          <Text style={styles.centerText}>
            {showInputUser ? 'Add User' : 'Add User'}
          </Text>
        </TouchableOpacity>
      </View>
      {showInputUser && (
                <TextInput
                  style={[styles.input, { color: '#FFFFFF' }]}
                  placeholderTextColor="#aaaaaa"
                  placeholder="Add User"
                  value={name}
                  onChangeText={setName}
                />
              )}

               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <TouchableOpacity
                 style={styles.addButton}
                 onPress={() => {if (!showInputTask) {setShowInputTask(true);}
                               else if (task.trim()) {setTaskArray([...taskArray, task]); setTask('');setShowInputTask(false);}
                 }}
               >
                 <TabBarIcon name="add" style={styles.icon} />
                 <Text style={styles.centerText}>
                   {showInputTask ? 'Add Tasks' : 'Add Tasks'}
                 </Text>
               </TouchableOpacity>
             </View>
             {showInputTask && (
                       <TextInput
                         style={[styles.input, { color: '#FFFFFF' }]}
                         placeholderTextColor="#aaaaaa"
                         placeholder="Add Task"
                         value={task}
                         onChangeText={setTask}
                       />
                     )}
        <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 8, marginVertical: 20 }} onPress={() => addDoc(collection(db, "Groups"), {
                                                                                                                                                             users:userArray,
                                                                                                                                                             tasks:taskArray,
                                                                                                                                                         }).then(() => {
                                                                                                                                                             console.log("Add user added to database")
                                                                                                                                                         })}
                    >
            <Text style={styles.buttonText}>Save</Text>
         </TouchableOpacity>
           </CanDoScrollView>
  );
}

const styles = StyleSheet.create({
  centerText: {
    fontSize: 15,
    color: 'white',
  },
  input: {
      fontSize:20,
          height: 85,
          flex: 0,
          maxWidth: '100%',
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          textAlign: 'center'
  },
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
      icon: {
          flex: 0,
           color: 'white',
           fontSize: 20,

      },
     addButton: {
          padding: 2,
          alignItems: 'right',
          justifyContent: 'right',
          flexDirection: 'row',
          height: 30,
          flex: 1,
          maxWidth: '25%',
          justifyContent: 'right',
          borderBottomWidth: 2,
          borderBottomColor: 'grey',
      },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 0
    },
  dropdown: {
    color: 'white',
    flexShrink: 1,
    flexGrow: 1,
    height: 90
  },
  dropdownItem: {
    color: 'white',
    fontSize: 20,
    height: 90
  },
   color: {
      marginRight: 2,
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
    },
  buttonText: {
    color: 'white',
    fontSize: 24,
     textAlign: 'center'

  },
});
