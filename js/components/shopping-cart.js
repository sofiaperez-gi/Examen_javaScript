import { cop } from '../cart.js';

export class ShoppingCart extends HTMLElement {
  render(cart, { sub, desc, total }) {
    if (!cart.length) return this.innerHTML = '<p>Carrito vacío.</p>';
    this.innerHTML = `
      <h3>Carrito</h3>
      ${cart.map(i => `
        <div style="margin: 8px 0;">
          <span>${i.name} (${i.qty}) - ${cop(i.price * i.qty)}</span>
          <button data-id="${i.id}" data-op="-">-</button>
          <button data-id="${i.id}" data-op="+">+</button>
          <button data-id="${i.id}" data-op="x">x</button>
        </div>
      `).join('')}
      <hr>
      <p>Subtotal: ${cop(sub)}</p>
      <p>Descuento: -${cop(desc)}</p>
      <h4>Total: ${cop(total)}</h4>
      <button id="btn-buy" style="margin-top:8px;">Confirmar</button>
      <button id="btn-empty">Vaciar</button>
    `;
    this.querySelectorAll('button[data-op]').forEach(b => {
      b.onclick = () => this.dispatchEvent(new CustomEvent('mod-cart', {
        detail: { id: +b.dataset.id, op: b.dataset.op }, bubbles: true, composed: true
      }));
    });
    this.querySelector('#btn-empty').onclick = () => this.dispatchEvent(new CustomEvent('clear-cart', { bubbles: true, composed: true }));
    this.querySelector('#btn-buy').onclick = () => this.dispatchEvent(new CustomEvent('buy-cart', { bubbles: true, composed: true }));
  }
}
customElements.define('shopping-cart', ShoppingCart);