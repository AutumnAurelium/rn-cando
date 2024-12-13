import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,FlatList } from 'react-native';
import CanDoScrollView from '@/components/CanDoScrollView';
import { AddTaskPane } from '@/components/AddTaskPane';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import {useState, useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStaticNavigation,useNavigation, useRoute} from '@react-navigation/native';
import { collection, addDoc, getFirestore, app, onSnapshot, query, where } from "firebase/firestore";

//database connection
const db = getFirestore(app)

export default function GroupsScreen() {
    const navigation = useNavigation();
    const route = useRoute()
    //state variables
    const [groups, setGroups] = useState([])
    const [user, setUser] = useState([])

    //use effect to get groups from the database
    useEffect(() => {
        const getGroups = collection(db, 'Groups')

        const subscribe = onSnapshot(getGroups, (querySnapshot) => {
            const addGroups = []
            querySnapshot.forEach((list) => {
                addGroups.push({...list.data(), id: list.id})
            })
            setGroups(addGroups)
            console.log(addGroups)
        });
        return () => subscribe();
    }, []);

    return (
        <CanDoScrollView>
            <View style={styles.buttonContainer}>
                {/*gets the all groups from the database adn displays it*/}
                {groups.map((group) => (
                    <TouchableOpacity style={[styles.button, {backgroundColor: group.color}]} onPress={() => navigation.navigate('groupDetail', {groupVal : group.id, groupName: group.groupName, groupUser: group.users,
                                                                                                                                            groupDescription: group.description, groupBool:group.passwordBool, groupPassword: group.password })} >
                        <Text key = {user.id} style={styles.titleText}>{group.groupName}</Text>
                        {group.users ?(
                        group.users.map((user, index) => (
                            <Text style={styles.buttonText} key={index}>
                            {user.name}
                            </Text>
                        ))
                        ):(
                            <Text style={styles.buttonText}> No Users </Text>
                        )}
                    </TouchableOpacity>
                ))}

                {/*add group button*/}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#E2DDE2' }]}  onPress={() => navigation.navigate('createGroup')} >
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
        flexWrap: 'wrap',
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
