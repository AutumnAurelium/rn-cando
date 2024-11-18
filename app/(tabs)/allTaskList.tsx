import { Image, StyleSheet, View, TouchableOpacity, Alert, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { CheckBox } from 'react-native-elements'
import { useState } from 'react'

export default function LeaderboardScreen() {
  const [checked, setChecked] = useState({
    task1: false,
    task2: false,
    pTask1: false,
    pTask2: false,
    gTask1: false,
    gTask2: false,

  });

  const toggleCheckbox = (task) => {
    setChecked((prev) => ({
        ...prev,
        [task]: !prev[task],
    }));
  };
  return (
    <CanDoScrollView>
     <View style = {styles.container}>
        <ThemedText style={[styles.title, { color: '#4EFF74' }]}>All Tasks:</ThemedText>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 1</Text>
                <CheckBox checked={checked.task1} onPress = {() => toggleCheckbox('task1')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 2</Text>
                <CheckBox checked={checked.task2} onPress = {() => toggleCheckbox('task2')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <ThemedText style={[styles.title, { color: '#54E2FF' }]}>Personal Tasks:</ThemedText>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 1</Text>
                <CheckBox checked={checked.pTask1} onPress = {() => toggleCheckbox('pTask1')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 2</Text>
                <CheckBox checked={checked.pTask2} onPress = {() => toggleCheckbox('pTask2')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <ThemedText style={[styles.title, { color: '#FACA78' }]}>Group Tasks:</ThemedText>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 1</Text>
                    <CheckBox checked={checked.gTask1} onPress = {() => toggleCheckbox('gTask1')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 2</Text>
                <CheckBox checked={checked.gTask2} onPress = {() => toggleCheckbox('gTask2')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
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
    taskText: {
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