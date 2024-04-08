
import { ethers } from "ethers";
import useDashboardStore from "../../store/modules/dashboard/index.ts";
import useSafeStore from "../../store/modules/safe/index.ts";

import { handleBigInt } from "../../utils/logical/bigIntToString.js";
import getChain from "./getChain.js";

function normalizeCurrencies(currencies) {
    return Object.values(currencies).map((currency) => {
    const balance = ethers.formatUnits(
      currency.balance,
      parseInt(currency.decimals)
    );
    // const value = JSON.stringify(currency);
    // const key = JSON.stringify(currency.address, handleBigInt)
    return { balance, name: currency.symbol, address: currency.address };
  });
}

function addSafeNativeCurrency(currencies) {
    const currency = useSafeStore.getState().safeBalance;
    const chainId = useSafeStore.getState().chainId;
    const chain = getChain(chainId);
    return [
        ...normalizeCurrencies(currencies),
      {
          balance: currency,
          name: chain.token,
          address: ethers.ZeroAddress,
          key: JSON.stringify("ETH", handleBigInt),
        },
    ];

}


export const getAvailableCurrencies = () => {
    let currencies = useSafeStore.getState().erc20Balances;
    console.log(currencies)
    currencies = JSON.parse(currencies);
    return addSafeNativeCurrency(currencies);
;
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
