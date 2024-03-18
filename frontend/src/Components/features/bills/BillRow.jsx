import styled from "styled-components";
import CustomPDFViewIcon from "../../atoms/PdfIcon/padfIcon";
import CustomPaymentViewIcon from "../../atoms/PaymentIcon/paymentIcon";
import StatusChip from "../../atoms/StatusChip/StatusChip";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../molecules/Modal/Modal";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import ConfirmDelete from "../../molecules/ConfirmDelete/ConfirmDelete";
import { useDuplicateInvoice } from "../../hooks/Invoices/useDuplicateInvoice";
import { useDeleteBills } from "../../hooks/Invoices/useDeleteBills";
import { Avatar } from "@mui/material";
import GetEnsName from "../../molecules/GetEnsName/GetEnsName";
import BillDetails from "../../../pages/Bills/BillDetails";
import useSafeTransaction from "../../hooks/Safe/useSafeTransaction";
const ScrollContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function BillRow({ invoice }) {
  const { isDuplicating, duplicateInvoice } = useDuplicateInvoice();
  const { isDeleting, handleDeleteBills } = useDeleteBills();

  const {
    id: InvoiceId,
    Invoice,
    RecipientAddress,
    Amount,
    Currency,
    Date,
    Due,
    Status,
    transactionHash,
  } = invoice;

  function handleDuplicate() {
    duplicateInvoice(invoice.InvoiceId);
  }

  return (
    <Table.Row>
      <ScrollContainer>{Invoice}</ScrollContainer>
      <ScrollContainer>
        {" "}
        <Avatar></Avatar>
        <GetEnsName address={RecipientAddress} />
      </ScrollContainer>
      <ScrollContainer>{Amount}</ScrollContainer>
      <ScrollContainer>{Currency}</ScrollContainer>
      <ScrollContainer>
        <StatusChip status={Status} />
      </ScrollContainer>
      <ScrollContainer>{Date}</ScrollContainer>
      <ScrollContainer>{Due}</ScrollContainer>
      <Modal>
        <Modal.Open opens="details">
          <CustomPDFViewIcon label="Details" />
        </Modal.Open>
        <Modal.Window name="details">
          <BillDetails txHash={transactionHash} />
        </Modal.Window>
      </Modal>
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
            ></Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}></Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="invoices"
              disabled={isDeleting}
              onConfirm={() => handleDeleteBills(invoice.InvoiceId)}
              context="Only bills without payments can be deleted. If bill has been signed by any user. Please reject transaction from details and try deleting again!"
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BillRow;
