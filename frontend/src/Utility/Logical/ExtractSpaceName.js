export const extractAndCapitalize = (str) => {
    let index = str.indexOf('-');
    if (index === -1) {
        index = str.indexOf('.');
    }
    const prefix = str.substring(0, index);
    const capitalizedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    return capitalizedPrefix;
}