const itemsContainer = document.getElementsByClassName('cart__items')[0];
const items = document.getElementsByClassName('items')[0];

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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const gettinID = async (event) => {
  const id = getSkuFromProductItem(event.target.parentElement);
  const { id: sku, title: name, price: salePrice } = await fetchItem(id);
  const products = {
    sku,
    name,
    salePrice,
  };

  const elements = createCartItemElement(products);
  itemsContainer.appendChild(elements);
  saveCartItems(itemsContainer.innerHTML);
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  button.addEventListener('click', gettinID);
  section.appendChild(button);
  return section;
};

const productList = async () => {
  const loadText = document.createElement('section');
  loadText.innerText = 'carregando...';
  loadText.className = 'loading';
  items.appendChild(loadText);
  const { results } = await fetchProducts('computador');
  loadText.parentElement.removeChild(loadText);
  results.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const products = {
      sku,
      name,
      image,
    };
    const elements = createProductItemElement(products);
    items.appendChild(elements);  
  });
};

const gettinSavedCart = () => {
  itemsContainer.innerHTML = getSavedCartItems();
  const LiItems = itemsContainer.children;
  for (let index = 0; index < LiItems.length; index += 1) {
    LiItems[index].addEventListener('click', cartItemClickListener);
  }
};

window.onload = () => {
  productList();
  gettinSavedCart();
};
