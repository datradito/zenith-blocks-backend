const aesKey = 'your_aes_key'; // Replace with your own AES encryption key

export const encryptToBytes32 = (value) => {
    const encryptedValue = aesEncrypt(value, aesKey);
    return encryptedValue;
};

export const decryptFromBytes32 = (encryptedBytes32) => {
    const encryptedValue = encryptedBytes32;
    return aesDecrypt(encryptedValue, aesKey);
};



