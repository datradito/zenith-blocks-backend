import styled from "styled-components";
import CustomPDFViewIcon from "../../atoms/PdfIcon/padfIcon";
import CustomActionIcon from "../../atoms/ActionIcon/CustomActionIcon";
import CustomPaymentViewIcon from "../../atoms/PaymentIcon/paymentIcon";
import StatusChip from "../../atoms/StatusChip/StatusChip";
import CreateInvoiceForm from "../../features/invoices/CreateInvoiceForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../molecules/Modal/Modal";
// import { div } from "@mui/material";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus"
import ConfirmDelete from "../../molecules/ConfirmDelete/ConfirmDelete";
import { useSubmitInvoice } from "../../hooks/Invoices/useSubmitInvoice";
import { useDeleteInvoice } from "../../hooks/Invoices/useDeleteInvoice";


const ScrollContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
`;

function InvoiceRow({ invoice }) {
//   const { isDeleting, deleteInvoice } = useDeleteInvoice();
    
  const { isCreating, createInvoice } = useSubmitInvoice();

    const isDeleting = false;
    const deleteInvoice = () => { console.log("deleteInvoice")};
  const {
    id: InvoiceId,
      Invoice,
      RecipientAddress,
      Recipient,
      Amount,
      Currency,
      Status,
      Date,
      Due,
  } = invoice;

  function handleDuplicate() {
    createInvoice({
      ...invoice,
      number: `${invoice.number} (copy)`,
      date: new Date(),
      due: new Date(),
    });
  }

  return (
    <Table.Row>
      <ScrollContainer>{Invoice}</ScrollContainer>
      <ScrollContainer>{RecipientAddress}</ScrollContainer>
      <ScrollContainer>{Amount}</ScrollContainer>
      <ScrollContainer>{Currency}</ScrollContainer>
        <ScrollContainer><StatusChip /></ScrollContainer>      
        <ScrollContainer>{Date}</ScrollContainer>
      <ScrollContainer>{Due}</ScrollContainer>
      <div>
        <CustomPDFViewIcon budgetId={invoice["id"]} />
      </div>
      <div>
        <CustomPaymentViewIcon invoiceId={invoice["InvoiceId"]} />
      </div>
      <div>
        <CustomActionIcon />
      </div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={InvoiceId} />

            <Menus.List id={InvoiceId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateInvoiceForm cabinToInvoice={invoice} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteInvoice(InvoiceId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default InvoiceRow;
