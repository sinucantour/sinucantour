// Navegación entre pestañas
const tabs = document.querySelectorAll('.nav-links a');
const contents = document.querySelectorAll('.tab-content');
let currentTabIndex = 0;

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        console.log(`Clic en pestaña: ${tab.getAttribute('data-tab')}, índice: ${index}`); // Depuración
        updateTab(index);
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

function updateTab(index) {
    tabs.forEach(t => t.classList.remove('active'));
    tabs[index].classList.add('active');
    contents.forEach(content => content.classList.remove('active'));
    contents[index].classList.add('active');
    currentTabIndex = index;
    console.log(`Pestaña activa: ${contents[index].id}`); // Depuración
}

// Menú hamburguesa para móviles
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    console.log('Menú hamburguesa toggled'); // Depuración
});



// Botones de navegación
const navButtons = document.getElementById('nav-buttons');

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('Scroll to top'); // Depuración
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    console.log('Scroll to bottom'); // Depuración
}

function prevTab() {
    if (currentTabIndex > 0) {
        updateTab(currentTabIndex - 1);
        console.log('Pestaña anterior'); // Depuración
    }
}

function nextTab() {
    if (currentTabIndex < tabs.length - 1) {
        updateTab(currentTabIndex + 1);
        console.log('Pestaña siguiente'); // Depuración
    }
}

// Mostrar/ocultar botones según la posición del scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    if (scrollPosition < 50 || scrollPosition + windowHeight >= documentHeight - 50) {
        navButtons.classList.add('active');
    } else {
        navButtons.classList.remove('active');
    }
});

// Control del banner
let slideIndex = 0;
const slides = document.getElementById('slides');
const totalSlides = slides.children.length;

function prevSlide() {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : totalSlides - 1;
    updateSlide();
    resetAutoSlide();
    console.log('Slide anterior'); // Depuración
}

function nextSlide() {
    slideIndex = (slideIndex < totalSlides - 1) ? slideIndex + 1 : 0;
    updateSlide();
    resetAutoSlide();
    console.log('Slide siguiente'); // Depuración
}

function updateSlide() {
    slides.style.transform = `translateX(-${slideIndex * 33.33}%)`;
}

function autoSlide() {
    slideIndex = (slideIndex < totalSlides - 1) ? slideIndex + 1 : 0;
    updateSlide();
}

let autoSlideInterval = setInterval(autoSlide, 5000);

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
}

// Parallax en el banner
const banner = document.querySelector('.banner');
banner.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    slides.style.transform = `translateX(-${slideIndex * 33.33}%) translate(${x}px, ${y}px)`;
});
banner.addEventListener('mouseleave', () => {
    slides.style.transform = `translateX(-${slideIndex * 33.33}%)`;
});

// Verificación inicial
console.log('JavaScript cargado');
console.log(`Tabs encontrados: ${tabs.length}`);
console.log(`Contents encontrados: ${contents.length}`);

// Generar automáticamente cantidades del 1 al 100
document.querySelectorAll('.cantidad-select').forEach(select => {
  for (let i = 1; i <= 100; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
});

// Actualiza el total en pantalla
function actualizarTotal(select) {
  const cantidad = parseInt(select.value);
  const precio = parseInt(select.dataset.precio);
  const total = cantidad * precio;
  const totalElement = select.closest('.food-options').querySelector('.total');
  totalElement.textContent = `Total: $${total.toLocaleString()}`;
}

// Botón "Seleccionar" redirige a WhatsApp con producto, cantidad y total
function ordenarPorWhatsApp(producto, boton) {
  const cantidad = parseInt(boton.parentElement.querySelector('.cantidad-select').value);
  const precio = parseInt(boton.parentElement.querySelector('.cantidad-select').dataset.precio);
  const total = cantidad * precio;
  const mensaje = `¡Hola! Quiero pedir ${cantidad} unidad(es) de: ${producto}\nTotal: $${total.toLocaleString()} COP`;
  const url = `https://wa.me/573235882174?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
// 🛍️ Carrito de compras
let carrito = [];

function actualizarTotal(selectElement) {
  const producto = selectElement.closest('.food-item');
  const nombre = producto.querySelector('h3').innerText;
  const precio = parseInt(producto.querySelector('.price').innerText.replace(/\D/g, ''));
  const cantidad = parseInt(selectElement.value);

  // Buscar si ya está en el carrito
  const existente = carrito.find(item => item.nombre === nombre);
  if (existente) {
    existente.cantidad = cantidad;
    existente.total = cantidad * precio;
  } else {
    carrito.push({ nombre, cantidad, total: cantidad * precio });
  }

  renderizarCarrito();
}

function renderizarCarrito() {
  const lista = document.getElementById('carrito-lista');
  const totalElement = document.getElementById('total-pedido');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.nombre} x ${item.cantidad} = $${item.total.toLocaleString()}`;
    lista.appendChild(li);
    total += item.total;
  });

  totalElement.innerText = `Total: $${total.toLocaleString()}`;
}

function mostrarCarrito() {
  const bloque = document.getElementById('carrito-bloque');
  bloque.classList.toggle('visible');
}

function ordenarPorWhatsApp(boton) {
  const producto = boton.closest('.food-item');
  const nombre = producto.querySelector('h3').innerText;
  const precio = parseInt(producto.querySelector('.price').innerText.replace(/\D/g, ''));
  const cantidad = parseInt(producto.querySelector('.cantidad-select').value);
  const total = cantidad * precio;

  const mensaje = `¡Hola! Quiero pedir ${cantidad} unidad(es) de: ${nombre} por un total de $${total.toLocaleString()}`;
  const url = `https://wa.me/573235882174?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) return;

  let mensaje = "¡Hola! Quiero hacer un pedido:\n\n";
  carrito.forEach(item => {
    mensaje += `🦴 ${item.nombre} x ${item.cantidad} = $${item.total.toLocaleString()}\n`;
  });

  const total = carrito.reduce((acc, item) => acc + item.total, 0);
  mensaje += `\n🧾 Total: $${total.toLocaleString()}`;

  const url = `https://wa.me/573235882174?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
