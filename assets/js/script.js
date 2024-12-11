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

    // Tratamento de flip para touch devices
    if ('ontouchstart' in window) {
        let touchStartTime;
        $('.produto-card').on('touchstart', function(e) {
            touchStartTime = new Date().getTime();
            e.preventDefault();
        }).on('touchend', function(e) {
            const touchEndTime = new Date().getTime();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Apenas flip se for um toque rápido (menos de 200ms)
            if (touchDuration < 200) {
                $(this).find('.produto-card-inner').toggleClass('touched');
            }
            e.preventDefault();
        });
    }
});


// Inicialização do AOS (Animate on Scroll)
AOS.init();


// Inicialização do EmailJS com sua chave pública
emailjs.init("GgrFQD9UOLYdYJWum"); 

// Selecionar ambos os formulários pelo ID
const forms = document.querySelectorAll('#orcamento-form, #contato-form');

// Função de validação do formulário
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

// Função genérica para lidar com o envio do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    if (validateForm(form)) {
        // Coletar os dados do formulário
        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            mensagem: formData.get('mensagem')
        };

                // Enviar o e-mail usando EmailJS
        emailjs.send('service_66x94oe', 'template_lkmi05m', { 
            from_name: data.nome,
            from_email: data.email,
            phone: data.telefone,
            message: data.mensagem
        })
        .then(function() {
            // Selecionar o elemento de mensagem dentro do formulário
            const messageElement = form.querySelector('.form-mensagem');
            if(messageElement){
                // Personalizar a mensagem de sucesso com base no formulário
                if(form.id === 'orcamento-form'){
                    messageElement.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve!';
                } else {
                    messageElement.textContent = 'Mensagem enviada com sucesso! Obrigado por entrar em contato.';
                }
                messageElement.style.color = 'green';
            } else {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            }
            form.reset();
        })
        .catch(function(error) {
            const messageElement = form.querySelector('.form-mensagem');
            if(messageElement){
                messageElement.textContent = 'Erro ao enviar. Por favor, tente novamente.';
                messageElement.style.color = 'red';
            } else {
                alert('Erro ao enviar. Por favor, tente novamente.');
            }
            console.error('Erro:', error);
        });

    }
}

// Adicionar o event listener de submit para cada formulário
forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
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

// Inicialização dos modais
$('.custom-modal').on('show.bs.modal', function () {
    // Reset scroll position
    $(this).find('.modal-body').scrollTop(0);
});

// Fechar modal com ESC
$(document).keydown(function(e) {
    if (e.keyCode === 27) {
        $('.custom-modal').modal('hide');
    }
});

// Prevenir propagação de cliques dentro do modal
$('.custom-modal').on('click', function(e) {
    if ($(e.target).hasClass('custom-modal')) {
        $(this).modal('hide');
    }
});
