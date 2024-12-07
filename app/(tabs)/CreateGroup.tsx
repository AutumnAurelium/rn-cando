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
import {createStaticNavigation,useNavigation,} from '@react-navigation/native';

const db = getFirestore(app)

export default function GroupsScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;
    const colorTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
    const [color, setColor] = useState("Blue");
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [passwordBool, setPasswordBool] = useState(false);
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const colorHexes = {
        blue: '#7A88DD',
        pink: '#DC7ADD',
        green: '#7ADDBC',
        red: '#DD7A7F',
        yellow: '#DDD87A',
        lightBlue: '#7ADBDD',
        purple: '#A87ADD',
        brown: '#DDA57A'
    };

  return (
    <CanDoScrollView>
       <View style={{ flexDirection: 'row' ,marginBottom: 110 }}>
            <TouchableOpacity style={[styles.addUserButton, { position: 'absolute', top: 5, right: 20}]}onPress={() => navigation.navigate('addUserToGroup')} >
                 <TabBarIcon name="add" style = {styles.icon}/>
            <Text style={[styles.centerText]}>Add User</Text>
            </TouchableOpacity>
       </View>
          <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
                 placeholder="Name of Group"
                 placeholderTextColor="#999"
                    value={groupName}
                    onChangeText={setGroupName}
           />
          <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
                 placeholder="Description"
                 placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
               />
       <View style={[styles.input, { color: '#FFFFFF' }, {flexDirection: 'row'} ]} >
          <ThemedText style={{verticalAlign: 'middle',fontSize:20, flexGrow: 1}}>Password</ThemedText>
          <Switch trackColor={{false: colorTheme.colors.border, true: colorTheme.colors.border}} value={passwordBool} onChange={() => setPasswordBool(!passwordBool)} />
        {passwordBool && (
            <TextInput
                style={[styles.input, { color: '#FFFFFF' }]}
                placeholder="Enter Password"
                placeholderTextColor="#999"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
        )}
       </View>
        <View style={[styles.row]}>
            <ThemedText style={styles.color}>Color</ThemedText>
            <Picker selectedValue={color} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setColor}>
                <Picker.Item label="Blue" value="blue" />
                <Picker.Item label="Pink" value="pink" />
                <Picker.Item label="Green" value="green" />
                <Picker.Item label="Red" value="red" />
                <Picker.Item label="Yellow" value="yellow" />
                <Picker.Item label="Light Blue" value="lightBlue" />
                <Picker.Item label="Purple" value="purple" />
                <Picker.Item label="Brown" value="brown" />
            </Picker>
        </View>
        <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 8, marginVertical: 20 }} onPress={() =>{ addDoc(collection(db, "Groups"), {
              groupName:groupName,
              passwordBool:passwordBool,
              description:description,
              color:colorHexes[color],
              password:password,
              }).then(() => {
              console.log("Create Group added to database");
              }).catch((error) => {
                  console.log(error);
                  })
                }}
                    >
            <Text style={styles.buttonText}>Create</Text>
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
     addUserButton: {
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
