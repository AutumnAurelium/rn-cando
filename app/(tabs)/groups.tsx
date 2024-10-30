import { StyleSheet } from 'react-native';

import CanDoScrollView from '@/components/CanDoScrollView';
import { AddTaskPane } from '@/components/AddTaskPane';
import LoremIpsumGenerator from '@/components/LoremIpsum';

export default function GroupsScreen() {
  return (
    <CanDoScrollView>
      <LoremIpsumGenerator paragraphs={50} />
    </CanDoScrollView>
  );
}

const styles = StyleSheet.create({

});
