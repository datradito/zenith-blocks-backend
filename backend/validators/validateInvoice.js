const validateInvoice = (
    Category,
    Recipient,
    InvoiceNumber,
    Currency,
    InvoiceDate,
    DueDate,
    UploadInvoice,
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


    //fix these validations later 

    
    // if (Currency.trim() === '') {
    //     errors.Currency = "Currency Cant be empty"
    // }
    
    // if (InvoiceDate.trim() === '') {
    //     errors.InvoiceDate = "InvoiceDate Cant be empty"
    // } else {
    //     const regEx = /^\d{4}-\d{2}-\d{2}$/;
    //     if (!InvoiceDate.match(regEx)) {
    //         errors.InvoiceDate = "InvoiceDate Not Valid"
    //     }
    // }



    // if (DueDate.trim() === '') {
    //     errors.DueDate = "DueDate Cant be empty"
    // } else if (DueDate < InvoiceDate) {
    //     errors.DueDate = "DueDate Cant be less than InvoiceDate"
    // } else {
    //     const regEx = /^\d{4}-\d{2}-\d{2}$/;
    //     if (!DueDate.match(regEx)) {
    //         errors.DueDate = "DueDate Not Valid"
    //     }
    // }

    if (Description?.trim() === '') {
        errors.Description = "Description Cant be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports = validateInvoice;
