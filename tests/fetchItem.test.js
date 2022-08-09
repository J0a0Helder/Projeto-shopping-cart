require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se a função fetch foi chamada.', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a função fetch foi chamada com o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Verifica se o retorno da função fetchItem é uma estrutura de dados', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('Verifica se retorna um erro se a função fetchItem for chamada sem argumentos', async () => {
    const failRequest = fetchItem();
    expect(failRequest).rejects.toThrow( new Error('You must provide an url'));
  });
});
