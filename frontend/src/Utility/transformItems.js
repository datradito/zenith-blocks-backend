export default function transformItems(items, totalBudget) {

    items = items.map(item => {
        const { action, breakdown, __typename, ...rest } = item;
        const data = { ...rest, Breakdown: (parseInt(item.amount) / parseInt(totalBudget)) * 100, Remaining: parseInt(totalBudget - parseInt(item.amount))  , Invoices: 'INVOICE' };
        return moveIdToFront(data);
    }
    );
    return items?.length > 0 ? items : null;
}



function reverseObjectKeys(originalObject) {
    const reversedKeys = Object.keys(originalObject).reverse();
    const reversedObject = {};

    for (const key of reversedKeys) {
        reversedObject[key] = originalObject[key];
    }

    return reversedObject;
}


function moveIdToFront(originalObject) {
    const { id, ...rest } = originalObject;
    return { id, ...rest };
}