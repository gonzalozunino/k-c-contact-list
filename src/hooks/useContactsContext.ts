import { useContext } from "react";
// @Context
import { ContactsContext } from "../AppContext";

export default function useContactsContext() {
  const contactsContext = useContext(ContactsContext);

  if (!contactsContext) {
    throw new Error(
      "useContactsContext must be used within the PostsContext.Provider"
    );
  }
  return contactsContext;
}
