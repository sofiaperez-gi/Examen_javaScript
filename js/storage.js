const KEY = 'cart_data';
export const getCart = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }

};
export const saveCart = (cart) => localStorage.setItem(KEY, JSON.stringify(cart));