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