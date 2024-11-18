import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';

import CanDoScrollView from '@/components/CanDoScrollView';
import { AddTaskPane } from '@/components/AddTaskPane';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStaticNavigation,useNavigation,} from '@react-navigation/native';

import LoremIpsumGenerator from '@/components/LoremIpsum';

export default function GroupsScreen() {
  const navigation = useNavigation();
  return (
    <CanDoScrollView>
        <View style={styles.buttonContainer}>
           <TouchableOpacity style={[styles.button, { backgroundColor: '#DC7ADD' }]} onPress={() => navigation.navigate('GroupDetail')} >
               <Text style={styles.titleText}>Group 1</Text>
               <Text style={styles.buttonText}>Name 1 - 50 points</Text>
               <Text style={styles.buttonText}>Name 2 - 20 points</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.button, { backgroundColor: '#7A88DD' }]} onPress={() => navigation.navigate('GroupDetail')} >
                <Text style={styles.titleText}>Group 2</Text>
                <Text style={styles.buttonText}>Name 1 - 50 points</Text>
                <Text style={styles.buttonText}>Name 2 - 20 points</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#7ADDBC' }]} onPress={() => navigation.navigate('GroupDetail')} >
                <Text style={styles.titleText}>Group 3</Text>
                <Text style={styles.buttonText}>Name 1 - 50 points</Text>
                <Text style={styles.buttonText}>Name 2 - 20 points</Text>

            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#E2DDE2' }]} onPress={() => Alert.alert('Add New Group Button Pressed')} >
                <TabBarIcon name="add" style = {styles.icon}/>
                <Text style={styles.titleText}></Text>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
     },
     button: {
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
        height: 180,
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
