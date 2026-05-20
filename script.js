/**
 * Gusta Tech Assistência - Script Oficial Completo
 */

// Alternância inteligente de Páginas (SPA)
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const activeLink = document.querySelector(`nav a[href="#${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Fecha menu hambúrguer no mobile após clique
    document.getElementById('navMenu').classList.remove('open');
}

// Controle do Menu Mobile e Popup de Anúncio Inicial
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('open');
            }
        });
    }

    // DISPARA O POPUP DE ANÚNCIO ASSIM QUE O SITE ABRE
    setTimeout(() => {
        const popup = document.getElementById('announcementPopup');
        if (popup) popup.classList.add('show');
    }, 800); // Abre 0.8 segundos após o carregamento
});

// Funções para fechar o Popup
function closePopup() {
    const popup = document.getElementById('announcementPopup');
    if (popup) popup.classList.remove('show');
}

// Lógica do Carrossel de Fotos "Nossos Reparos Reais"
let currentSlideIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    // Desativa slide atual
    slides[currentSlideIndex].classList.remove('active');

    // Calcula próximo índice
    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Ativa novo slide
    slides[currentSlideIndex].classList.add('active');
}

// Vincula a ação do botão "Solicitar" dos pré-orçamentos diretamente à página de formulário
function orderService(brand, modelName) {
    switchPage('orcamento');
    
    const marcaInput = document.getElementById('marca');
    const modeloInput = document.getElementById('modelo');
    
    if (marcaInput) marcaInput.value = brand;
    if (modeloInput) modeloInput.value = modelName;
}

// Manipulação do Formulário de Orçamento Completo e Redirecionamento API WhatsApp
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const marca = document.getElementById('marca').value.trim();
        const modelo = document.getElementById('modelo').value.trim();
        const defeito = document.getElementById('defeito').value.trim();
        const descricao = document.getElementById('descricao').value.trim();
        
        const numeroWhatsApp = "5511948990655";
        
        let message = `Olá, gostaria de solicitar um Orçamento Técnico na Gusta Tech:%0A%0A` +
                       `*Cliente:* ${encodeURIComponent(nome)}%0A` +
                       `*Marca:* ${encodeURIComponent(marca)}%0A` +
                       `*Modelo:* ${encodeURIComponent(modelo)}%0A` +
                       `*Serviço/Defeito:* ${encodeURIComponent(defeito)}%0A`;
                       
        if (descricao) {
            message += `*Detalhes Adicionais:* ${encodeURIComponent(descricao)}%0A`;
        }
        
        message += `%0A_Enviado através do site oficial Gusta Tech Assistência._`;
        
        const urlFinal = `https://wa.me/${numeroWhatsApp}?text=${message}`;
        window.open(urlFinal, '_blank', 'noopener,noreferrer');
    });
}

// Acordeon do FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('open');
    });
});

// Escuta a Hash inicial da URL para carregar na página solicitada
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'servicos', 'pre-orcamentos', 'orcamento', 'sobre', 'contato'];
    if (hash && validPages.includes(hash)) {
        switchPage(hash);
    } else {
        switchPage('home');
    }
});

