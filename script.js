// Variables globales
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');
const scrollDownBtn = document.querySelector('.scroll-down a');

// Menu mobile
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Animation des barres du menu hamburger
  const bars = document.querySelectorAll('.bar');
  if (menuToggle.classList.contains('active')) {
    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// Fermer le menu mobile lorsqu'un lien est cliqué
navItems.forEach(item => {
  item.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    
    // Réinitialiser les barres du menu hamburger
    const bars = document.querySelectorAll('.bar');
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  });
});

// Modifier le header au scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.style.height = '70px';
    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.height = '80px';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
  
  // Mise à jour du lien actif dans le menu
  updateActiveNavLink();
});

// Mise à jour du lien actif dans le menu en fonction de la section visible
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 300;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Supprimer la classe active de tous les liens
      navItems.forEach(link => link.classList.remove('active'));
      
      // Ajouter la classe active au lien correspondant à la section visible
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

// Animation du bouton de défilement vers le bas
scrollDownBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const targetId = scrollDownBtn.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  window.scrollTo({
    top: targetSection.offsetTop,
    behavior: 'smooth'
  });
});

// S'assurer que les liens du portfolio fonctionnent correctement
document.addEventListener('DOMContentLoaded', () => {
  // Récupérer tous les liens dans les project-links
  const projectLinks = document.querySelectorAll('.project-links a');
  
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Si ce n'est pas un lien interne (commençant par #), laisser le comportement par défaut
      if (href && !href.startsWith('#')) {
        // Ne pas bloquer la navigation pour les liens externes
        return true;
      }
      
      // Pour les liens internes, appliquer le comportement de défilement doux
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// Vérifier si un élément est visible dans la fenêtre
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Supprimer les animations qui causent le délai d'affichage
document.addEventListener('DOMContentLoaded', () => {
  // Rendre tous les éléments immédiatement visibles
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
  });
  
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
  
  // Rendre les éléments du hero immédiatement visibles
  const heroElements = [
    document.querySelector('.hero-text h1'),
    document.querySelector('.hero-text h2'),
    document.querySelector('.hero-text p'),
    document.querySelector('.hero-buttons'),
    document.querySelector('.hero-image')
  ];
  
  heroElements.forEach(el => {
    if (el) {
      el.style.opacity = '1';
      el.style.animation = 'none';
    }
  });
});

// Ajouter des animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style); 