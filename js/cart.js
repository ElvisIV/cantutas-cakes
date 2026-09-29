const CART_KEY = 'cantutas-cart-v1';
let cart = [];
let cartReturnFocus;
let cartBackground = [];
let cartPreviousOverflow = '';

function cartDetails(item) {
  const product = ALL_PRODUCTS.find(p => p.id === item.id);
  if (!product) return null;
  const variant = product.variants ? product.variants[item.variant] : null;
  if (product.variants && !variant) return null;
  return { product, variant, price: variant ? variant.price : product.price };
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (_) { /* Usable without storage. */ }
  renderCart();
}

function addToCart(product, variant) {
  variant = product.variants ? variant : null;
  const existing = cart.find(i => i.id === product.id && i.variant === variant);
  if (existing) existing.quantity = Math.min(999, existing.quantity + 1);
  else cart.push({ id: product.id, variant, quantity: 1 });
  saveCart();
  openCart();
}

function renderCart() {
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  for (const id of ['cart-badge', 'cart-badge-mobile']) {
    const badge = document.getElementById(id);
    badge.textContent = count;
    badge.hidden = !count;
  }
  document.getElementById('cart-drawer-count').textContent = `(${count})`;
  document.getElementById('cart-footer').hidden = !count;
  document.getElementById('cart-total-amount').textContent = formatPriceBs(cart.reduce((sum, i) => sum + cartDetails(i).price * i.quantity, 0));
  document.getElementById('cart-advance-note').hidden = !cart.some(i => cartDetails(i).product.requiresAdvanceOrder);
  document.getElementById('cart-body').innerHTML = cart.length ? cart.map((item, index) => {
    const { product, variant, price } = cartDetails(item);
    return `<article class="cart-item">
      <img src="${product.image}" alt="" width="64" height="64">
      <div class="cart-item__info"><h3>${product.name}</h3>
      <p>${variant ? variant.label + ' · ' : ''}${formatPriceBs(price)} c/u</p>
      <div class="cart-item__controls">
        <button data-index="${index}" data-action="minus" aria-label="Reducir cantidad de ${product.name}">−</button>
        <span aria-label="Cantidad">${item.quantity}</span>
        <button data-index="${index}" data-action="plus" aria-label="Aumentar cantidad de ${product.name}" ${item.quantity >= 999 ? 'disabled' : ''}>+</button>
        <button data-index="${index}" data-action="remove" class="cart-item__remove" aria-label="Eliminar ${product.name}">Eliminar</button>
      </div><strong>${formatPriceBs(price * item.quantity)}</strong></div></article>`;
  }).join('') : '<div class="cart-empty"><span aria-hidden="true"><svg class="order-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h3l3 12h11l3-9H6"/><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/></svg></span><h3>Tu carrito está vacío</h3><p>Elige algo delicioso de nuestro catálogo.</p><button class="btn btn--brand" data-action="browse">Ver productos</button></div>';
}

function openCart() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer.hidden) return;
  cartReturnFocus = document.activeElement;
  if (cartReturnFocus.closest('[hidden]')) cartReturnFocus = document.getElementById(window.innerWidth <= 768 ? 'cart-open-btn-mobile' : 'cart-open-btn');
  cartPreviousOverflow = document.body.style.overflow;
  cartBackground = [...document.body.children].filter(el => el !== drawer && el.tagName !== 'SCRIPT').map(el => [el, el.inert]);
  cartBackground.forEach(([el]) => { el.inert = true; });
  drawer.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('cart-close').focus();
}

function closeCart() {
  document.getElementById('cart-drawer').hidden = true;
  cartBackground.forEach(([el, inert]) => { el.inert = inert; });
  document.body.style.overflow = cartPreviousOverflow;
  cartReturnFocus?.focus();
}

function cartMessage() {
  const lines = cart.map(item => {
    const { product, variant, price } = cartDetails(item);
    return `${item.quantity} x ${product.name}${variant ? ' (' + variant.label + ')' : ''} - ${formatPriceBs(price * item.quantity)}`;
  });
  const total = cart.reduce((sum, i) => sum + cartDetails(i).price * i.quantity, 0);
  return `Hola, Cantutas Cakes\nQuisiera realizar este pedido:\n\n${lines.join('\n')}\n\nTotal estimado: ${formatPriceBs(total)}\nQuisiera confirmar disponibilidad y coordinar la entrega.`;
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (Array.isArray(saved)) cart = saved.filter(i => i && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 999 && cartDetails(i) && Number.isFinite(cartDetails(i).price));
  } catch (_) { cart = []; }
  renderCart();
  ['cart-open-btn', 'cart-open-btn-mobile'].forEach(id => document.getElementById(id).addEventListener('click', openCart));
  ['cart-close', 'cart-overlay'].forEach(id => document.getElementById(id).addEventListener('click', closeCart));
  document.getElementById('cart-clear-btn').addEventListener('click', () => { cart = []; saveCart(); document.getElementById('cart-close').focus(); });
  document.getElementById('cart-body').addEventListener('click', e => {
    const button = e.target.closest('button[data-action]');
    if (!button) return;
    const { action, index } = button.dataset;
    if (action === 'browse') { closeCart(); document.getElementById('productos').scrollIntoView({ behavior: 'smooth' }); return; }
    const item = cart[Number(index)];
    if (!item) return;
    if (action === 'plus') item.quantity = Math.min(999, item.quantity + 1);
    if (action === 'minus') item.quantity--;
    if (action === 'remove' || item.quantity === 0) cart.splice(Number(index), 1);
    saveCart();
    const next = document.querySelector(`#cart-body button[data-index="${index}"][data-action="${action}"]:not(:disabled)`);
    (next || document.getElementById('cart-close')).focus();
  });
  document.getElementById('cart-wa-btn').addEventListener('click', () => {
    if (cart.length) window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(cartMessage())}`, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('cart-drawer').addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeCart(); }
    if (e.key === 'Tab') {
      const buttons = [...document.querySelectorAll('#cart-drawer button:not(:disabled)')].filter(el => el.getClientRects().length);
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
});
