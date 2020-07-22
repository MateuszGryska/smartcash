// change id to name
export const getName = (itemId, itemType) => {
  if (itemType.length > 0) {
    const itemName = itemType.find((item) => item.id === itemId);
    return itemName.name;
  }
  return 'Item name cannot be added!';
};
