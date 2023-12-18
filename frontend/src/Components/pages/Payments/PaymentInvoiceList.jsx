import React, { useEffect } from 'react';
import { useInvoice } from 'path/to/invoice/hooks'; // Replace 'path/to/invoice/hooks' with the actual path to your invoice hooks

const PaymentInvoiceList = ({ invoiceId }) => {
    const { invoice, fetchInvoice } = useInvoice(); // Replace 'useInvoice' with the actual hook name

    useEffect(() => {
        fetchInvoice(invoiceId);
    }, [fetchInvoice, invoiceId]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Notes</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice && (
                        <tr>
                            <td>{invoice.category}</td>
                            <td>{invoice.notes}</td>
                            <td>{invoice.price}</td>
                            <td>{invoice.quantity}</td>
                            <td>{invoice.total}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentInvoiceList;
