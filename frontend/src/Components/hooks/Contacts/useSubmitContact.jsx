import { useMutation } from "@apollo/client";
import { message } from "antd";
import useGetContacts from "./useGetContacts";

import { SUBMIT_CONTACT } from "../../../model/contacts/mutation";
const useSubmitContact = () => {
  const { refetchContacts } = useGetContacts();

  const [submitContact, { loading, error }] = useMutation(SUBMIT_CONTACT, {
    onCompleted: () => {
      refetchContacts();
    },
  });

  const submit = async (values) => {
    try {
      await submitContact({
        variables: {
          input: {
            ...values,
          },
        },
      });

      message.success({
        content: "✅ Contact saved successfully",
        key: "submitContactSuccess",
      });
    } catch (error) {
      message.error({
        content: `❌ ${error.message}`,
        key: "submitContactError",
      });
    }
  };

  return { submit, loading, error };
};

export default useSubmitContact;
