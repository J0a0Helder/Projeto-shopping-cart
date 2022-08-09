const fetchProducts = async (element) => {
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${element}`;
    const response = await fetch(END_POINT);
    const data = await response.json();
    return data;
};

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
