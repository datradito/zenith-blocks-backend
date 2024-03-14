import { useMutation } from "@apollo/client";

import { DELETE_CONTACT } from "../../../model/contacts/mutation";
import { message } from "antd";

import useGetContacts from "./useGetContacts";

const useDeleteContact = () => {
  //const { setContacts } = useDashboardStore((state) => state);
  const { loadContacts } = useGetContacts();
    const [deleteContact, { loading: removing }] = useMutation(DELETE_CONTACT, {
      onCompleted: () => {
        message.success({
          content: " Contact deleted successfully",
          key: "deleteContactSuccess",
        });
      },
    });

  const remove = async (id) => {
    try {
      await deleteContact({
        variables: {
          id,
        },
      });
      // setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
      loadContacts();
    } catch (error) {
      message.error({
        content: `❌ ${error.message}`,
        key: "deleteContactError",
      });
    }
  };

  return { remove, removing };
};


export default useDeleteContact;