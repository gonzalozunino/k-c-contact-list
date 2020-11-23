import React, { FunctionComponent } from 'react';
// @Types
import { StackNavigationProp } from '@react-navigation/stack';
import { ContactNavigatorParams } from './ContactScreen'
// @Hooks
import useContactsContext from "../hooks/useContactsContext";
import useContactsLoading from "../hooks/useContactsLoading";
// @Components
import {
  View,
  Text,
  ActivityIndicator,
  SectionList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import ContactListItem from "../components/ContactListItem"

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 5,
    paddingLeft: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#f4f4f4",
  },
});

type ContactListNavigationProp = StackNavigationProp<
  ContactNavigatorParams,
  'ContactList'
>;

type Props = {
  navigation: ContactListNavigationProp;
};

const ContactListScreen: FunctionComponent<Props> = ({ navigation }) => {
  const { isLoading, contacts } = useContactsContext();

  useContactsLoading();

  const favorites = contacts.filter(contact => contact.isFavorite);
  const others = contacts.filter(contact => !contact.isFavorite);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
          <SectionList
            sections={[
              { title: "FAVORITE CONTACTS", data: favorites },
              { title: "OTHER CONTACTS", data: others },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('ContactDetail', { item })
                }
              >
                <ContactListItem item={item} />
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text>{section.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
    </View>
  );
};

export default ContactListScreen;