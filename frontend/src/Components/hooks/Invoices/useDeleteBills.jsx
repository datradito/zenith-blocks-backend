import { useMutation } from "@apollo/client";
import { DELETE_BILLS_MUTATION } from "../../../model/invoices/mutation";
import { useGetBills } from "./useGetBills";
import { message } from "antd";

export const useDeleteBills = () => {
  const { refetchBills } = useGetBills();
  const [deleteBills, { loading }] = useMutation(DELETE_BILLS_MUTATION  , {
    onError: (error) => {
      message.error({
        content: `Error deleting bills: ${error.message}`,
        key: "deleteBillsError",
      });
    },
    onCompleted: () => {
      message.success({
        content: "Bills deleted successfully",
        key: "deleteBillsSuccess",
      });
    },
  });

  const handleDeleteBills = async (billIds) => {
    //if billIds is only one bill, make sure to make it an array, ot
    try {
      await deleteBills({
        variables: { billIds: billIds },
      });
      await refetchBills();
    } catch (error) {
      console.error("Error deleting bills", error);
    }
    return handleDeleteBills;
  };
  return { handleDeleteBills, isDeleting: loading };
};


