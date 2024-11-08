// Aguarda o carregamento completo da página
window.addEventListener('load', function() {
    // Remove o preloader
    document.getElementById('preloader').style.display = 'none';
});

// Menu Mobile
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuIcon.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Slick Carousel para o Banner Principal
$(document).ready(function(){
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        fade: true,
        cssEase: 'linear'
    });

    // Slick Carousel para Parceiros
    $('.parceiros-carousel').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1
              }
            }
        ]
    });
});

// Inicialização do AOS (Animate on Scroll)
AOS.init();

// Formulário de Orçamento
const orcamentoForm = document.getElementById('orcamento-form');
const formMensagem = document.getElementById('form-mensagem');

orcamentoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulação de envio do formulário
    formMensagem.textContent = 'Obrigado! Seu orçamento foi enviado com sucesso.';
    orcamentoForm.reset();
});

// Formulário de Contato
const contatoForm = document.getElementById('contato-form');

contatoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulação de envio do formulário
    alert('Obrigado! Sua mensagem foi enviada com sucesso.');
    contatoForm.reset();
});

// Atualização dos links do navbar conforme o scroll
const navLinks = document.querySelectorAll('.nav-links a');

function updateNavLinks() {
    const fromTop = window.scrollY;

    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);

        if (
            section.offsetTop <= fromTop + 100 &&
            section.offsetTop + section.offsetHeight > fromTop + 100
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateNavLinks);
updateNavLinks();
