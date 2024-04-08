//Todo: this is a service/resolver class for InvoiceResolver.js, Implement all necessary methods here

import { Invoice } from "../../Database/models/Invoice.js";
import { validateInvoice } from "../../validators/validateInvoice.js";

export class BillResolver {
    async createInvoice(invoiceData) {
        validateInvoice(invoiceData);
        return Invoice.create(invoiceData);
    }
    async getInvoices() {
        return Invoice.findAll();
    }
    async getInvoiceById(id) {
        return Invoice.findByPk(id);
    }
    async updateInvoice(invoiceData) {
        validateInvoice(invoiceData);
        return Invoice.update(invoiceData, {
            where: { id: invoiceData.id },
        });
    }
    async deleteInvoice(id) {
        return Invoice.destroy({ where: { id } });
    }
}