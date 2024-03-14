import { useMutation } from "@apollo/client";
import { message } from "antd";
import useGetContacts from "./useGetContacts";
import useDashboardStore from "../../../store/modules/dashboard/index.ts";
import { SUBMIT_CONTACT } from "../../../model/contacts/mutation";
const useSubmitContact = () => {
  const { loadContacts } = useGetContacts();
  const  onChangeLoading  = useDashboardStore((state) => state.onChangeLoading);
  const [submitContact, { loading, error }] = useMutation(SUBMIT_CONTACT);
  
  const submit = async (values) => {
    try {
      onChangeLoading(true);
      await submitContact({
        variables: {
          input: {
            ...values,
          },
        },
      });
      
      loadContacts();
      onChangeLoading(false);
      message.success({
        content: " Contact saved successfully",
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
