import React from "react";
import SubHeader from "../../molecules/SubHeader/SubHeader";
import Breadcrumbs from "../../atoms/BreadCrumbs/BreadCrumbs";
import Label from "../../atoms/Label/Label";
import GoBack from "../../atoms/GoBack/GoBack";

function InvoiceSubHeader({ methods, transaction, handleSaveInvoice }) {

  return (
    <SubHeader.Container>
      <SubHeader.List>
        <Label>
          <Breadcrumbs id={transaction.id} />
        </Label>
        <GoBack>
          <Label>Invoices</Label>
        </GoBack>
      </SubHeader.List>
      <SubHeader.List styles={{ flexDirection: "row", gap: "1rem" }}>
        <SubHeader.ActionButton
          label="Reset Invoice"
          onClick={() => methods.reset()}
          sx={{
            backgroundColor: "#FC4F4F",
          }}
        />
        <SubHeader.ActionButton
          onClick={methods.handleSubmit(handleSaveInvoice)}
          label="Save Invoice"
        />
      </SubHeader.List>
    </SubHeader.Container>
  );
}

export default InvoiceSubHeader;
