import { getProducts } from './api.js';
import { getCart, saveCart } from './storage.js';
import { calcTotals, cop } from './cart.js';
import './components/product-list.js';
import './components/shopping-cart.js';

let catalog = [], cart = [];
const pList = document.querySelector('product-list');
const sCart = document.querySelector('shopping-cart');
const uSpan = document.getElementById('cart-units');
const msg = document.getElementById('msg');

async function init() {
  try {
    catalog = await getProducts();
    cart = getCart().map(item => {
      const live = catalog.find(product => product.id === item.id);
      return live && live.active && live.stock > 0
        ? { ...live, qty: Math.min(item.qty, live.stock) }
        : null;
    }).filter(Boolean);
    render();
  } catch (error) {
    msg.textContent = error instanceof Error
      ? `Error al consultar el catálogo: ${error.message}`
      : 'Error al consultar el catálogo.';
    msg.className = 'msg show';
  }
}

function filter() {
  const q = document.getElementById('search').value.toLowerCase();
  const c = document.getElementById('category').value;
  const s = document.getElementById('sort').value;
  const stk = document.getElementById('only-stock').checked;

  let res = catalog.filter(p =>
    (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
    (c === 'todas' || p.category === c) &&
    (!stk || (p.active && p.stock > 0))
  );

  if (s === 'asc') res.sort((a,b) => a.price - b.price);
  if (s === 'desc') res.sort((a,b) => b.price - a.price);
  pList.products = res;
}

function render() {
  saveCart(cart);
  const t = calcTotals(cart);
  sCart.render(cart, t);
  uSpan.textContent = t.units;
  filter();
}

document.addEventListener('add-cart', (e) => {
  const p = catalog.find(x => x.id === e.detail.id);
  if (!p || !p.active || p.stock < 1) return;
  const it = cart.find(x => x.id === p.id);
  const q = it ? it.qty : 0;
  if (q + 1 > p.stock) return alert('Supera inventario.');
  it ? it.qty++ : cart.push({ ...p, qty: 1 });
  render();
});

document.addEventListener('mod-cart', (e) => {
  const { id, op } = e.detail;
  const it = cart.find(x => x.id === id);
  const live = catalog.find(x => x.id === id);
  if (!it || !live) return;
  if (op === '+') (it.qty + 1 <= live.stock) ? it.qty++ : alert('Límite de stock.');
  if (op === '-') it.qty > 1 ? it.qty-- : (cart = cart.filter(x => x.id !== id));
  if (op === 'x') cart = cart.filter(x => x.id !== id);
  render();
});

document.addEventListener('clear-cart', () => { cart = []; render(); });

document.addEventListener('buy-cart', () => {
  if (!cart.length) return alert('Carrito vacío.');
  const id = 'ORD-' + Math.floor(Math.random() * 9000);
  alert(`Confirmado ID: ${id} | Total: ${cop(calcTotals(cart).total)}`);
  cart = [];
  render();
});

['search', 'category', 'sort', 'only-stock'].forEach(id => {
  document.getElementById(id).addEventListener('input', filter);
});

document.getElementById('btn-reset').onclick = () => {
  document.getElementById('search').value = '';
  document.getElementById('category').value = 'todas';
  document.getElementById('sort').value = '';
  document.getElementById('only-stock').checked = false;
  filter();
};

init();