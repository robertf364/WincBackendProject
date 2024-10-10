export const convertPropertyPricePerNight = (property) => {
  let propertyCopy = { ...property };
  if (propertyCopy.pricePerNight !== undefined) {
    propertyCopy.pricePerNight = parseFloat(propertyCopy.pricePerNight);
  }
  return propertyCopy;
};

export const convertMultiplePropertyPricePerNight = (properties) => {
  return properties.map((p) => convertPropertyPricePerNight(p));
};
