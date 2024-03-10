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
