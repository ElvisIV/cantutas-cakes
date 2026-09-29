/**
 * CANTUTAS CAKES — APP.JS
 * Lógica principal de la landing page.
 * Componentes: Header, Categories, Products, Gallery,
 * Occasions, Lightbox, Product Modal, Animations.
 */

/* =====================================================
   ESTADO GLOBAL
   ===================================================== */
const STATE = {
  currentFilter: "all",
  searchQuery: "",
  visibleCount: 8,        // Productos mostrados inicialmente
  step: 8,               // Cuántos se cargan por "Ver más"
  galleryFilter: "all",
  selectedVariants: {},  // { productId: variantIndex }
};

/* =====================================================
   UTILIDADES
   ===================================================== */

/** Obtiene el ícono SVG de WhatsApp como string */
function waIconSVG(size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>`;
}

function formatPriceBs(price) {
  const num = Number(price);
  if (!Number.isFinite(num)) return "—";
  if (Number.isInteger(num)) return `Bs ${num}`;
  // Remove unnecessary trailing zeros: 1.50 -> 1,50 but 1.5 -> 1,50
  const formatted = num.toFixed(2).replace(".", ",");
  return `Bs ${formatted}`;
}

/** Filtra productos según categoría activa y búsqueda */
function getFilteredProducts() {
  return ALL_PRODUCTS.filter(p => {
    const matchesCategory =
      STATE.currentFilter === "all" || p.category === STATE.currentFilter;
    const q = STATE.searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });
}

/* =====================================================
   HEADER
   ===================================================== */
function initHeader() {
  const header    = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const closeLinks = document.querySelectorAll("[data-close-menu]");
  let menuOpen    = false;

  // Sticky shadow
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    menuOpen = !menuOpen;
    hamburger.classList.toggle("is-open", menuOpen);
    mobileNav.classList.toggle("is-open", menuOpen);
    hamburger.setAttribute("aria-expanded", menuOpen);
    mobileNav.setAttribute("aria-hidden", !menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "";
  });

  // Close on link click
  closeLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  function closeMenu() {
    menuOpen = false;
    hamburger.classList.remove("is-open");
    mobileNav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks  = document.querySelectorAll(".nav__link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* =====================================================
   CATEGORÍAS
   ===================================================== */
function renderCategories() {
  const grid = document.getElementById("categories-grid");
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(cat => `
    <button
      class="category-card reveal"
      data-category-filter="${cat.filter}"
      aria-label="Ver ${cat.name}"
      id="cat-${cat.id}"
    >
      <img
        src="${cat.image}"
        alt="${cat.alt}"
        class="category-card__image"
        loading="lazy"
      />
      <div class="category-card__overlay" aria-hidden="true"></div>
      <div class="category-card__content">
        <span class="category-card__badge">Explorar</span>
        <h3 class="category-card__name">${cat.name}</h3>
        <p class="category-card__desc">${cat.description}</p>
        <span class="category-card__action">
          Ver productos <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  `).join("");

  // Category click → filter + scroll
  grid.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const filter = card.dataset.categoryFilter;
      setFilter(filter);
      document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* =====================================================
   PRODUCTOS
   ===================================================== */

/** Renderiza el grid de productos según el estado actual */
function renderProducts() {
  const grid  = document.getElementById("products-grid");
  const more  = document.getElementById("products-more");
  const empty = document.getElementById("products-empty");

  if (!grid) return;

  const filtered = getFilteredProducts();
  const visible  = filtered.slice(0, STATE.visibleCount);

  if (filtered.length === 0) {
    grid.innerHTML = "";
    more.hidden  = true;
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  more.hidden  = filtered.length <= STATE.visibleCount;

  grid.innerHTML = visible.map(product => renderProductCard(product)).join("");

  // Bind variant pills in grid
  grid.querySelectorAll(".variant-pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      const productId = e.currentTarget.closest("[data-product-id]").dataset.productId;
      const index = parseInt(e.currentTarget.dataset.variantIndex, 10);
      selectVariant(productId, index);
    });
  });

  // Bind order buttons
  grid.querySelectorAll(".product-card__btn-order").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const product   = ALL_PRODUCTS.find(p => p.id === productId);
      if (!product) return;

      if (product.variants) {
        const idx     = STATE.selectedVariants[productId] ?? 0;
        const variant = product.variants[idx];
        addToCart(product, STATE.selectedVariants[product.id] ?? 0);
      } else {
        addToCart(product, null);
      }
    });
  });

  // Bind detail buttons
  grid.querySelectorAll(".product-card__btn-detail").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const product   = ALL_PRODUCTS.find(p => p.id === productId);
      if (product) openProductModal(product);
    });
  });

  // Trigger reveal animation
  requestAnimationFrame(() => {
    grid.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 60);
    });
  });
}

/** Genera el HTML de una tarjeta de producto */
function renderProductCard(product) {
  const isVariant = product.variants && product.variants.length > 0;
  const isMasita  = product.category === "masitas";

  // Category label
  const catLabels = { tortas: "Torta", masitas: "Masita", postres: "Postre" };
  const catLabel  = catLabels[product.category] || product.category;

  // Advance badge
  const advBadge = product.requiresAdvanceOrder
    ? `<span class="product-card__advance" title="Requiere pedido con anticipación"><svg class="order-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M3 4l3-2m12 0 3 2"/></svg> 48h anticipación</span>`
    : "";

  // Variants or single price
  let priceSection = "";
  if (isVariant) {
    const selectedIdx = STATE.selectedVariants[product.id] ?? 0;
    priceSection = `
      <div class="variant-selector">
        <span class="variant-selector__label">Selecciona tamaño</span>
        <div class="variant-pills">
          ${product.variants.map((v, i) => `
            <button
              class="variant-pill ${i === selectedIdx ? "selected" : ""}"
              data-variant-index="${i}"
              aria-pressed="${i === selectedIdx}"
              aria-label="${v.label} — ${formatPriceBs(v.price)}"
            >
              <span class="variant-pill__portions">${v.label}</span>
              <span class="variant-pill__price">${formatPriceBs(v.price)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  } else {
    priceSection = `<p class="product-card__price">${formatPriceBs(product.price)}</p>`;
  }

  return `
    <article class="product-card reveal" data-product-id="${product.id}" aria-label="${product.name}">
      <div class="product-card__image-wrap">
        <img
          src="${product.image}"
          alt="${product.alt}"
          class="product-card__image"
          loading="lazy"
          width="400"
          height="300"
        />
        <span class="product-card__badge">${catLabel}</span>
        ${advBadge}
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__desc">${product.description || ""}</p>
        ${priceSection}
      </div>
      <div class="product-card__footer">
        <button
          class="product-card__btn-order"
          data-product-id="${product.id}"
          aria-label="Agregar ${product.name} al carrito"
        >
          <span aria-hidden="true">&#43;</span>
          Agregar al carrito
        </button>
        <button
          class="product-card__btn-detail"
          data-product-id="${product.id}"
          aria-label="Ver detalles de ${product.name}"
          title="Ver detalles"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </article>
  `;
}

/** Selecciona una variante de producto y re-renderiza esa card */
function selectVariant(productId, index) {
  STATE.selectedVariants[productId] = index;

  // Re-render solo las pills de esa card
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  if (!card) return;

  card.querySelectorAll(".variant-pill").forEach((pill, i) => {
    pill.classList.toggle("selected", i === index);
    pill.setAttribute("aria-pressed", i === index ? "true" : "false");
  });
}

/** Aplica un filtro de categoría */
function setFilter(filter) {
  STATE.currentFilter = filter;
  STATE.visibleCount  = STATE.step;
  STATE.searchQuery   = "";

  // Reset search input
  const searchInput = document.getElementById("product-search");
  if (searchInput) searchInput.value = "";

  // Update filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("filter-btn--active", btn.dataset.filter === filter);
  });

  renderProducts();
}

/** Inicializa filtros y búsqueda */
function initProductControls() {
  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });

  // Search
  const searchInput = document.getElementById("product-search");
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        STATE.searchQuery  = searchInput.value;
        STATE.visibleCount = STATE.step;
        renderProducts();
      }, 280);
    });
  }

  // Load more
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      STATE.visibleCount += STATE.step;
      renderProducts();
      loadMoreBtn.blur();
    });
  }
}

/* =====================================================
   PRODUCT MODAL
   ===================================================== */
function openProductModal(product) {
  const modal    = document.getElementById("product-modal");
  const body     = document.getElementById("modal-body");
  const overlay  = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close");

  const isVariant = product.variants && product.variants.length > 0;
  const catLabels = { tortas: "Torta", masitas: "Masita", postres: "Postre" };
  const catLabel  = catLabels[product.category] || product.category;

  const selectedIdx = STATE.selectedVariants[product.id] ?? 0;

  let variantSection = "";
  if (isVariant) {
    variantSection = `
      <div class="modal__variant-section">
        <p class="modal__variant-label">Selecciona el tamaño</p>
        <div class="modal__variants">
          ${product.variants.map((v, i) => `
            <button
              class="modal__variant-btn ${i === selectedIdx ? "selected" : ""}"
              data-modal-variant="${i}"
              data-product-id="${product.id}"
              aria-pressed="${i === selectedIdx}"
            >
              <span class="modal__variant-btn__portions">${v.label}</span>
              <span class="modal__variant-btn__price">${formatPriceBs(v.price)}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  } else {
    variantSection = `<p class="modal__single-price">${formatPriceBs(product.price)}</p>`;
  }

  body.innerHTML = `
    <img
      src="${product.image}"
      alt="${product.alt}"
      class="modal__image"
      loading="lazy"
    />
    <div class="modal__inner">
      <div class="modal__badges">
        <span class="modal__badge modal__badge--cat">${catLabel}</span>
        ${product.requiresAdvanceOrder
          ? `<span class="modal__badge modal__badge--advance"><svg class="order-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M3 4l3-2m12 0 3 2"/></svg> 48h de anticipación</span>`
          : ""}
      </div>
      <h2 class="modal__name" id="modal-product-name">${product.name}</h2>
      <p class="modal__desc">${product.description || ""}</p>
      ${variantSection}
    </div>
    <div class="modal__actions">
      <button
        class="btn btn--whatsapp btn--lg modal__order-btn"
        data-product-id="${product.id}"
        aria-label="Agregar ${product.name} al carrito"
      >
        <span aria-hidden="true">&#43;</span>
        Agregar al carrito
      </button>
      <button class="btn btn--outline-brand btn--lg" id="modal-close-btn">
        Cerrar
      </button>
    </div>
  `;

  // Bind variant selection inside modal
  body.querySelectorAll(".modal__variant-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.modalVariant, 10);
      const pid = btn.dataset.productId;
      STATE.selectedVariants[pid] = idx;

      body.querySelectorAll(".modal__variant-btn").forEach((b, i) => {
        b.classList.toggle("selected", i === idx);
        b.setAttribute("aria-pressed", i === idx ? "true" : "false");
      });

      // Sync grid card if visible
      selectVariant(pid, idx);
    });
  });

  // Bind order button inside modal
  body.querySelector(".modal__order-btn").addEventListener("click", () => {
    const pid     = product.id;
    const prod    = ALL_PRODUCTS.find(p => p.id === pid);
    const variant = prod.variants ? prod.variants[STATE.selectedVariants[pid] ?? 0] : null;
    closeModal(); addToCart(prod, prod.variants ? (STATE.selectedVariants[pid] ?? 0) : null);
  });

  // Close buttons
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal, { once: true });
  overlay.addEventListener("click", closeModal, { once: true });
  body.querySelector("#modal-close-btn")?.addEventListener("click", closeModal, { once: true });

  // Escape key
  function escHandler(e) {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escHandler);
    }
  }
  document.addEventListener("keydown", escHandler);

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  // Focus first interactive element
  setTimeout(() => closeBtn.focus(), 50);
}

/* =====================================================
   GALERÍA
   ===================================================== */
function renderGallery(filter = "all") {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const items = filter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === filter);

  grid.innerHTML = items.map(item => `
    <figure
      class="gallery__item reveal"
      data-gallery-category="${item.category}"
      tabindex="0"
      role="button"
      aria-label="Ver imagen: ${item.caption}"
    >
      <img
        src="${item.image}"
        alt="${item.alt}"
        class="gallery__item-img"
        loading="lazy"
        width="400"
      />
      <div class="gallery__item-overlay" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
        </svg>
      </div>
      <figcaption class="gallery__item-caption">${item.caption}</figcaption>
    </figure>
  `).join("");

  // Bind lightbox + keyboard
  grid.querySelectorAll(".gallery__item").forEach((item, idx) => {
    const openLB = () => {
      const galleryItem = items[idx];
      openLightbox(galleryItem.image, galleryItem.alt, galleryItem.caption);
    };
    item.addEventListener("click", openLB);
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLB(); }
    });
  });

  // Reveal
  requestAnimationFrame(() => {
    grid.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 50);
    });
  });
}

function initGalleryFilters() {
  document.querySelectorAll(".gallery-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".gallery-filter-btn").forEach(b => {
        b.classList.remove("gallery-filter-btn--active");
      });
      btn.classList.add("gallery-filter-btn--active");
      STATE.galleryFilter = btn.dataset.galleryFilter;
      renderGallery(STATE.galleryFilter);
    });
  });
}

/* =====================================================
   LIGHTBOX
   ===================================================== */
function openLightbox(src, alt, caption = "") {
  const lightbox = document.getElementById("lightbox");
  const img      = document.getElementById("lightbox-img");
  const cap      = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  img.src = src;
  img.alt = alt;
  cap.textContent = caption;

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeBtn.focus();

  function closeLB() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  closeBtn.onclick = closeLB;
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLB();
  }, { once: true });

  function escLB(e) {
    if (e.key === "Escape") { closeLB(); document.removeEventListener("keydown", escLB); }
  }
  document.addEventListener("keydown", escLB);
}

/* =====================================================
   OCASIONES
   ===================================================== */
function renderOccasions() {
  const grid = document.getElementById("occasions-grid");
  if (!grid) return;

  grid.innerHTML = OCCASIONS.map(occ => `
    <button
      class="occasion-card reveal"
      data-occ-filter="${occ.filter}"
      aria-label="Ver productos para ${occ.name}"
      id="occ-${occ.id}"
    >
      <span class="occasion-card__emoji" aria-hidden="true">${occ.emoji}</span>
      <h3 class="occasion-card__name">${occ.name}</h3>
      <p class="occasion-card__desc">${occ.description}</p>
    </button>
  `).join("");

  grid.querySelectorAll(".occasion-card").forEach(card => {
    card.addEventListener("click", () => {
      const filter = card.dataset.occFilter;
      setFilter(filter);
      document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* =====================================================
   ANIMACIONES — INTERSECTION OBSERVER
   ===================================================== */
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Observe all static reveal elements
  document.querySelectorAll(".reveal, .step, .info-card, .value-pill").forEach(el => {
    observer.observe(el);
  });
}

/* =====================================================
   FOOTER — AÑO
   ===================================================== */
function setFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* =====================================================
   FLOATING WA — MOSTRAR TRAS SCROLL
   ===================================================== */
function initFloatingWA() {
  const btn = document.getElementById("floating-wa");
  if (!btn) return;

  btn.style.opacity  = "0";
  btn.style.transform = "scale(0.8)";
  btn.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  btn.style.pointerEvents = "none";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.opacity  = "1";
      btn.style.transform = "scale(1)";
      btn.style.pointerEvents = "auto";
    } else {
      btn.style.opacity  = "0";
      btn.style.transform = "scale(0.8)";
      btn.style.pointerEvents = "none";
    }
  }, { passive: true });
}

/* =====================================================
   SMOOTH SCROLL para anclas internas
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById("header")?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

/* =====================================================
   REVEAL DINÁMICO — observa nuevos elementos en el DOM
   ===================================================== */
let revealObserver;

function initDynamicReveal() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
}

/** Registra nuevos elementos .reveal para observación */
function observeNewReveal(container) {
  if (!revealObserver) return;
  container.querySelectorAll(".reveal:not(.visible)").forEach(el => {
    revealObserver.observe(el);
  });
}

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Observers
  initDynamicReveal();

  // Header
  initHeader();

  // Footer year
  setFooterYear();

  // Floating WA
  initFloatingWA();

  // Smooth scroll
  initSmoothScroll();

  // Render sections
  renderCategories();
  renderProducts();
  renderGallery();
  renderOccasions();

  // Controls
  initProductControls();
  initGalleryFilters();

  // Observe static elements
  setTimeout(() => {
    document.querySelectorAll(".reveal, .step, .info-card").forEach(el => {
      if (revealObserver) revealObserver.observe(el);
    });
  }, 100);
});

