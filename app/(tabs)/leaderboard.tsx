import { Image, StyleSheet, View, Text, FlatList, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import CanDoScrollView from '@/components/CanDoScrollView';
import { Colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';
import { getApp } from "@react-native-firebase/app";
import { collection, addDoc, getFirestore, onSnapshot, query, where } from "@react-native-firebase/firestore";
import { app } from "@/app/init";

//database connection
const db = getFirestore(app)

export default function LeaderboardScreen() {
    //state variables
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [group, setGroup] = useState(null);

    //use effect tog et groups from the database
    useEffect(() => {
        const getGroups = collection(db, 'Groups')
        const subscribe = onSnapshot(getGroups, (querySnapshot) => {
            const addGroups = []
            querySnapshot.forEach((list) => {
                addGroups.push({...list.data(), id: list.id})
            })
            setGroups(addGroups)
        });
        return () => subscribe();
    }, []);

    //function to handle group selection from the picker
    const handleGroup = (groupId) => {
        setGroup(groupId)
        const chosenGroup = groups.find((group) => group.id === groupId);
        if(chosenGroup.users){
            setUsers(chosenGroup.users);
        }
    }

    //sort data based on the score
    const sortedData = [...users].sort((a, b) => b.score - a.score)
    //get the top three users
    const topThree = sortedData.slice(0, 3)

    const colorScheme = useColorScheme() ?? 'light';
    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;

    return (
        <CanDoScrollView>
            <View style={styles.labeledInputContainer}>
                {/*dropdown to choose group*/}
                <ThemedText style={styles.label}>Choose Group</ThemedText>
                <Picker selectedValue={group} onValueChange={handleGroup}
                style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem}>
                {groups.map((group) => (
                    <Picker.Item label={group.groupName} value={group.id} key={group.id}/>
                ))}
                </Picker>
            </View>

            {/*displays the top three*/}
            <View style={styles.headerRow}>
                <View style={styles.leftColumn}>
                    <Text style={styles.headerText}>{topThree[1]?.name}</Text>
                    <Text style={styles.two}>2</Text>
                </View>
                <View style={styles.centerColumn}>
                    <Text style={styles.headerText}>{topThree[0]?.name}</Text>
                    <Text style={styles.one}>1</Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.headerText}>{topThree[2]?.name}</Text>
                    <Text style={styles.three}>3</Text>
                </View>
            </View>

            {/*displays all the users and scores of that group*/}
            <FlatList data={sortedData} keyExtractor={(item, index) => index.toString()} renderItem={({ item, index }) => (
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.rowText}>{index + 1}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.rowText}>{item.name}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.rowText}>{item.score}</Text>
                    </View>
                </View>
            )}
            />
        </CanDoScrollView>
    );
}
const styles = StyleSheet.create({
     dropdown: {
        color: 'white',
        flexShrink: 1,
        flexGrow: 1,
        height: 90,
     },
     dropdownItem: {
        color: 'white',
        fontSize: 12,
        height: 90
     },
     groupName: {
        marginRight: 10,
        color: 'white',
        fontSize: 12
     },
    label: {
        verticalAlign: 'middle',
        flex: 1,
        margin: 14,
        color: 'white'
      },
    labeledInputContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    headerRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 10,
    },
    leftColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7F33D',
        marginRight: 10,
    },
    two: {
        color: '#B4B0B0',
        fontSize: 75,
        textShadowColor: 'white',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    one: {
        color: '#FFD900',
        fontSize: 100,
        textShadowColor: 'white',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    three: {
        color: '#AF7543',
        fontSize: 50,
        textShadowColor: 'white',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 3,
    },
    centerColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#39CE75',
        marginHorizontal: 10,
    },
    rightColumn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BF3434',
        marginLeft: 10,
    },
    column: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
        textShadowColor: 'white',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    rowText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});