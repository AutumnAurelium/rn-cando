import { getApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "@/app/init";

import { Image, StyleSheet, Platform, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect, useRouter } from 'expo-router';
import CanDoScrollView from '@/components/CanDoScrollView';
import LoremIpsumGenerator from '@/components/LoremIpsum';
import { useEffect } from "react";

// A.K.A. Task List

const db = getFirestore(app);

export default function TasksScreen() {
  const router = useRouter();

  return (
    <CanDoScrollView>
      <ThemedText>
        <Button title="Add New Thing To the DB" onPress={() => {
          addDoc(collection(db, "Tasks"), {
            category: "yup",
            completed: true,
            date: "sometime",
            description: "yeah",
            frequency: "what",
            groupName: "mhm",
            notification: "yeag",
            points: 10000000000,
            time: "eventually",
            title: "king"
          }).then(() => {
            console.log("the deed is done")
          });
        }}>

        </Button>
        <LoremIpsumGenerator paragraphs={50} />
      </ThemedText>
    </CanDoScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
