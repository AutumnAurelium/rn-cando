import { getApp } from "firebase/app";
import { collection, addDoc, getFirestore, onSnapshot, query, where } from "@react-native-firebase/firestore";
import { app } from "@/app/init";
import { Image, StyleSheet, Platform, Button, View, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect, useRouter } from 'expo-router';
import CanDoScrollView from '@/components/CanDoScrollView';
import LoremIpsumGenerator from '@/components/LoremIpsum';
import { useEffect, useState } from "react";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

// A.K.A. Task List

const db = getFirestore();

export default function TasksScreen() {
    const router = useRouter();

    //handles navigation to other pages
    const navigateToAllTasks = () => {
        router.push('/allTaskList');
    }
    const navigateToPersonalTasks = () => {
        const personalTasks = tasks.filter(task => task.groupName === 0)
        console.log(personalTasks)
        router.push('/personalTaskList', {personalTasks});
    }
    const navigateToGroups = () => {
        router.push('/groups')
    }
    const navigateToGroupDetails = () => {
        router.push('/groups')
    }

    //state variables
    const [groups, setGroups] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
      async function login() {
        if(!signedIn) {
          setSignedIn(true);
          await GoogleSignin.signIn();
        }
      }

      login();
    });

    //gets the group information from the database
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

    return (
        <CanDoScrollView>
            <View style={styles.buttonContainer}>
                {/*personal tasks button*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#7B2CBF' }]} onPress={navigateToPersonalTasks} >
                    <Text style={styles.titleText}>Personal</Text>
                </TouchableOpacity>

                {/*all tasks button*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#0353A4' }]} onPress={navigateToAllTasks} >
                    <Text style={styles.titleText}>All Tasks</Text>
                </TouchableOpacity>
            </View>

            <View>
                {/*gets the group names and displays it*/}
                <Text style={styles.groupText}>Groups</Text>
                {groups.map((group) => (
                    <TouchableOpacity key = {group.id} style={[styles.groupButton, {backgroundColor: group.color}]} onPress={navigateToGroupDetails} >
                        <Text style={styles.gText}>{group.groupName}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </CanDoScrollView>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 25,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderColor: 'white',
    borderWidth: 3,
  },
  groupButton: {
    borderRadius:15,
    width: 325,
    height:75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%'
  },
  overlayButton: {
    position: 'absolute',
    marginTop: 60,
    marginLeft: 10,
    width: 325,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  groupText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  gText: {
    fontSize: 18,
    marginLeft: 5,
    textAlign: 'center',
    color: 'white'
  },
  buttonText: {
    padding: 3,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 1,
  },
  icon: {
    color:'#000000',
    padding: 35,
    fontSize: 50,
  },
});
