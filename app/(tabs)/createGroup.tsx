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

//database connection
const db = getFirestore(app)

export default function GroupsScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;
    const colorTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
    //state variables
    const [color, setColor] = useState("Blue");
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [passwordBool, setPasswordBool] = useState(false);
    const [password, setPassword] = useState('');
    const [userArray, setUserArray] = useState([]);
    const [showAddUserScreen, setShowAddUserScreen] = useState(false);

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

    //function to create a new group
    const handleCreateGroup = async () => {
        //checks if all the inputs are filled
        if (!groupName.trim("")||!description.trim("")||(passwordBool && (!password || password.trim() === ''))) {
            Alert.alert('Error', 'One or more fields are missing.');
            return;
        }
        const updateUser = [...userArray, {name: 'You', score: 0}]
        try {
            //adds the group data to groups collection
            await addDoc(collection(db, 'Groups'), {
            groupName,
            description,
            passwordBool,
            password: passwordBool ? password : null,
            color: colorHexes[color],
            users: updateUser,
            });
            Alert.alert('Group created successfully!');

            //resets states
            setGroupName('');
            setDescription('');
            setPassword('');
            setUserArray([]);
            setPasswordBool(false);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    //function to add a user
    const handleAddUser = () => {
        const newUser = {name: '', score: 0}
          setUserArray([...userArray, newUser]);
    };

    const handleUserNameChange = (index, value) => {
        const updatedNames = [...userArray];
        updatedNames[index].name = value;
        setUserArray(updatedNames);
    };

    return (
        <CanDoScrollView>
            <View style={{ flexDirection: 'row' ,marginBottom: 0 }}>

            </View>

            {/*group name and description input*/}
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

            {/*password toggle*/}
            <View style={[styles.input, { color: '#FFFFFF' }, {flexDirection: 'row'} ]} >
                <ThemedText style={{verticalAlign: 'middle',fontSize:20, flexGrow: 1}}>Password</ThemedText>
                <Switch trackColor={{false: colorTheme.colors.border, true: colorTheme.colors.border}} value={passwordBool} onChange={() => setPasswordBool(!passwordBool)} />
                {passwordBool ? (
                <TextInput
                style={[styles.input, { color: '#FFFFFF' }]}
                placeholder="Enter Password"
                placeholderTextColor="#999"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />
                ) : null}
            </View>

            {/*add user button*/}
            <View style={styles.row}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
                    {/*<TabBarIcon name="add" style={styles.icon} />*/}
                    <Text style={styles.centerText}>Add User</Text>
                </TouchableOpacity>
            </View>
            {/*creates an input for each new user*/}
           {userArray.map((user, index) => (
                <View key = {index}>
                    <TextInput
                    style={[styles.input, { color: '#FFFFFF' }]}
                    placeholderTextColor="#aaaaaa"
                    placeholder="Enter User Name"
                    value={user.name}
                    onChangeText={(value) => handleUserNameChange(index, value)}
                    />
                    <Text style={styles.centerText}>
                    {user && user.name && user.score !== undefined ? `${user.name} - ${user.score}`: 'User'}
                    </Text>
                </View>
            ))}

            {/*color picker dropdown*/}
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

            {/*create group button*/}
            <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
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
         fontSize: 20,
         height: 50,
         borderBottomWidth: 1,
         borderBottomColor: 'grey',
         textAlign: 'center',
         marginBottom: 10,
     },
     row: {
         flexDirection: 'row',
         alignItems: 'center',
         marginVertical: 10,
     },
     addButton: {
         flexDirection: 'row',
         alignItems: 'center',
         marginRight: 10,
     },
     icon: {
         color: 'white',
         fontSize: 20,
     },
     dropdown: {
         color: 'white',
         flexShrink: 1,
         flexGrow: 1,
     },
     createButton: {
         backgroundColor: '#4CAF50',
         padding: 15,
         alignItems: 'center',
         marginTop: 20,
     },
     buttonText: {
         color: 'white',
         fontSize: 20,
         textAlign: 'center',
     },
 });