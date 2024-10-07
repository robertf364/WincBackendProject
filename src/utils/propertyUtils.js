export const convertPropertyPricePerNight = (property) => {
  let propertyCopy = { ...property };
  propertyCopy.pricePerNight = propertyCopy.pricePerNight.toNumber();
  return propertyCopy;
};

export const convertMultiplePropertyPricePerNight = (properties) => {
  return properties.map((p) => convertPropertyPricePerNight(p));
};
