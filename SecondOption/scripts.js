/* Carrossel */
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 5000); // Muda a imagem a cada 5 segundos
}

function plusSlides(n) {
    slideIndex += n - 1;
    showSlides();
}

/* Modais */
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

/* Navegação com destaque */
window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(function(section, index) {
        if(window.scrollY >= section.offsetTop - 70) {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            navLinks[index].classList.add('active');
        }
    });
});

/* Formulário de Contato */
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Obrigado por entrar em contato! Em breve retornaremos.');
    // Aqui você pode adicionar a integração com o backend ou serviço de e-mail.
});
