import { useEffect } from "react";
// @Hooks
import useContactsContext from "./useContactsContext"

export default function useContactsLoading() {
  const { fetchContacts } = useContactsContext();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);
}
