// Seleciona o ícone do menu e os links de navegação
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Animação e transição para navbar mobile
menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('menu-active');
});

// Seleciona todos os links de navegação
const navItems = document.querySelectorAll('#nav-links li a');

// Adiciona evento de clique em cada item de navegação
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Fecha o menu removendo a classe 'menu-active'
        navLinks.classList.remove('menu-active');
    });
});
