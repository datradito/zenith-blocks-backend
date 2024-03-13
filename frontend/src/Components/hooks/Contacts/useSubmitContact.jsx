import { useMutation } from "@apollo/client";
import { message } from "antd";

import { SUBMIT_CONTACT } from "../../../model/contacts/mutation";
const useSubmitContact = () => {

  const [submitContact, { loading, error }] = useMutation(SUBMIT_CONTACT, {
    onCompleted: (data) => {},
    refetchQueries: [
      {
        query: "getContacts",
      },
    ],
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
        content: "Contact submitted successfully",
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
