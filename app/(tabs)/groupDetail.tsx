import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';

import CanDoScrollView from '@/components/CanDoScrollView';
import { AddTaskPane } from '@/components/AddTaskPane';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { CheckBox } from 'react-native-elements'
import { useState, useEffect } from 'react'
import { collection, addDoc, getFirestore, app, onSnapshot, query, where } from "firebase/firestore";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStaticNavigation,useNavigation, useRoute} from '@react-navigation/native';

const db = getFirestore(app)

export default function GroupsScreen() {

  const navigation = useNavigation();
      const [checked, setChecked] = useState({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
    });
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const route = useRoute()
  const {groupVal} = route.params;

  useEffect(() => {
    const taskCollection = collection(db, 'Tasks')

    const findQuery = query(taskCollection, where('groupName', '==', 0))

    const subscribe = onSnapshot(findQuery,(querySnapshot) => {
        const getTasks = []
        querySnapshot.forEach((list) => {
            getTasks.push({...list.data(), id: list.id})
        })
        setTasks(getTasks)
        console.log(getTasks)
        setLoading(false)
    });
    return () => subscribe();
  }, [groupVal]);

//   useEffect(() => {
//     console.log('tasks:', tasks);
//   }, [tasks]);
  return (
    <CanDoScrollView>
       <Text style={[{fontSize:25},{textAlign: 'center'},{color: '#FACA78'}]}>Group #</Text>
       <Text style={[styles.TitleText,{color: '#54E2FF' }]}>Personal Tasks:</Text>

        <Text style={[styles.TitleText,{color: '#4EFF74'}]}>All Tasks:</Text>
        <FlatList data={tasks} keyExtractor = {(item) => item.id} renderItem={({item}) => (
        <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
               <Text style={[styles.centerText,{textAlign: 'center'}]}>{item.taskName}</Text>
                <View style={{ flex: 5 }} />
            <CheckBox checked={checked.checkbox3} onPress = {() =>setChecked((prev) => ({ ...prev, checkbox3: !prev.checkbox3 }))} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>

        )}
        />
        <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.taskButton} onPress={() => Alert.alert('Task Button pressed')} >
               <Text style={[styles.centerText,{textAlign: 'center'}]}>Text 4</Text>
                <View style={{ flex: 5 }} />
            <CheckBox checked={checked.checkbox4} onPress = {() =>setChecked((prev) => ({ ...prev, checkbox4: !prev.checkbox4 }))} containerStyle = {styles.checkboxContainer}/>
            </TouchableOpacity>
        </View>
        <Text style={[styles.TitleText,{color: '#FACA78'}]}>Participants:</Text>
        <View style={{ flexDirection: 'row' }}>
               <Text style={[styles.centerText,{textAlign: 'center'}]}>Name 1</Text>
                <View style={{ flex: 5 }} />
               <Text style={[styles.centerText,{textAlign: 'center'}]}>50</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
               <Text style={[styles.centerText,{textAlign: 'center'}]}>Name 2</Text>
                <View style={{ flex: 5 }} />
               <Text style={[styles.centerText,{textAlign: 'center'}]}>20</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
               <Text style={[styles.centerText,{textAlign: 'center'}]}>Name 3</Text>
                <View style={{ flex: 5 }} />
               <Text style={[styles.centerText,{textAlign: 'center'}]}>75</Text>
        </View>




    </CanDoScrollView>
  );
}

const styles = StyleSheet.create({
  centerText: {
    fontSize: 15,
    color: 'black',
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

});
