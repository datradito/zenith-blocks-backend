import styled from "styled-components";
import CustomPDFViewIcon from "../../atoms/PdfIcon/padfIcon";
import CustomActionIcon from "../../atoms/ActionIcon/CustomActionIcon";
import BillActionButton from "./BillActionButton";
import StatusChip from "../../atoms/StatusChip/StatusChip";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import LoopIcon from "@mui/icons-material/Loop";
import Modal from "../../molecules/Modal/Modal";
import Table from "../../molecules/Table/Table";
import Menus from "../../molecules/Menus/Menus";
import ConfirmDelete from "../../molecules/ConfirmDelete/ConfirmDelete";
import { useDuplicateInvoice } from "../../hooks/Invoices/useDuplicateInvoice";
import { useDeleteBills } from "../../hooks/Invoices/useDeleteBills";
import { Avatar, Checkbox } from "@mui/material";
import GetEnsName from "../../molecules/GetEnsName/GetEnsName";
import BillDetail from "../../../pages/Bills/BillDetail";
import BillRecurr from "./BillRecurr";
const ScrollContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function BillRow({ invoice, checked, onChange }) {
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
      <Checkbox
        onChange={() => onChange(invoice.InvoiceId)}
        checked={checked}
      />
      <span>{Invoice}</span>
      <ScrollContainer>
        {" "}
        <Avatar></Avatar>
        <GetEnsName address={RecipientAddress} />
      </ScrollContainer>
      <span>{Amount}</span>
      <span>{Currency}</span>

      <StatusChip status={Status} />

      <span>{Date}</span>
      <span>{Due}</span>
      <Modal>
        <Modal.Open opens="details">
          <CustomPDFViewIcon label="Details" />
        </Modal.Open>
        <Modal.Window name="details">
          <BillDetail bill={invoice} />
        </Modal.Window>
      </Modal>
      <BillActionButton invoice={invoice} />

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={InvoiceId}>
            <CustomActionIcon />
          </Menus.Toggle>

          <Menus.List id={InvoiceId}>
            <Modal.Open opens="duplicate">
              <Menus.Button
                icon={<LoopIcon />}
                // onClick={handleDuplicate}
                disabled={isDuplicating}
              >
                Recurring
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="duplicate">
            <BillRecurr invoice={invoice} />
          </Modal.Window>

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
