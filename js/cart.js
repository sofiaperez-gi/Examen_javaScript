export const calcTotals = (cart) => {
    const sub = cart.reduce((acc, i) => acc + i.price *i.qty, 0);
    const desc = sub >= 300000 ? sub * 0.10 : 0;
    return { sub, desc, total: sub - desc, units: cart.reduce((acc, i) => acc + i.qty, 0) };
};
export const cop = (n) => '$' + Number(n).toLocaleString('es-CO')