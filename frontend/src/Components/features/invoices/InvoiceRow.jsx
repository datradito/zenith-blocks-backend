import styled from "styled-components";
import CustomPDFViewIcon from "../../atoms/PdfIcon/padfIcon";
import CustomPaymentViewIcon from "../../atoms/PaymentIcon/paymentIcon";
import StatusChip from "../../atoms/StatusChip/StatusChip";
import CreateInvoiceForm from "../../features/invoices/CreateInvoiceForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../molecules/Modal/Modal";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus"
import ConfirmDelete from "../../molecules/ConfirmDelete/ConfirmDelete";
import { useSubmitInvoice } from "../../hooks/Invoices/useSubmitInvoice";
import { useDuplicateInvoice } from "../../hooks/Invoices/useDuplicateInvoice";
import { Avatar } from "@mui/material";


const ScrollContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function InvoiceRow({ invoice }) {
//   const { isDeleting, deleteInvoice } = useDeleteInvoice();
    
  const { isCreating, createInvoice } = useSubmitInvoice();
  const { isDuplicating, duplicateInvoice } = useDuplicateInvoice();

    const isDeleting = false;
    const deleteInvoice = () => { console.log("deleteInvoice")};
  const {
    id: InvoiceId,
      Invoice,
      RecipientAddress,
      Amount,
      Currency,
      Date,
      Due,
  } = invoice;

  function handleDuplicate() {
    duplicateInvoice(invoice.InvoiceId);
  }


  return (
    <Table.Row>
      <ScrollContainer>{Invoice}</ScrollContainer>
      <ScrollContainer> <Avatar></Avatar>{RecipientAddress}</ScrollContainer>
      <ScrollContainer>{Amount}</ScrollContainer>
      <ScrollContainer>{Currency}</ScrollContainer>
        <ScrollContainer><StatusChip /></ScrollContainer>      
        <ScrollContainer>{Date}</ScrollContainer>
      <ScrollContainer>{Due}</ScrollContainer>
      <ScrollContainer>
        <CustomPDFViewIcon invoiceId={invoice["id"]} />
      </ScrollContainer>
      <ScrollContainer>
        <CustomPaymentViewIcon invoiceId={invoice["InvoiceId"]} />
      </ScrollContainer>
   
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={InvoiceId} />

            <Menus.List id={InvoiceId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isDuplicating}
              >
                
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}></Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}></Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateInvoiceForm invoice={invoice} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="invoices"
                disabled={isDeleting}
                onConfirm={() => deleteInvoice(InvoiceId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>

    </Table.Row>
  );
}

export default InvoiceRow;
