// Navegación entre pestañas
const tabs = document.querySelectorAll('.nav-links a');
const contents = document.querySelectorAll('.tab-content');
let currentTabIndex = 0;

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        updateTab(index);
        if (window.innerWidth <= 768) navLinks.classList.remove('active');
    });
});

function updateTab(index) {
    tabs.forEach(t => t.classList.remove('active'));
    tabs[index].classList.add('active');
    contents.forEach(content => content.classList.remove('active'));
    contents[index].classList.add('active');
    currentTabIndex = index;
}

// Menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// Botones de navegación
const navButtons = document.getElementById('nav-buttons');
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function scrollToBottom() { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }
function prevTab() { if (currentTabIndex > 0) updateTab(currentTabIndex - 1); }
function nextTab() { if (currentTabIndex < tabs.length - 1) updateTab(currentTabIndex + 1); }

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    navButtons.classList.toggle('active', scrollPosition < 50 || scrollPosition + windowHeight >= documentHeight - 50);
});

// Banner automático
let slideIndex = 0;
const slides = document.getElementById('slides');
if (slides) {
    const totalSlides = slides.children.length;
    function updateSlide() { slides.style.transform = `translateX(-${slideIndex * 33.33}%)`; }
    function autoSlide() { slideIndex = (slideIndex < totalSlides - 1) ? slideIndex + 1 : 0; updateSlide(); }
    function resetAutoSlide() { clearInterval(autoSlideInterval); autoSlideInterval = setInterval(autoSlide, 5000); }
    let autoSlideInterval = setInterval(autoSlide, 5000);
    function prevSlide() { slideIndex = (slideIndex > 0) ? slideIndex - 1 : totalSlides - 1; updateSlide(); resetAutoSlide(); }
    function nextSlide() { slideIndex = (slideIndex < totalSlides - 1) ? slideIndex + 1 : 0; updateSlide(); resetAutoSlide(); }

    // Parallax
    const banner = document.querySelector('.banner');
    banner.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        slides.style.transform = `translateX(-${slideIndex * 33.33}%) translate(${x}px, ${y}px)`;
    });
    banner.addEventListener('mouseleave', () => updateSlide());
}

// ================== 🛒 CARRITO ==================
let carrito = [];

function agregarAlCarrito(boton) {
  const producto = boton.closest('.food-item');
  const nombre = producto.querySelector('h3').innerText;
  const precio = parseInt(producto.querySelector('.price').dataset.precio);
  const cantidad = parseInt(producto.querySelector('.cantidad-select').value);

  const existente = carrito.find(item => item.nombre === nombre);
  if (existente) {
    existente.cantidad += cantidad;
    existente.total = existente.cantidad * precio;
  } else {
    carrito.push({ nombre, cantidad, total: cantidad * precio });
  }
  renderizarCarrito();
}

function renderizarCarrito() {
  const lista = document.getElementById('carrito-lista');
  const totalElement = document.getElementById('total-pedido');
  const contador = document.getElementById('contador-carrito');

  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} x ${item.cantidad} = $${item.total.toLocaleString()}
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">❌</button>
    `;
    lista.appendChild(li);
    total += item.total;
  });

  totalElement.textContent = `Total: $${total.toLocaleString()}`;
  contador.textContent = carrito.length;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  renderizarCarrito();
}

function toggleCarrito() {
  document.getElementById('carrito-contenido').classList.toggle('visible');
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) return;

  let mensaje = "¡Hola! Quiero hacer el siguiente pedido:\n\n";
  carrito.forEach(item => {
    mensaje += `🦴 ${item.nombre} x ${item.cantidad} = $${item.total.toLocaleString()}\n`;
  });

  const total = carrito.reduce((acc, item) => acc + item.total, 0);
  mensaje += `\n🧾 Total: $${total.toLocaleString()}`;

  const url = `https://wa.me/573235882174?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// Mostrar carrito solo en FOOD
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cantidad-select').forEach(select => {
    for (let i = 1; i <= 100; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
  });

  // Mostrar el carrito solo cuando se está en FOOD
  const carritoFlotante = document.getElementById('carrito-flotante');
  const tabs = document.querySelectorAll('.nav-links a');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      carritoFlotante.style.display = contents[index].id === 'food' ? 'block' : 'none';
    });
  });
});
