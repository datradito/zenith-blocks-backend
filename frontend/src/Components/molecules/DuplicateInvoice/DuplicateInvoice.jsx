import Button from "../../ui/Button";
import CreateInvoiceForm from "../../features/invoices/CreateInvoiceForm";
import Modal from "../Modal/Modal"

function DuplicateInvoice() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="invoice-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="invoice-form">
          <CreateInvoiceForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}


export default DuplicateInvoice;