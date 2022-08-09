const fetchItem = async (sku) => {
  const END_POINT = `https://api.mercadolibre.com/items/${sku}`;
  const response = await fetch(END_POINT);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
