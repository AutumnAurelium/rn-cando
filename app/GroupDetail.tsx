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
       <Text style={[styles.centerText,{textAlign: 'center'}]}>Group #</Text>
       <Text style={[styles.centerText,{color: '#DC7ADD'}]}>Your Tasks:</Text>
       <View style={{ flexDirection: 'row' }}>
            <TabBarIcon name="checkbox" color="#33683E" />
            <Text style={[styles.centerText,{textAlign: 'center'}]}>Text 1</Text>
            <View style={{ flex: 5 }} />
            <TabBarIcon name="enter" style={[styles.icon]} />
       </View>
        <Text style={[styles.DescriptionText]}>Description..</Text>

        <View style={{ flexDirection: 'row' }}>
                    <TabBarIcon name="checkbox" color="#33683E" />
                    <Text style={[styles.centerText,{textAlign: 'center'}]}>Text 2</Text>
                    <View style={{ flex: 5 }} />
                    <TabBarIcon name="enter" style={[styles.icon]} />
        </View>
        <Text style={[styles.DescriptionText]}>Description..</Text>
        <Text style={[styles.centerText,{color: '#DC7ADD'}]}>All Tasks:</Text>

        <View style={{ flexDirection: 'row' }}>
              <TabBarIcon name="checkbox" color="#33683E" />
               <Text style={[styles.centerText,{textAlign: 'center'}]}>Text 3</Text>
                <View style={{ flex: 5 }} />
                <TabBarIcon name="enter" style={[styles.icon]} />
        </View>
        <Text style={[styles.DescriptionText]}>Description..</Text>
        <View style={{ flexDirection: 'row' }}>
              <TabBarIcon name="checkbox" color="#33683E" />
               <Text style={[styles.centerText,{textAlign: 'center'}]}>Text 4</Text>
                <View style={{ flex: 5 }} />
                <TabBarIcon name="enter" style={[styles.icon]} />
        </View>
        <Text style={[styles.DescriptionText]}>Description..</Text>
        <Text style={[styles.centerText,{color: '#DC7ADD'}]}>Participants:</Text>
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
    fontSize: 25,
    color: 'white',
    marginVertical: 0
  },
    DescriptionText: {
      fontSize: 15,
      color: 'white',
      marginVertical: 0
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 0
  },
  icon: {
          flex: 0,
          color: 'white',
          marginRight: 10,
  },

});
