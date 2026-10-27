const contenedor = document.getElementById("menu");
const nav = document.getElementById("categorias");
const buscador = document.getElementById("buscador");
const sinResultados = document.getElementById("sin-resultados");
const botonWhatsapp = document.getElementById("whatsapp");
const carrusel = document.getElementById("carrusel");
const loader = document.getElementById("loader");

// ---------- Utilidades ----------
const normalizar = (texto) =>
  texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const slug = (texto) => normalizar(texto).replace(/[^a-z0-9]+/g, "-");

const formatoPrecio = (precio) => (precio ? `$${precio}` : "Precio por confirmar");

const linkWhatsapp = (mensaje) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

// Convierte un valor de scroll en un número de 0 a 1 entre dos puntos
const rango = (p, inicio, fin) => Math.min(Math.max((p - inicio) / (fin - inicio), 0), 1);

// ---------- Pantalla de carga ----------
function ocultarLoader() {
  loader.classList.add("oculto-loader");
}
window.addEventListener("load", () => setTimeout(ocultarLoader, 500));
setTimeout(ocultarLoader, 3000); // por si algo tarda demasiado

// =========================================================
//  ESCENA: el frappé (cuadros del video) se desarma con el scroll
// =========================================================
const TOTAL_CUADROS = 121;
const rutaCuadro = (i) => `img/frappe/${String(i + 1).padStart(3, "0")}.webp`;

function iniciarEscena() {
  const escena = document.getElementById("escena");
  const canvas = document.getElementById("frappe-canvas");
  const ctx = canvas.getContext("2d");
  const texto1 = document.getElementById("texto-1");
  const texto2 = document.getElementById("texto-2");
  const texto3 = document.getElementById("texto-3");
  const ingredientes = document.querySelectorAll(".ingredientes li");
  const final = document.querySelector(".escena-final");
  const hint = document.querySelector(".scroll-hint");

  // 1. Cargar todos los cuadros del video
  const cuadros = [];
  for (let i = 0; i < TOTAL_CUADROS; i++) {
    const img = new Image();
    img.src = rutaCuadro(i);
    cuadros.push(img);
  }

  let cuadroActual = 0;   // el que se ve
  let cuadroObjetivo = 0; // al que queremos llegar según el scroll

  // 2. Dibujar un cuadro en el canvas, centrado
  function dibujar() {
    const img = cuadros[Math.round(cuadroActual)];
    if (!img || !img.complete || !img.naturalWidth) return;
    const w = canvas.width;
    const h = canvas.height;
    const escala = Math.min((h * 0.7) / img.naturalHeight, (w * 1.45) / img.naturalWidth);
    const iw = img.naturalWidth * escala;
    const ih = img.naturalHeight * escala;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2 + h * 0.05, iw, ih);
  }

  // 3. Ajustar el canvas al tamaño de la pantalla (nítido en celulares)
  function ajustarCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    dibujar();
  }
  window.addEventListener("resize", ajustarCanvas);
  cuadros[0].addEventListener("load", ajustarCanvas);
  ajustarCanvas();

  // Muestra u oculta un elemento con fade y un pequeño desplazamiento
  function mostrar(el, valor) {
    el.style.opacity = valor;
    el.style.transform = `translateY(${(1 - valor) * 20}px)`;
  }

  // 4. Según qué tanto bajaste dentro de la escena (0 a 1), acomodar todo
  //    0.00 - 0.55  el frappé se desarma
  //    0.55 - 0.70  pausa para leer los ingredientes
  //    0.70 - 0.90  se vuelve a armar
  //    0.88 - 1.00  aparece el precio y el botón
  function actualizar() {
    const total = escena.offsetHeight - window.innerHeight;
    const p = Math.min(Math.max(-escena.getBoundingClientRect().top / total, 0), 1);

    let avance;
    if (p < 0.55) avance = rango(p, 0, 0.55);
    else if (p < 0.7) avance = 1;
    else avance = 1 - rango(p, 0.7, 0.9);
    cuadroObjetivo = avance * (TOTAL_CUADROS - 1);

    hint.style.opacity = 1 - rango(p, 0, 0.04);
    mostrar(texto1, 1 - rango(p, 0.05, 0.12));
    mostrar(texto2, rango(p, 0.12, 0.2) * (1 - rango(p, 0.7, 0.76)));
    mostrar(texto3, rango(p, 0.82, 0.9));

    ingredientes.forEach((li, i) => {
      const inicio = 0.25 + i * 0.05;
      mostrar(li, rango(p, inicio, inicio + 0.05) * (1 - rango(p, 0.68, 0.73)));
    });

    const visibleFinal = rango(p, 0.88, 0.95);
    mostrar(final, visibleFinal);
    final.style.pointerEvents = visibleFinal > 0.5 ? "auto" : "none";
  }

  // 5. Animación suave: el cuadro visible "persigue" al cuadro objetivo
  function animar() {
    const diferencia = cuadroObjetivo - cuadroActual;
    if (Math.abs(diferencia) > 0.05) {
      cuadroActual += diferencia * 0.18;
      dibujar();
    }
    requestAnimationFrame(animar);
  }

  window.addEventListener("scroll", actualizar, { passive: true });
  window.addEventListener("resize", actualizar);
  actualizar();
  animar();
}

// ---------- Carrusel de destacados ----------
function pintarDestacados() {
  carrusel.innerHTML = DESTACADOS.map((p) => `
    <article class="tarjeta" tabindex="0">
      <div class="tarjeta-inner">
        <div class="cara frente">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy"
               onerror="this.parentElement.classList.add('sin-foto'); this.replaceWith(document.createTextNode('${p.emoji}'))">
          <div class="frente-info">
            <h3>${p.nombre}</h3>
            <span>${formatoPrecio(p.precio)}</span>
          </div>
        </div>
        <div class="cara reverso">
          <div>
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
          </div>
          <div>
            <div class="precio-grande">${formatoPrecio(p.precio)}</div>
            <a class="btn-pedir" target="_blank" rel="noopener"
               href="${linkWhatsapp(`Hola Sunset Cafe, quiero pedir: ${p.nombre} 😊`)}">Pedir este</a>
          </div>
        </div>
      </div>
    </article>`).join("");

  carrusel.querySelectorAll(".tarjeta").forEach((tarjeta) => {
    tarjeta.addEventListener("click", (e) => {
      if (e.target.closest(".btn-pedir")) return;
      tarjeta.classList.toggle("volteada");
    });
    tarjeta.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tarjeta.classList.toggle("volteada");
    });
  });
}

// ---------- Categorías ----------
function pintarCategorias() {
  nav.innerHTML = MENU
    .map((cat) => `<a href="#${slug(cat.categoria)}" data-id="${slug(cat.categoria)}">${cat.emoji} ${cat.categoria}</a>`)
    .join("");
}

// ---------- Menú ----------
function pintarMenu(filtro = "") {
  const busqueda = normalizar(filtro.trim());
  contenedor.innerHTML = "";
  let total = 0;

  MENU.forEach((cat) => {
    const platillos = cat.platillos.filter((p) => normalizar(p.nombre).includes(busqueda));
    if (platillos.length === 0) return;
    total += platillos.length;

    const seccion = document.createElement("section");
    seccion.className = "categoria";
    seccion.id = slug(cat.categoria);
    seccion.innerHTML = `
      <h2>${cat.emoji} ${cat.categoria}</h2>
      <ul>
        ${platillos.map((p) => `
          <li class="platillo">
            <span class="nombre">${p.nombre}</span>
            <span class="precio ${p.precio ? "" : "pendiente"}">${formatoPrecio(p.precio)}</span>
          </li>`).join("")}
      </ul>`;
    contenedor.appendChild(seccion);
  });

  sinResultados.hidden = total > 0;
  observarSecciones();
}

// ---------- Animaciones del menú al hacer scroll ----------
const observadorAparecer = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observadorAparecer.unobserve(entrada.target);
    }
  });
}, { threshold: 0.1 });

const observadorActivo = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    nav.querySelectorAll("a").forEach((a) => a.classList.remove("activo"));
    const link = nav.querySelector(`[data-id="${entrada.target.id}"]`);
    if (link) {
      link.classList.add("activo");
      link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });
}, { rootMargin: "-140px 0px -60% 0px" });

function observarSecciones() {
  contenedor.querySelectorAll(".categoria").forEach((sec) => {
    observadorAparecer.observe(sec);
    observadorActivo.observe(sec);
  });
}

// ---------- Transición de cuadros (al tocar "Ver menú") ----------
const transicion = document.getElementById("transicion");

function crearCuadros() {
  const cols = window.innerWidth < 600 ? 5 : 10;
  const tamano = window.innerWidth / cols;
  const filas = Math.ceil(window.innerHeight / tamano);
  transicion.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  transicion.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
  transicion.innerHTML = '<div class="cuadro"></div>'.repeat(cols * filas);
  return { cols, filas, cuadros: transicion.querySelectorAll(".cuadro") };
}

function irConCuadros(destino) {
  const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!window.gsap || prefiereMenosMovimiento) {
    destino.scrollIntoView();
    return;
  }

  const { cols, filas, cuadros } = crearCuadros();
  const escalonado = { grid: [filas, cols], from: "start", axis: "x", amount: 0.45 };
  transicion.style.visibility = "visible";

  gsap.fromTo(cuadros, { scale: 0 }, {
    scale: 1.05,
    duration: 0.35,
    ease: "power2.in",
    stagger: escalonado,
    onComplete: () => {
      const y = destino.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "instant" });
      gsap.to(cuadros, {
        scale: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: escalonado,
        onComplete: () => { transicion.style.visibility = "hidden"; }
      });
    }
  });
}

document.querySelectorAll(".js-ir-menu").forEach((boton) => {
  boton.addEventListener("click", () => {
    const destino = document.querySelector(boton.dataset.destino);
    if (destino) irConCuadros(destino);
  });
});

// ---------- Eventos ----------
buscador.addEventListener("input", () => pintarMenu(buscador.value));

nav.addEventListener("click", () => {
  if (buscador.value) {
    buscador.value = "";
    pintarMenu();
  }
});

botonWhatsapp.href = linkWhatsapp(NEGOCIO.mensaje);

// ---------- Arranque ----------
iniciarEscena();
pintarDestacados();
pintarCategorias();
pintarMenu();
