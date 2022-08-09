require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se a função fetch foi chamada.', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a função fetch foi chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verifica se o retorno da função fetchProducts é uma estrutura de dados', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('Verifica se retorna um erro se a função fetchProducts for chamada sem argumentos', async () => {
    const result = await fetchProducts();
    expect(result).toEqual( new Error('You must provide an url'));
  });
});
