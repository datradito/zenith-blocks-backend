function handleValidation(header) {
  if (!header.Category) {
    return { hasError: true, errorMessage: "Category field cannot be empty" };
  }

  if (!header["Invoice Number"] || header["Invoice Number"].length === 0) {
    return {
      hasError: true,
      errorMessage: "Invoice Number field cannot be empty",
    };
  }

  if (!header.Recipient) {
    return { hasError: true, errorMessage: "Recipient field cannot be empty" };
  }

  if (!header.Total) {
    return { hasError: true, errorMessage: "Total field cannot be empty" };
  }

  if (parseInt(header.Total) > parseInt(1000)) {
    return {
      hasError: true,
      errorMessage: "Total cannot be greater than Allocated amount of Budget",
    };
  }

  if (new Date(header["Invoice Date"]) > new Date(header["Due Date"])) {
    return {
      hasError: true,
      errorMessage: "Invoice Date cannot be greater than Due Date",
    };
  }

  if (!header.Currency) {
    return { hasError: true, errorMessage: "Currency field cannot be empty" };
  }

  return { hasError: false, errorMessage: "" };
};

async function sanitizeInvoiceData(header, Budget, proposal) {
    const owneraddress = await sessionStorage.getItem("address");
    return {
              category: header.Category,
              recipient: header.Recipient,
              owneraddress: owneraddress,
              proposal: proposal.id,
              number: header["Invoice Number"],
              budgetid: Budget.id,
              total: parseInt(header.Total),
              currency: header.Currency,
              date: header["Invoice Date"],
              duedate: header["Due Date"],
              description: header.Description,
              uploadinvoice: "placeholder for now",
            }
};


async function prepareInitialHeaderData(proposal, header) {
    return{
      Proposal: proposal.title,
      Category: header.Category,
      Recipient: header.Recipient,
      "Invoice Number": header["Invoice Number"],
      Currency: header.Currency,
      Total: header.Total,
      "Invoice Date": header["Invoice Date"],
      "Due Date": header["Due Date"],
      "Upload Invoice": header["Upload Invoice"],
      Description: header.Description,
    };
}

export default {
    handleValidation,
  sanitizeInvoiceData,
  prepareInitialHeaderData,
};
