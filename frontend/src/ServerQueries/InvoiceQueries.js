import { gql } from "@apollo/client";

// export const addAuthorMutation = gql`
//     mutation($name: String!, $age: Int!){
//         submitInvoice(name: $name, age: $age){
//             name
//             age
//         }
//     }  
// `

export const SUBMIT_INVOICE_MUTATION = gql`
  mutation (
    $Category: String!
    $Recipient: String!
    $InvoiceNumber: String!
    $Currency: Float!
    $InvoiceDate: String!
    $DueDate: String!
    $UploadInvoice: String!
    $Description: String!
  ) {
    submitInvoice(
      Category: $Category
      Recipient: $Recipient
      InvoiceNumber: $InvoiceNumber
      Currency: $Currency
      InvoiceDate: $InvoiceDate
      DueDate: $DueDate
      UploadInvoice: $UploadInvoice
      Description: $Description
    ){
      Category
      Recipient
      InvoiceNumber
      Currency
      InvoiceDate
      DueDate
      UploadInvoice
      Description
    }
  }
`;