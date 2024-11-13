import { getApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "@/app/init";

import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { useState } from 'react';
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors';

const db = getFirestore(app)



export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showList, setShowList] = useState(false);
      const saveProfile = () => {
        addDoc(collection(db, "profile"), {
            username:username,
            password:password,

        }).then(() => {
            console.log("profile added to database")
        });
      }
  return (
    <CanDoScrollView>
      <Text style={[styles.input, { color: name ? '#FFFFFF' : '#aaaaaa' }]}>
                {name || "Name"}
      />
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
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#D9D9D9' }]}
                onPress={() => Alert.alert('Save Button pressed')}
            >
                <Text style={[styles.buttonText, {color: '#222222'}]}>Save</Text>
            </TouchableOpacity>

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

       <TouchableOpacity
          style={[styles.button, { backgroundColor: '#D10000' }]}
           onPress={() => Alert.alert('Log Out Button pressed')}
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
