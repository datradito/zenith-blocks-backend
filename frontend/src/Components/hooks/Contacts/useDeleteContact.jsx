import { useMutation } from "@apollo/client";

import { DELETE_CONTACT } from "../../../model/contacts/mutation";
import { message } from "antd";

const useDeleteContact = () => {
    const [deleteContact, { loading: removing }] = useMutation(DELETE_CONTACT, {
    onCompleted: () => {
      message.success({
        content: "✅ Contact deleted successfully",
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