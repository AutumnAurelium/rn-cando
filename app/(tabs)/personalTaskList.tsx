import { Image, StyleSheet, View, TouchableOpacity, Alert, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { CheckBox } from 'react-native-elements'
import { useState } from 'react'

export default function LeaderboardScreen() {
  const [checked, setChecked] = useState({
      aTask1: false,
      aTask2: false,
      wTask1: false,
      wTask2: false,
      hTask1: false,
      hTask2: false,

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
        <ThemedText style={styles.title}>All Tasks:</ThemedText>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 1</Text>
                <CheckBox checked={checked.aTask1} onPress = {() => toggleCheckbox('aTask1')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 2</Text>
                <CheckBox checked={checked.aTask2} onPress = {() => toggleCheckbox('aTask2')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <ThemedText style={styles.title}>Work Tasks:</ThemedText>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 1</Text>
                <CheckBox checked={checked.wTask1} onPress = {() => toggleCheckbox('wTask1')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 2</Text>
                <CheckBox checked={checked.wTask2} onPress = {() => toggleCheckbox('wTask2')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <ThemedText style={styles.title}>Home Tasks:</ThemedText>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 1</Text>
                    <CheckBox checked={checked.hTask1} onPress = {() => toggleCheckbox('hTask1')} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <View style = {styles.titleContainer}>
            <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
                <Text style={styles.taskText}>Task 2</Text>
                <CheckBox checked={checked.hTask2} onPress = {() => toggleCheckbox('hTask2')} containerStyle = {styles.checkboxContainer}/>
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
        color: '#0353A4',

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