const validateBudget = (
    Id,
    Category,
    Amount,
    Currency,
    Breakdown,
    Proposal,
    ProposalRemainingBudget,
) => {

    const errors = {}

    if (Category.trim() === '') {
        errors.Category = "Category Cant be empty"
    }

    if (Currency.trim() === '') {
        errors.Currency = "Currency Cant be empty"
    }

    //check if amount is less than remainingBudget, if not throw error
    if (Amount.trim() === '') {
        errors.Amount = "Amount Cant be empty"
    } else if (Amount > ProposalRemainingBudget) {
        errors.Amount = "Amount Cant be greater than remaining budget"
    }
    

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

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
