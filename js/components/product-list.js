import './product-card.js';

export class ProductList extends HTMLElement {
  set products(list) {
    this.innerHTML = '<div class="grid"></div>';
    const grid = this.querySelector('.grid');
    list.forEach(p => {
      const card = document.createElement('product-card');
      card.product = p;
      grid.appendChild(card);
    });
  }
}

if (!customElements.get('product-list')) {
  customElements.define('product-list', ProductList);
}
