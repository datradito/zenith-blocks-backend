import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../molecules/Modal/Modal";
import CustomizedProgressBars from "../../atoms/ProgressBar/ProgressBar";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import CreateBudgetForm from "../../features/budgets/CreateBudgetForm";
import ConfirmDelete from "../../molecules/ConfirmDelete/ConfirmDelete";
import { useSubmitBudget } from "../../hooks/Budgets/useSubmitBudget";
import CustomInvoiceViewIcon from "../../atoms/InvoiceIcon/InvoiceIcon";
// import { useDeleteBudget } from "../../hooks/Budgets/useDeleteBudget";

const ScrollContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
`;

function BudgetRow({ budget }) {
  //   const { isDeleting, deleteBudget } = useDeleteBudget();
console.log("budget", budget);
  const { isCreating, createBudget } = useSubmitBudget();

  const isDeleting = false;
  const deleteBudget = () => {
    console.log("deleteBudget");
  };
  const {
    id,
    category,
      amount,
      currency,
    remaining,
Breakdown,
  } = budget;

  function handleDuplicate() {
      createBudget(
        
    );
  }

  return (
    <Table.Row>
      <ScrollContainer>{category}</ScrollContainer>
      <ScrollContainer>{amount}</ScrollContainer>
      <ScrollContainer>{currency}</ScrollContainer>
      <ScrollContainer>
        <CustomizedProgressBars value={Breakdown} />
      </ScrollContainer>
      <ScrollContainer>{remaining}</ScrollContainer>
      <ScrollContainer>
        <CustomInvoiceViewIcon budgetId={id} />
      </ScrollContainer>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button
              icon={<HiSquare2Stack />}
              onClick={handleDuplicate}
              disabled={isCreating}
            ></Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}></Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}></Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateBudgetForm budgetToEdit={budget} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="invoices"
              disabled={isDeleting}
              onConfirm={() => deleteBudget(id)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BudgetRow;
