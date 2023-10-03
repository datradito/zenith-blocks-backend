export const sanitizeCsvData = (data, type) => {
    if (type.toLowerCase() === "invoice") {
        //modify this csv data to match the invoice schema
        const csvData = data.map((invoice) => {
            const {
                id,
                uploadinvoice,
                rootpath,
                Payment,
                View,
                Action,
                Recipient,
                __typename,
                ...rest
            } = invoice;
            return rest;
        }
        );
        return csvData;
    }

    if (type.toLowerCase() === "budget") {
        //modify this csv data to match the budget schema
        const csvData = data.map((budget) => {
            const {
                id,
                Breakdown,
                Invoices,
                __typename,
                ...rest
            } = budget;

            return { ...rest, invoiced: budget.remaining };
            
        }
        );
        return csvData;
    }

    if (type.toLowerCase() === "payment") {
        //modify this csv data to match the payment schema
        const csvData = data.map((payment) => {
            const {
                __typename,
                ...rest
            } = payment;
            return rest;
        }
        );
        return csvData;
    }
}