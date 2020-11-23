import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// @Context
import { ContactsContext } from "./src/AppContext"
// @Hooks
import useContactsContextValue from "./src/hooks/useContactsContextValue"
// @screens
import ContactScreen from './src/screens/ContactScreen';

export default function App() {
  const contactsContextValue = useContactsContextValue();

  return (
    <ContactsContext.Provider value={contactsContextValue}>
      <NavigationContainer>
        <ContactScreen />
      </NavigationContainer>
    </ContactsContext.Provider>
  );
}
