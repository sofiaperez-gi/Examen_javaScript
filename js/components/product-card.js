import { cop } from '../cart.js';

export class ProductCard extends HTMLElement {
  set product(p) {
    const ok = p.active && p.stock > 0;
    this.innerHTML = `
      <div class="card">
        <h4>${p.name}</h4>
        <small>${p.category}</small>
        <p>${p.description}</p>
        <p><strong>${cop(p.price)}</strong> (Stock: ${p.stock})</p>
        <button ${!ok ? 'disabled' : ''}>${!p.active ? 'Inactivo' : ok ? 'Agregar' : 'Agotado'}</button>
      </div>`;
    this.querySelector('button')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add-cart', {
        detail: p,
        bubbles: true,
        composed: true
      }));
    });
  }
}
customElements.define('product-card', ProductCard);