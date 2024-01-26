export const formatPrice = (price: number): string => {
  const priceStr = price.toString();
  let formattedPrice = '';
  let count = 0;

  for (let i = priceStr.length - 1; i >= 0; i--) {
    count++;
    formattedPrice = priceStr[i] + formattedPrice;
    if (count % 3 === 0 && i !== 0) {
      formattedPrice = ` ${formattedPrice}`;
    }
  }

  return formattedPrice;
};

export const decapitalizeFirstCharacter = (str: string): string => {
  return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
};
