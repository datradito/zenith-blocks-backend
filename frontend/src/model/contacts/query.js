import { gql } from "@apollo/client";


export const GET_ALL_CONTACTS = gql`
    query GetAllContacts ($filter: ContactsFilterInput) {
        getContacts(filter: $filter) {
        id
        name
        address
        daoid
        safeaddress
        }
    }
    `;
