import { createContext } from "react";

interface IPhone {
    work: string,
    home: string,
    mobile: string,
}

interface IAddress {
    street: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
}

export interface IContact {
    name: string,
    id: string,
    companyName: string,
    isFavorite: boolean,
    smallImageURL: string,
    largeImageURL: string,
    emailAddress: string,
    birthdate: string,
    phone: IPhone,
    address: IAddress
}

export interface ContactsContextData {
    contacts: IContact[];
    isLoading: boolean;
    fetchContacts: () => void;
    toggleFavorite?: (id: string) => void;
}

export const contactsContextDefaultValue: ContactsContextData = {
    contacts: [],
    isLoading: false,
    fetchContacts: () => { },
}

export const ContactsContext = createContext<ContactsContextData | undefined>(undefined);