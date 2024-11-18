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
    $('.slick-carousel').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        dots: true,
        fade: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
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

    // Produtos Carousel
    $('.produtos-container').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px'
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

// Add form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });
    
    return isValid;
}

// Update form handlers
orcamentoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm(this)) {
        formMensagem.textContent = 'Obrigado! Seu orçamento foi enviado com sucesso.';
        this.reset();
    }
});

// Formulário de Contato
const contatoForm = document.getElementById('contato-form');

contatoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm(this)) {
        alert('Obrigado! Sua mensagem foi enviada com sucesso.');
        this.reset();
    }
});

// Atualização dos links do navbar conforme o scroll
const navLinks = document.querySelectorAll('.nav-links a');

function isMobile() {
    return window.innerWidth <= 768; // Define mobile breakpoint at 768px
}

function updateNavLinks() {
    // Don't update nav links if on mobile
    if (isMobile()) return;

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

// Add resize event listener to handle orientation changes
window.addEventListener('resize', () => {
    if (isMobile()) {
        // Remove all active classes when switching to mobile
        navLinks.forEach(link => link.classList.remove('active'));
    } else {
        // Update links when switching back to desktop
        updateNavLinks();
    }
});

window.addEventListener('scroll', updateNavLinks);
updateNavLinks();
