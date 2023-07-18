import CryptoJS from 'crypto-js';


const encryptionKeyInput = process.env.ENCRYPTION_KEY_CRYPTO;
const envIV = process.env.IV_CRYPTO;
export const encryptionKey = CryptoJS.enc.Hex.parse('0405060708090a0b0c0d0e0f00010203'); // Placeholder deterministic key (32 bytes)
export const iv = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f'); 

export const aesEncryptToBytes32 = (value, encryptionKey, iv) => {
    const encrypted = CryptoJS.AES.encrypt(value, encryptionKey, { iv, mode: CryptoJS.mode.CTR });

    const ciphertextBytes = CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString());
    let bytes32Value;

    if (ciphertextBytes instanceof Uint8Array) {
        const bytes = Array.from(ciphertextBytes).map((byte) => {
            const hex = byte.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        });
        bytes32Value = `0x${bytes.join('').substring(0, 64)}`;
    } else {
        console.log('ciphertextBytes is not a Uint8Array:', ciphertextBytes)
        bytes32Value = ciphertextBytes.slice(0, 32);
    }

    return bytes32Value;
};


export const aesDecryptFromBytes32 = (encryptedBytes32, encryptionKey, iv) => {
    const ciphertextHex = encryptedBytes32.slice(2); // Remove the '0x' prefix
    const ciphertextBytes = CryptoJS.enc.Hex.parse(ciphertextHex);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertextBytes },
        encryptionKey,
        { iv, mode: CryptoJS.mode.CTR }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
};

// Example usage
// const plaintext = 'https://ipfs.moralis.io:2053/ipfs/QmVJZQE9Pr1cncADELH2kqkCshxhxBELACCDxDqX83Qu2D/0xce9b0991276c79cccc773a327814fa07942a3287e022fc9e75378bdcd491b337fa559ab2-6252-4d21-b0ee-d89616aa21df';

// const encryptedBytes32 = aesEncryptToBytes32(plaintext, encryptionKey, iv);
// console.log('Encrypted Bytes32:', encryptedBytes32);
