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

// A.K.A. Task List

const db = getFirestore(app);

export default function TasksScreen() {
  const router = useRouter();

  return (
    <CanDoScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#54E2FF' }]} onPress={() => Alert.alert('Personal Button pressed')} >
            <Text style={styles.titleText}>Personal</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#4EFF74' }]} onPress={() => Alert.alert('All tasks Button pressed')} >
            <Text style={styles.titleText}>All Tasks</Text>

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
