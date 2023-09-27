const validateInvoice = (
    Category,
    Recipient,
    InvoiceNumber,
    Description,
) => {

    const errors = {}

    if (Category && Category.trim() === '') {
        errors.Category = "Category Cant be empty"
    }
    if (Recipient && Recipient.trim() === '') {
        errors.Recipient = "Recipient Cant be empty"
    } else {
        const ethereumAddressRegex = /^(0x)?[0-9a-f]{40}$/i;
        if (!Recipient.match(ethereumAddressRegex)) {
            errors.Recipient = "Recipient Not Valid"
        }
    }

    if (InvoiceNumber && InvoiceNumber.trim() === '') {
        errors.InvoiceNumber = "Invoice Number Cant be empty"
    }

    if (Description?.trim() === '') {
        errors.Description = "Description Cant be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports = validateInvoice;
