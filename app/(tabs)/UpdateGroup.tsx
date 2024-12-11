import { useState, useEffect } from 'react';
import { View, Text,Alert, TextInput,Switch, TouchableOpacity, useColorScheme,StyleSheet } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { Colors } from '@/constants/Colors';
import CanDoScrollView from '@/components/CanDoScrollView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedText } from '@/components/ThemedText';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const db = getFirestore();

export default function UpdateGroup() {
    const colorScheme = useColorScheme() ?? 'light';
    const tint = colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint;
    const colorTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
      const navigation = useNavigation();
      const route = useRoute();
      const { groupVal, groupName,groupDescription,groupBool, groupPassword, groupUser, groupColor} = route.params;

      const [newGroupName, setNewGroupName] = useState(groupName);
      const [newGroupDescription, setNewGroupDescription] = useState(groupDescription);
      const [newGroupBool, setNewGroupBool] = useState(groupBool);
      const [newGroupPassword, setNewGroupPassword] = useState(groupPassword);
      const [newGroupUser, setNewGroupUser] = useState(groupUser||[]);
      const [newGroupColor, setNewGroupColor] = useState(groupColor);

    useEffect(() => {
        setNewGroupName(groupName);
        setNewGroupDescription(groupDescription);
        setNewGroupBool(groupBool)
        setNewGroupPassword(groupPassword);
        setNewGroupUser(groupUser);
        setNewGroupColor(groupColor);
    }, [groupName,groupDescription,groupBool,groupPassword,groupUser,groupColor]);

      const updateGroup = async () => {
        try {
          const groupRef = doc(db, 'Groups', groupVal);
            if (
              !newGroupName.trim() &&
              !newGroupDescription.trim() &&
              (newGroupBool && (!newGroupPassword || newGroupPassword.trim() === ''))
            ) {
              Alert.alert('Error', 'At least one field must filled.');
              return;
            }
          await updateDoc(groupRef, {
            groupName: newGroupName,
            description: newGroupDescription,
            passwordBool: newGroupBool,
            password: newGroupPassword,
            users: newGroupUser,
            color: newGroupColor,
          });
      Alert.alert('Group updated successfully!');
              navigation.goBack();
        } catch (error) {
          console.error('Error updating group:', error);
        }
      };
  const handleAddUser = () => {
            setNewGroupUser([...newGroupUser, '']);
        };

        const handleUserNameChange = (index, value) => {
            const updatedNames = [...newGroupUser];
            updatedNames[index] = value;
            setNewGroupUser(updatedNames);
        };
  return (
          <CanDoScrollView>
    <View style={styles.container}>
           <Text style={[styles.centerText]} >Group Name</Text>
          <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
                 placeholder="Update Group Name"
                 placeholderTextColor="#999"
                    value={newGroupName}
                    onChangeText={setNewGroupName}
           />
           <Text style={[styles.centerText]} >Group Description</Text>

          <TextInput
              style={[styles.input, { color: '#FFFFFF' }]}
                 placeholder="Update Group Description"
                 placeholderTextColor="#999"
                 value={newGroupDescription}
                 onChangeText={setNewGroupDescription}
           />
        <Text style={[styles.centerText]} >Password</Text>
       <View style={[styles.input, { color: '#FFFFFF' }, {flexDirection: 'row'} ]} >
          <ThemedText style={{verticalAlign: 'middle',fontSize:20, flexGrow: 1}}>Password</ThemedText>
          <Switch trackColor={{false: colorTheme.colors.border, true: colorTheme.colors.border}} value={newGroupBool} onChange={() => setNewGroupBool(!newGroupBool)} />
        {newGroupBool ? (
            <TextInput
                style={[styles.input, { color: '#FFFFFF' }]}
                placeholder="Enter Password"
                placeholderTextColor="#999"
                secureTextEntry={true}
                value={newGroupPassword}
                onChangeText={setNewGroupPassword}
            />
            ) : null}
            </View>

            <View style={styles.row}>
                       <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
                           <TabBarIcon name="add" style={styles.icon} />
                           <Text style={styles.centerText}>Add User</Text>
                       </TouchableOpacity>
                   </View>
                   {groupUser ?(
                   newGroupUser.map((user, index) => (
                       <TextInput
                           key={index}
                           style={[styles.input, { color: '#FFFFFF' }]}
                           placeholderTextColor="#aaaaaa"
                           placeholder="Enter User Name"
                           value={user}
                           onChangeText={(value) => handleUserNameChange(index, value)}
                       />
                    ))
                    ):(
                    <Text style={styles.centerText}> No Users </Text>

                 )}

<View style={[styles.row]}>
            <ThemedText style={styles.color}>Color</ThemedText>
            <Picker selectedValue={newGroupColor} style={styles.dropdown} dropdownIconColor={tint} itemStyle={styles.dropdownItem} onValueChange={setNewGroupColor}>
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
      <TouchableOpacity style={styles.button} onPress={updateGroup}>
        <Text style={styles.buttonText}>Update Group</Text>
      </TouchableOpacity>
    </View>
     </CanDoScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
     row: {
         flexDirection: 'row',
         alignItems: 'center',
         marginVertical: 10,
     },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
     centerText: {
         fontSize: 15,
         color: 'white',
     },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
       addButton: {
           flexDirection: 'row',
           alignItems: 'center',
           marginRight: 10,
       },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
});
