
import { ethers } from "ethers";
import useDashboardStore from "../../store/modules/dashboard/index.ts";
import useSafeStore from "../../store/modules/safe/index.ts";

import { handleBigInt } from "../../utils/logical/bigIntToString.js";

function normalizeCurrencies(currencies) {
    return Object.values(currencies).map((currency) => {
    const balance = ethers.formatUnits(
      currency.balance,
      parseInt(currency.decimals)
    );
    const value = JSON.stringify(currency, handleBigInt);
    const key = JSON.stringify(currency.address, handleBigInt)
    return { balance, value: value, key, name: currency.symbol};
  });
}


export const getAvailableCurrencies = () => {
    let currencies = useSafeStore.getState().erc20Balances;
    currencies = JSON.parse(currencies);
    if (!currencies) {
        const currency = useSafeStore.getState().safeBalance;
        return [
            {
                balance: ethers.formatEther(currency),
                name: "ETH",
                value: JSON.stringify({ balance: currency, symbol: "ETH" }, handleBigInt),
                key: JSON.stringify("ETH", handleBigInt),
            },
        ];
    };
    
    return normalizeCurrencies(currencies);
}

export const getAvailableContacts = () => {
    const contacts = useDashboardStore.getState().contacts;
    return contacts.map((contact) => {
        return {
            name: contact.name,
            address: contact.address,
            value: contact
        };
    });
}

export const getAvailableCategories = () => {
    const categories = useDashboardStore.getState().categories;
    return categories;
}   

export const getSafeDataForForms = () => {
    const currencies = getAvailableCurrencies();
    const contacts = getAvailableContacts();
    const categories = getAvailableCategories();
    return { currencies, contacts, categories };
}
