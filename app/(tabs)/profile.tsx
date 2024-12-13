import { getApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "@react-native-firebase/firestore";
import React, { useState } from 'react';
import { app } from "@/app/init";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const db = getFirestore()

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showList, setShowList] = useState(false);
    return (
        <CanDoScrollView>
            <Text style={[{fontSize:25},{textAlign: 'center'},{color: '#FFFFFF'}]}>Name</Text>

            {/*input for changing username and password*/}
            <TextInput
            style={[styles.input, { color: '#FFFFFF' }]}
            placeholder="Change Username"
            placeholderTextColor={"#aaaaaa"}
            value={username}
            onChangeText={setUserName}
            />
            <TextInput
            secureTextEntry={!showPassword}
            style={[styles.input, { color: '#FFFFFF' }]}
            placeholderTextColor={"#aaaaaa"}
            placeholder="Change Password "
            value={password}
             onChangeText={setPassword}
            />

            {/*adds profile info to the database*/}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#D9D9D9' }]}
                onPress={() =>
                addDoc(collection(db, "Users"), {
                username:username,
                password:password,
                }).then(() => {
                    console.log("Profile added to database")
                })}
            >
                <Text style={[styles.buttonText, {color: '#222222'}]}>Save</Text>
            </TouchableOpacity>

            {/*shows total points*/}
            <TouchableOpacity
                style={[styles.button]}
                onPress={() => setShowList(!showList)}
            >
                <Text style={styles.buttonText}>Total Points</Text>
            </TouchableOpacity>
            {showList && (
                <View style={styles.container}>
                    <FlatList
                    data={[
                    { key: 'Group 1 = 990' },
                    { key: 'Group 2 = 4902' },
                    { key: 'Total Point = 3094' },
                    ]}
                    renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                />
                </View>
            )}

            {/*log out button*/}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#D10000' }]}
                onPress={() => GoogleSignin.signIn()}
            >
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
        </CanDoScrollView>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
      },
    button: {
        padding: 10,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: '#FFFFFF',
    },
});
