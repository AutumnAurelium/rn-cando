import { getApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "@/app/init";

import { Image, StyleSheet, Platform, Button, View, TouchableOpacity, Text, Alert } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect, useRouter } from 'expo-router';
import CanDoScrollView from '@/components/CanDoScrollView';
import LoremIpsumGenerator from '@/components/LoremIpsum';
import { useEffect } from "react";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

// A.K.A. Task List

const db = getFirestore(app);

export default function TasksScreen() {
  const router = useRouter();

  const navigateToAllTasks = () => {
    router.push('/allTaskList');
  }
  const navigateToPersonalTasks = () => {
    router.push('/personalTaskList');
  }
  const navigateToGroups = () => {
    router.push('/groups')
  }
  const navigateToGroupDetails = () => {
    router.push('/groupDetail')
  }
  return (
    <CanDoScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#54E2FF' }]} onPress={navigateToPersonalTasks} >
            <Text style={styles.titleText}>Personal</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#4EFF74' }]} onPress={navigateToAllTasks} >
            <Text style={styles.titleText}>All Tasks</Text>

        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.groupButton, { backgroundColor: '#FACA78' }]} onPress={navigateToGroups} >
            <Text style={styles.groupText}>Groups</Text>

        </TouchableOpacity>
        <TouchableOpacity style={[styles.overlayButton, { backgroundColor: '#FFFFFF' }]} onPress={navigateToGroupDetails} >
            <Text style={styles.gText}>Group 1</Text>

        </TouchableOpacity>
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
  },
  groupButton: {
    borderRadius:15,
    width: 325,
    height:300,
    alignItems: 'center'
  },
  overlayButton: {
    position: 'absolute',
    marginTop: 60,
    marginLeft: 10,
    width: 325,
    height: 60,
    justifyContent: 'center',
  },
  groupText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gText: {
    color: '#000000',
    fontSize: 18,
    marginLeft: 5,
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
