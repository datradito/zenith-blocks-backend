// import { create } from 'ipfs-http-client'

// const projectId = "354ff94af0b7439999ea30a8a1dde432";
// const projectSecret = "413efdfcc91d45a18620b7fb4a93a98a";

// // connect to the default API address http://localhost:5001
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const client = create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth
//     }

// })


// // call Core API methods
// const { cid } = await client.add('Hello world!')
// // let file = "xyz";
// // // Create an instance of the IPFS client
// // const ipfs = await IPFS.create();

// // // Function to upload a file to IPFS
// // export const uploadToIPFS = async (file) => {
// //     // Convert the file to a buffer
// //     const buffer = Buffer.from(await file.arrayBuffer());

// //     // Add the buffer to IPFS and get the resulting hash
// //     const { cid } = await ipfs.add(buffer);

// //     // Return the hash
// //     return cid.toString();
// // }

// // // Function to get a file from IPFS
// // export const getFileFromIPFS = async (hash) => {
// //     // Get the file from IPFS as a buffer
// //     const fileBuffer = await ipfs.cat(hash);

// //     // Convert the buffer to a Blob object
// //     const file = new Blob([fileBuffer], { type: 'application/json' });

// //     // Return the Blob object
// //     return file;
// // }


// // console.log(uploadToIPFS(file));
// // console.log(cid.toString());


// // Save File
// //1 Call get function from smart contract based on file, if its category, users, accounts contract
// //2 decode content of previously saved file, append new content to it, and check for duplicate records.
// //3 save new hash in the contract!
// //4 cahce filename and associated hash and timestamp - name cache savedHash, so that unless data is changed, dont make trip to blockchain!

// // Get file
// //1 have cache named loadedCahce
// //2 Check in loadedCahce if existing hash and timestamp ( within minute ) is same as in savedHash
// //3 call ipfs to retrieve file if new hash, and save new entry to savedHash