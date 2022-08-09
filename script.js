const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  // eslint-disable-next-line no-use-before-define
  button.addEventListener('click', gettinID);
  section.appendChild(button);
  return section;
};

const productList = async () => {
  const itemsContainer = document.getElementsByClassName('items')[0];

  const { results } = await fetchProducts('computador');
  results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const products = {
      sku,
      name,
      image,
    };
    const elements = createProductItemElement(products);
    itemsContainer.appendChild(elements);  
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const gettinID = async (event) => {
  const itemsContainer = document.getElementsByClassName('cart__items')[0];

  const id = getSkuFromProductItem(event.target.parentElement);
  const { id: sku, title: name, price: salePrice } = await fetchItem(id);
  const products = {
    sku,
    name,
    salePrice,
  };

  const elements = createCartItemElement(products);
  itemsContainer.appendChild(elements);
};

window.onload = productList;
