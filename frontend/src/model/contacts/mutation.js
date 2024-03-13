import { gql } from "@apollo/client";

export const SUBMIT_CONTACT = gql`
  mutation SubmitContact($input: ContactsInput!) {
    submitContact(contact: $input) {
      name
      address
      daoid
      safeaddress
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: String!) {
    deleteContact(id: $id) {
      name
      address
      daoid
      safeaddress
    }
  }
`;
