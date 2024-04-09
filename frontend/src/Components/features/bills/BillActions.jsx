import React from "react";
import Modal from "../../molecules/Modal/Modal";
import Menus from "../../molecules/Menus/Menus";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import PaidIcon from "@mui/icons-material/Paid";
function BillActions() {
  const id = 123;
  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={id}>
          <Button variant="contained" startIcon={<ArrowDropDownTwoToneIcon />}>
            Actions
          </Button>
        </Menus.Toggle>

        <Menus.List id={id}>
          <Modal.Open opens="duplicate">
            <Menus.Button
              icon={<HiSquare2Stack />}
              onClick={() => console.log("deleting")}
              //   disabled={"isDuplicating"}
            >
              Duplicate
            </Menus.Button>
          </Modal.Open>

          <Modal.Open opens="uploadBills">
            <Menus.Button icon={<FileUploadIcon />}>Upload Bills</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="batchPay">
            <Menus.Button
              icon={<PaidIcon />}
              onClick={() => console.log("batch payment logic")}
            >
              Batch Pay
            </Menus.Button>
          </Modal.Open>
        </Menus.List>
        <Modal.Window name="duplicate">
          <>Under construction 🚧</>
        </Modal.Window>

        <Modal.Window name="uploadBills">
          <>Upload Modal goes here 🚧</>
        </Modal.Window>
        <Modal.Window name="batchPay">
          <>Under construction 🚧</>
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default BillActions;
