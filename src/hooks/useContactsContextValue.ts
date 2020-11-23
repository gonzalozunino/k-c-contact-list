import { useCallback, useState, useMemo } from "react";
import { ContactsContextData, IContact } from "../AppContext";

export default function useContactsContextValue(): ContactsContextData {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);

    const response = await fetch('https://s3.amazonaws.com/technical-challenge/v3/contacts.json');
    const fetchedContacts = await response.json();
    
    setContacts(fetchedContacts);
    setIsLoading(false);
  }, [setContacts]);

  const toggleFavorite = (id: string) => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          isFavorite: !contact.isFavorite,
        };
      }
      return contact;
    });
    setContacts(updatedContacts);
  }

  return useMemo(
    () => ({
      contacts,
      isLoading,
      fetchContacts,
      toggleFavorite
    }),
    [contacts, isLoading, fetchContacts, toggleFavorite]
  );
}
