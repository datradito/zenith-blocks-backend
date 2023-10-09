// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { YOUR_CONTRACT_ABI, YOUR_CONTRACT_ADDRESS } from "./contractConfig"; // import your contract's ABI and address

export const categories = ['Engineering', 'Sales', 'Accounting', 'Miscellaneous'];
export const currencies = ['USD', 'EUR', 'BTC', 'JPY'];
// function CreateCategoryButton() {
//     const [isAllowed, setIsAllowed] = useState(false);
//     const [loading, setLoading] = useState(false);

//     async function checkUserPermissions() {
//         setLoading(true);
//         try {
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const signer = provider.getSigner();
//             const contract = new ethers.Contract(
//                 YOUR_CONTRACT_ADDRESS,
//                 YOUR_CONTRACT_ABI,
//                 signer
//             );

//             const userAddress = await signer.getAddress();
//             const allowedAddresses = await contract.getAllowedAddresses();

//             setIsAllowed(allowedAddresses.includes(userAddress));
//         } catch (error) {
//             console.error(error);
//         }
//         setLoading(false);
//     }

//     useEffect(() => {
//         checkUserPermissions();
//     }, []);

//     async function handleCreateCategory() {
//         // Check if the user is allowed to create a category
//         if (isAllowed) {
//             // Handle category creation logic here
//             // ...
//         } else {
//             alert("You are not allowed to create a category.");
//         }
//     }

//     return (
//         <button onClick={handleCreateCategory} disabled={loading || !isAllowed}>
//             Create Category
//         </button>
//     );
// }
