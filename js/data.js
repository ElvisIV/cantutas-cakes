/**
 * CANTUTAS CAKES — DATA.JS
 * Fuente centralizada de todos los productos, categorías,
 * galería y ocasiones.
 *
 * Para reemplazar imágenes: cambia el campo `image` de cada
 * producto/ítem por la ruta local correspondiente.
 * Ejemplo: "images/products/torta-oreo.jpg"
 */

/* =====================================================
   WHATSAPP
   ===================================================== */
const WA_NUMBER = "59177227645";

/**
 * Genera el mensaje de WhatsApp y abre wa.me
 * @param {Object} product - Producto seleccionado
 * @param {Object|null} variant - Variante seleccionada (porciones/precio) o null
 */
function createWhatsAppMessage(product, variant = null) {
  let message = "";

  if (product.category === "masitas") {
    message =
      `Hola, Cantutas Cakes\n` +
      `Me interesa realizar un pedido.\n\n` +
      `Producto: ${product.name}\n` +
      `Precio unitario: Bs ${formatPrice(product.price)}\n\n` +
      `Quisiera consultar disponibilidad y cantidad.`;
  } else if (variant) {
    message =
      `Hola, Cantutas Cakes\n` +
      `Quisiera realizar un pedido.\n\n` +
      `Producto: ${product.name}\n` +
      `Tamaño: ${variant.label}\n` +
      `Precio: Bs ${formatPrice(variant.price)}\n\n` +
      `Quisiera consultar disponibilidad y coordinar mi pedido.`;
  } else {
    message =
      `Hola, Cantutas Cakes\n` +
      `Quisiera realizar un pedido.\n\n` +
      `Producto: ${product.name}\n\n` +
      `Quisiera consultar disponibilidad y coordinar mi pedido.`;
  }

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function formatPrice(price) {
  return Number.isInteger(price) ? price.toString() : price.toFixed(2).replace(".", ",");
}

/* =====================================================
   CATEGORÍAS
   ===================================================== */
const CATEGORIES = [
  {
    id: "tortas",
    name: "Tortas",
    description: "Tortas húmedas para toda ocasión, con rellenos cremosos y sabores únicos.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
    alt: "Torta de celebración decorada con crema y frutas",
    filter: "tortas"
  },
  {
    id: "masitas",
    name: "Masitas",
    description: "Bocados individuales perfectos para el día a día o compartir en reuniones.",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
    alt: "Variedad de masitas y galletas artesanales",
    filter: "masitas"
  },
  {
    id: "postres",
    name: "Postres y Pies",
    description: "Cheesecakes, pies y brazos gitanos preparados con ingredientes frescos.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
    alt: "Pie de limón con merengue",
    filter: "postres"
  }
];

/* =====================================================
   PRODUCTOS — TORTAS
   ===================================================== */
const PRODUCTS_TORTAS = [
  {
    id: "torta-tradicional",
    name: "Torta Tradicional",
    category: "tortas",
    description: "Torta húmeda con masa de vainilla y chocolate. Relleno con crema de leche, dulce de leche y duraznos.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    alt: "Torta tradicional de vainilla y chocolate con crema",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 85 },
      { label: "20 porciones", price: 110 },
      { label: "30 porciones", price: 160 }
    ]
  },
  {
    id: "torta-oreo",
    name: "Torta de Oreo",
    category: "tortas",
    description: "Torta húmeda con masa de chocolate. Relleno con crema de leche, dulce de leche y galletas Oreo.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80",
    alt: "Torta de Oreo con crema de chocolate y galletas",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 95 },
      { label: "20 porciones", price: 120 },
      { label: "30 porciones", price: 170 }
    ]
  },
  {
    id: "torta-moka",
    name: "Torta de Moka",
    category: "tortas",
    description: "Torta húmeda de chocolate rellena con crema de leche, café y nueces.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Torta de moka con chocolate y nueces",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-tres-leches",
    name: "Torta Tres Leches",
    category: "tortas",
    description: "Bizcocho húmedo de vainilla relleno con crema de leche, dulce de leche, leche evaporada y leche condensada.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
    alt: "Torta tres leches con crema y decoración",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-selva-negra",
    name: "Torta Selva Negra",
    category: "tortas",
    description: "Bizcocho húmedo de chocolate relleno con dulce de leche, crema de leche y cherries.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    alt: "Torta Selva Negra con chocolate y cerezas",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-mil-hojas",
    name: "Torta Mil Hojas",
    category: "tortas",
    description: "Masa de hojaldre rellena con manjar y crema de leche. Duraznos opcionales.",
    image: "https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?w=600&q=80",
    alt: "Torta mil hojas con manjar y crema",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-limon",
    name: "Torta de Limón",
    category: "tortas",
    description: "Bizcocho húmedo de vainilla con relleno de limón, bañado en crema de leche.",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=600&q=80",
    alt: "Torta de limón con crema y decoración cítrica",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-maracuya",
    name: "Torta de Maracuyá",
    category: "tortas",
    description: "Masa de chocolate o vainilla, relleno de maracuyá, crema de leche y salsa de maracuyá.",
    image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&q=80",
    alt: "Torta de maracuyá con crema y frutas tropicales",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-moras",
    name: "Torta de Moras",
    category: "tortas",
    description: "Masa húmeda de vainilla o chocolate con relleno de moras y crema de leche.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    alt: "Torta de moras con crema y frutas",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-limon-arandanos",
    name: "Torta de Limón con Arándanos",
    category: "tortas",
    description: "Masa de vainilla con relleno de limón y trozos de arándanos, bañada en crema de leche y fruta.",
    image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=600&q=80",
    alt: "Torta de limón con arándanos y crema",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-chirimoya",
    name: "Torta de Chirimoya",
    category: "tortas",
    description: "Masa de brownie con relleno de chirimoya, crema de leche y fruta.",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80",
    alt: "Torta de chirimoya con crema",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-tiramisu",
    name: "Torta Tiramisú",
    category: "tortas",
    description: "Bizcocho embebido en café con relleno de queso crema y crema de leche.",
    image: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?w=600&q=80",
    alt: "Torta tiramisú con cacao y crema de queso",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-zanahoria",
    name: "Torta de Zanahoria",
    category: "tortas",
    description: "Bizcocho de zanahoria con nueces y relleno cremoso de crema de leche y queso crema.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
    alt: "Torta de zanahoria con cobertura de queso crema",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  },
  {
    id: "torta-chocolate",
    name: "Torta de Chocolate",
    category: "tortas",
    description: "Masa de brownie rellena con crema de chocolate y dulce de leche, con cobertura de chocolate ganache.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80",
    alt: "Torta de chocolate con ganache y crema",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "10 porciones", price: 150 },
      { label: "20 porciones", price: 200 },
      { label: "30 porciones", price: 300 }
    ]
  }
];

/* =====================================================
   PRODUCTOS — POSTRES Y PIES
   ===================================================== */
const PRODUCTS_POSTRES = [
  {
    id: "brazo-gitano",
    name: "Brazo Gitano",
    category: "postres",
    description: "Masa de vainilla con dulce de leche, crema de leche y fruta.",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=80",
    alt: "Brazo gitano enrollado con crema y dulce de leche",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "8 porciones", price: 50 }
    ]
  },
  {
    id: "cheesecake-frutillas",
    name: "Cheesecake al Horno con Frutillas",
    category: "postres",
    description: "Tarta de requesón con puré de frutillas y crema de leche.",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=600&q=80",
    alt: "Cheesecake al horno con salsa de frutillas",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "6 a 8 porciones", price: 50 },
      { label: "10 a 12 porciones", price: 75 }
    ]
  },
  {
    id: "pie-limon",
    name: "Pie de Limón",
    category: "postres",
    description: "Base crocante con relleno cremoso de limón y merengue.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
    alt: "Pie de limón con merengue dorado",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "7 porciones", price: 50 }
    ]
  },
  {
    id: "pie-manzana",
    name: "Pie de Manzana",
    category: "postres",
    description: "Base suave y crocante con manzanas cocidas, canela y especias.",
    image: "https://images.unsplash.com/photo-1517093602195-b40af9bb4524?w=600&q=80",
    alt: "Pie de manzana con canela",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "7 porciones", price: 50 }
    ]
  },
  {
    id: "pie-maracuya",
    name: "Pie de Maracuyá",
    category: "postres",
    description: "Base crocante con relleno cremoso de maracuyá y cobertura de crema de leche.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
    alt: "Pie de maracuyá con crema",
    requiresAdvanceOrder: true,
    advanceHours: 48,
    variants: [
      { label: "8 porciones", price: 50 }
    ]
  }
];

/* =====================================================
   PRODUCTOS — MASITAS (precio unitario)
   ===================================================== */
const PRODUCTS_MASITAS = [
  { id: "pan-chocolate", name: "Pan de chocolate", category: "masitas", price: 2, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=400&q=80", alt: "Pan de chocolate" },
  { id: "pan-canela", name: "Pan de canela", category: "masitas", price: 2, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80", alt: "Pan de canela" },
  { id: "alfajor-maicena", name: "Alfajor de maicena", category: "masitas", price: 1.5, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80", alt: "Alfajor de maicena" },
  { id: "empanadas", name: "Empanadas", category: "masitas", price: 3, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", alt: "Empanadas" },
  { id: "rollitos", name: "Rollitos", category: "masitas", price: 3, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", alt: "Rollitos" },
  { id: "bracitos", name: "Bracitos", category: "masitas", price: 2, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80", alt: "Bracitos" },
  { id: "alfajores-choco", name: "Alfajores con chocolate", category: "masitas", price: 5, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&q=80", alt: "Alfajores con chocolate" },
  { id: "cupcakes", name: "Cupcakes", category: "masitas", price: 3, image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80", alt: "Cupcakes decorados" },
  { id: "trufas-coco", name: "Trufas con coco", category: "masitas", price: 2, image: "https://images.unsplash.com/photo-1548741487-18d363dc4469?w=400&q=80", alt: "Trufas con coco" },
  { id: "galletas-mermelada", name: "Galletas con mermelada", category: "masitas", price: 5, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80", alt: "Galletas con mermelada" },
  { id: "alfajores-crema", name: "Alfajores con crema", category: "masitas", price: 5, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80", alt: "Alfajores con crema" },
  { id: "empanadas-hoja", name: "Empanadas de hoja", category: "masitas", price: 4, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", alt: "Empanadas de hoja" },
  { id: "donas", name: "Donas", category: "masitas", price: 4, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80", alt: "Donas glaseadas" },
  { id: "tartaleta-gelatina", name: "Tartaleta de gelatina", category: "masitas", price: 5, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80", alt: "Tartaleta de gelatina" },
  { id: "conitos", name: "Conitos", category: "masitas", price: 5, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", alt: "Conitos de crema" },
  { id: "berlines", name: "Berlines", category: "masitas", price: 5, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80", alt: "Berlines" },
  { id: "cuñape", name: "Cuñapé", category: "masitas", price: 5, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", alt: "Cuñapé" },
  { id: "bombitas", name: "Bombitas", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", alt: "Bombitas" },
  { id: "choco-bomba", name: "Choco-Bomba", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1548741487-18d363dc4469?w=400&q=80", alt: "Choco-Bomba" },
  { id: "tartaletas-frutilla", name: "Tartaletas de frutilla", category: "masitas", price: 7, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", alt: "Tartaletas de frutilla" },
  { id: "pie-limon-ind", name: "Pie de limón individual", category: "masitas", price: 8, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=80", alt: "Pie de limón individual" },
  { id: "pie-maracuya-ind", name: "Pie de maracuyá individual", category: "masitas", price: 8, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80", alt: "Pie de maracuyá individual" },
  { id: "pie-manzana-ind", name: "Pie de manzana individual", category: "masitas", price: 7, image: "https://images.unsplash.com/photo-1517093602195-b40af9bb4524?w=400&q=80", alt: "Pie de manzana individual" },
  { id: "pastel-hoja", name: "Pastel de hoja", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?w=400&q=80", alt: "Pastel de hoja" },
  { id: "brownie", name: "Brownie", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80", alt: "Brownie de chocolate" },
  { id: "pastel-maracuya", name: "Pastel de maracuyá", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400&q=80", alt: "Pastel de maracuyá" },
  { id: "pastel-tres-leches", name: "Pastel de tres leches", category: "masitas", price: 8, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", alt: "Pastel de tres leches" },
  { id: "pan-pizza", name: "Pan de pizza", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80", alt: "Pan de pizza" },
  { id: "croissant-choco", name: "Croissant con chocolate", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", alt: "Croissant con chocolate" },
  { id: "croissant-qj", name: "Croissant de queso y jamón", category: "masitas", price: 6, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", alt: "Croissant de queso y jamón" },
  { id: "arlequines", name: "Arlequines", category: "masitas", price: 7, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80", alt: "Arlequines" },
  { id: "mini-postres-vaso", name: "Mini postres en vaso", category: "masitas", price: 8, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", alt: "Mini postres en vaso" },
  { id: "queque-naranja", name: "Queque de naranja", category: "masitas", price: 18, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80", alt: "Queque de naranja" },
  { id: "rollo-queso", name: "Rollo de queso", category: "masitas", price: 20, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", alt: "Rollo de queso" }
];

/* Unir todos los productos */
const ALL_PRODUCTS = [...PRODUCTS_TORTAS, ...PRODUCTS_POSTRES, ...PRODUCTS_MASITAS];

/* =====================================================
   GALERÍA
   ===================================================== */
const GALLERY_ITEMS = [
  {
    id: "g1",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    alt: "Torta de celebración con decoración de crema",
    caption: "Torta de celebración",
    category: "tortas"
  },
  {
    id: "g2",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
    alt: "Torta de cumpleaños decorada",
    caption: "Torta de cumpleaños",
    category: "celebraciones"
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=80",
    alt: "Cupcakes decorados con crema",
    caption: "Cupcakes artesanales",
    category: "masitas"
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=600&q=80",
    alt: "Cheesecake con frutillas",
    caption: "Cheesecake al horno",
    category: "postres"
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80",
    alt: "Torta de chocolate con decoración",
    caption: "Torta de chocolate",
    category: "tortas"
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
    alt: "Donas glaseadas y decoradas",
    caption: "Donas artesanales",
    category: "masitas"
  },
  {
    id: "g7",
    image: "https://images.unsplash.com/photo-1517093602195-b40af9bb4524?w=600&q=80",
    alt: "Pie de manzana recién horneado",
    caption: "Pie de manzana",
    category: "postres"
  },
  {
    id: "g8",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    alt: "Torta de celebración decorada con flores",
    caption: "Celebración especial",
    category: "celebraciones"
  },
  {
    id: "g9",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
    alt: "Brownie de chocolate húmedo",
    caption: "Brownie artesanal",
    category: "masitas"
  },
  {
    id: "g10",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
    alt: "Galletas artesanales con azúcar",
    caption: "Galletas artesanales",
    category: "masitas"
  },
  {
    id: "g11",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Torta de moka decorada",
    caption: "Torta de moka",
    category: "tortas"
  },
  {
    id: "g12",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
    alt: "Selección de masitas variadas",
    caption: "Selección de masitas",
    category: "masitas"
  }
];

/* =====================================================
   OCASIONES
   ===================================================== */
const OCCASIONS = [
  {
    id: "cumpleanos",
    emoji: "🎂",
    name: "Cumpleaños",
    description: "Tortas y masitas para hacer el día especial.",
    filter: "tortas"
  },
  {
    id: "bodas",
    emoji: "💍",
    name: "Bodas",
    description: "Dulces elegantes para una celebración única.",
    filter: "tortas"
  },
  {
    id: "graduaciones",
    emoji: "🎓",
    name: "Graduaciones",
    description: "Celebra el logro con algo dulce y especial.",
    filter: "tortas"
  },
  {
    id: "celebraciones",
    emoji: "🎉",
    name: "Celebraciones",
    description: "Para esos momentos que mereces compartir.",
    filter: "all"
  },
  {
    id: "momentos-especiales",
    emoji: "❤️",
    name: "Momentos especiales",
    description: "Pequeños detalles que hacen la diferencia.",
    filter: "masitas"
  }
];

/* Nota: Los testimonios están marcados como isDemo=true y
   NO se muestran públicamente hasta contar con testimonios reales. */
const TESTIMONIOS_DEMO = [
  { isDemo: true, name: "María G.", text: "Las tortas son increíbles, siempre perfectas para cada celebración.", rating: 5 },
  { isDemo: true, name: "Carlos R.", text: "Las masitas son deliciosas, mi familia las pide cada semana.", rating: 5 },
  { isDemo: true, name: "Lucía P.", text: "Excelente atención y productos de primera calidad.", rating: 5 }
];
