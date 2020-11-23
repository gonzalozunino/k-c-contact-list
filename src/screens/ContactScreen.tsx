import React, { FunctionComponent } from 'react';
import { IContact } from "../AppContext";
import { createStackNavigator } from '@react-navigation/stack';
// @screens
import ContactListScreen from './ContactListScreen';
import ContactDetailScreen from './ContactDetailScreen';

export type ContactNavigatorParams = {
  ContactList: undefined;
  ContactDetail: { item: IContact };
};

const ContactStack = createStackNavigator<ContactNavigatorParams>();

const ContactScreen: FunctionComponent = () => (
  <ContactStack.Navigator
    initialRouteName='ContactList'
  >
    <ContactStack.Screen name='ContactList'
      component={ContactListScreen}
      options={{
        headerTitleStyle: { alignSelf: 'center' },
        title: 'Contacts',
      }}
    />
    <ContactStack.Screen
      name='ContactDetail'
      component={ContactDetailScreen}
      options={{
        title: '',
      }}
    />
  </ContactStack.Navigator>
);

export default ContactScreen;