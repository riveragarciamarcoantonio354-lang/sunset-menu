// Datos del negocio
const NEGOCIO = {
  nombre: "Sunset Cafe",
  whatsapp: "525959313653", // 52 + número, sin espacios
  mensaje: "Hola Sunset Cafe, quiero hacer un pedido 😊"
};

// Menú: para cambiar un precio, solo edita el número.
// Si un platillo no tiene precio, pon null.
const MENU = [
  {
    categoria: "Snacks", emoji: "🍟",
    platillos: [
      { nombre: "Alitas", precio: 99 },
      { nombre: "Papas gajo", precio: 85 },
      { nombre: "Plato de snack para compartir", precio: 299 },
      { nombre: "Chilli nachos con carne", precio: 85 },
      { nombre: "Papas a la francesa", precio: 75 },
      { nombre: "Deditos de queso", precio: 79 },
      { nombre: "Tenders de crunchy pollo con papas chips", precio: 90 },
      { nombre: "Papas cambray con arrachera", precio: 95 }
    ]
  },
  {
    categoria: "Crepas y Ciabattas", emoji: "🥪",
    platillos: [
      { nombre: "Ciabatta Especial Sunset", precio: 99 },
      { nombre: "Ciabatta italiana", precio: 109 },
      { nombre: "Ciabatta serrano", precio: 129 },
      { nombre: "Ciabatta de 4 quesos", precio: 109 },
      { nombre: "Ciabatta de cochinita pibil", precio: 109 },
      { nombre: "Ciabatta de jamón de pavo", precio: 89 },
      { nombre: "Ciabatta crunchy pollo", precio: 109 },
      { nombre: "Cuernito de jamón", precio: 69 },
      { nombre: "Crepas de jamón", precio: 89 },
      { nombre: "Crepas poblanas", precio: 99 },
      { nombre: "Crepas de champiñones", precio: 99 },
      { nombre: "Crepa hawaiana", precio: 89 },
      { nombre: "Crepa estilo italiano", precio: 99 },
      { nombre: "Molletes con cochinita pibil", precio: 99 },
      { nombre: "Molletes con jamón de pavo", precio: 89 },
      { nombre: "Molletes con bistec", precio: 99 },
      { nombre: "Molletes con arrachera", precio: 149 },
      { nombre: "Burrito de arrachera", precio: 149 },
      { nombre: "Burrito de pastor con queso", precio: 109 }
    ]
  },
  {
    categoria: "Ensaladas", emoji: "🥗",
    platillos: [
      { nombre: "Ensalada Sunset", precio: 109 },
      { nombre: "Ensalada Santa Cruz", precio: 109 },
      { nombre: "Ensalada de durazno", precio: 109 },
      { nombre: "Ensalada de atún", precio: 109 },
      { nombre: "Ensalada mediterránea", precio: 119 }
    ]
  },
  {
    categoria: "Postres", emoji: "🍰",
    platillos: [
      { nombre: "Pastel individual", precio: 58 },
      { nombre: "Galleta pretzel", precio: 39 },
      { nombre: "Copa de helado", precio: null },
      { nombre: "Orden de waffles", precio: null },
      { nombre: "Copa de helado con galleta y café", precio: 69 },
      { nombre: "Mini roles de canela", precio: 56 },
      { nombre: "Volcán de chocolate con helado", precio: 75 },
      { nombre: "Pastel de elote con helado", precio: 75 },
      { nombre: "Danesa de manzana con helado", precio: 78 },
      { nombre: "Bolsita de galletas", precio: 44 },
      { nombre: "Pay de queso con zarzamora", precio: 58 },
      { nombre: "Pan dulce", precio: 19 },
      { nombre: "Galleta chocochips", precio: 35 }
    ]
  },
  {
    categoria: "Frappuccinos", emoji: "🥤",
    platillos: [
      { nombre: "Frappuccino", precio: 54 },
      { nombre: "Frappuccino trufa de cereza", precio: 62 },
      { nombre: "Frappuccino Oreo", precio: 64 },
      { nombre: "Frappuccino M&M's", precio: 64 },
      { nombre: "Cappuccino frío", precio: 49 },
      { nombre: "Macchiato español helado", precio: 54 },
      { nombre: "Macadamia cappuccino helado", precio: 64 }
    ]
  },
  {
    categoria: "Malteadas", emoji: "🥤",
    platillos: [
      { nombre: "Malteada Ferrero", precio: 58 },
      { nombre: "Malteada pay de limón", precio: 58 },
      { nombre: "Malteada frutos del bosque", precio: 58 },
      { nombre: "Chai frappé con helado", precio: 64 },
      { nombre: "Berrylicious", precio: 55 },
      { nombre: "Espresso vainilla frappé", precio: 64 },
      { nombre: "Tapioca matcha y helado de vainilla", precio: 65 },
      { nombre: "Tapioca taro y helado de frutos del bosque", precio: 65 }
    ]
  },
  {
    categoria: "Chai y Chocolates", emoji: "☕",
    platillos: [
      { nombre: "Chai frío", precio: 48 },
      { nombre: "Chocolá", precio: 56 },
      { nombre: "Chocolate caliente", precio: 44 },
      { nombre: "Chocolate con malvaviscos", precio: 54 },
      { nombre: "Horchata caliente", precio: 44 },
      { nombre: "Chocolate blanco", precio: 44 },
      { nombre: "Taro latte", precio: 45 },
      { nombre: "Matcha latte", precio: 48 },
      { nombre: "Chai latte Elefante", precio: 45 },
      { nombre: "Chai latte Tortuga", precio: 45 },
      { nombre: "Chai latte Flamingo", precio: 45 },
      { nombre: "Chai latte Tucán", precio: 45 },
      { nombre: "Chai latte Tigre", precio: 45 },
      { nombre: "Chai latte Orca", precio: 45 },
      { nombre: "Chai latte Manzana", precio: 45 },
      { nombre: "Tepuchino amaretto con durazno té negro", precio: 42 },
      { nombre: "Tepuchino mango maracuyá cajeta", precio: 42 },
      { nombre: "Tepuchino granada frambuesa lechera", precio: 42 }
    ]
  },
  {
    categoria: "Tés", emoji: "🍵",
    platillos: [
      { nombre: "Limón amarillo", precio: 36 },
      { nombre: "Té verde con frambuesa y granada", precio: 36 },
      { nombre: "Mango maracuyá", precio: 36 },
      { nombre: "Manzanilla", precio: 36 },
      { nombre: "Té verde con menta", precio: 36 },
      { nombre: "Menta", precio: 36 },
      { nombre: "Durazno con té negro", precio: 36 },
      { nombre: "Durazno con jengibre, limón y miel", precio: 36 },
      { nombre: "Mora azul", precio: 36 },
      { nombre: "Té verde", precio: 36 },
      { nombre: "Manzana canela", precio: 36 },
      { nombre: "Hierbabuena", precio: 36 }
    ]
  },
  {
    categoria: "Tisanas", emoji: "🍓",
    platillos: [
      { nombre: "Fresa kiwi", precio: 45 },
      { nombre: "Moras", precio: 45 },
      { nombre: "Fruta de la pasión", precio: 45 },
      { nombre: "Pasión relax", precio: 45 },
      { nombre: "Ponche de guayaba", precio: 45 },
      { nombre: "Chabacano", precio: 45 },
      { nombre: "Fruta caribeña", precio: 45 },
      { nombre: "Fruta tropical", precio: 45 },
      { nombre: "Piña colada", precio: 45 },
      { nombre: "Frutas de la vida", precio: 45 }
    ]
  },
  {
    categoria: "Barra fría", emoji: "🧊",
    platillos: [
      { nombre: "Limonada", precio: 42 },
      { nombre: "Naranjada", precio: 42 },
      { nombre: "Limonada de frutos rojos", precio: 52 },
      { nombre: "Botella de agua", precio: 24 },
      { nombre: "Agua gasificada", precio: 25 },
      { nombre: "Agua mineral San Pellegrino", precio: 42 },
      { nombre: "Agua mineral preparada", precio: 42 },
      { nombre: "Refresco", precio: 26 },
      { nombre: "Tonic durazno-té negro", precio: 42 },
      { nombre: "Espresso Baileys", precio: 52 },
      { nombre: "Carajillo", precio: 75 },
      { nombre: "Carajillo de horchata", precio: 75 }
    ]
  }
];

// Los más pedidos (carrusel con tarjetas que se voltean)
// Las descripciones son de ejemplo: ajústalas con la info real del negocio.
const DESTACADOS = [
  {
    nombre: "Frappuccino Oreo",
    precio: 64,
    emoji: "🥤",
    imagen: "img/destacados/frappe-oreo.jpg",
    descripcion: "Frappé cremoso con galleta Oreo. De los favoritos para la tarde."
  },
  {
    nombre: "Malteada Ferrero",
    precio: 58,
    emoji: "🍫",
    imagen: "img/destacados/malteada-ferrero.jpg",
    descripcion: "Malteada con el sabor de chocolate y avellana del Ferrero."
  },
  {
    nombre: "Volcán de chocolate con helado",
    precio: 75,
    emoji: "🌋",
    imagen: "img/destacados/volcan.jpg",
    descripcion: "Pastel de chocolate con centro suave, acompañado de helado."
  },
  {
    nombre: "Crepas poblanas",
    precio: 99,
    emoji: "🌶️",
    imagen: "img/destacados/crepas.jpg",
    descripcion: "Crepas saladas estilo poblano, para comer con calma."
  },
  {
    nombre: "Ciabatta Especial Sunset",
    precio: 99,
    emoji: "🥪",
    imagen: "img/destacados/ciabatta.jpg",
    descripcion: "La ciabatta de la casa. Pregunta por sus ingredientes."
  },
  {
    nombre: "Tapioca taro con helado",
    precio: 65,
    emoji: "🧋",
    imagen: "img/destacados/tapioca-taro.jpg",
    descripcion: "Bebida de taro con perlas de tapioca y helado de frutos del bosque."
  }
];