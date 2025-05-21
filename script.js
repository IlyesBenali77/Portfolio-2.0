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

// Animation des compétences
window.addEventListener('scroll', () => {
  const skillBars = document.querySelectorAll('.skill-level');
  const skillsSection = document.querySelector('#skills');
  
  if (isElementInViewport(skillsSection)) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
        bar.style.transition = 'width 1s ease-in-out';
      }, 200);
    });
  }
});

// Vérifier si un élément est visible dans la fenêtre
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Animation au chargement de la page
window.addEventListener('load', () => {
  // Animation du titre principal
  const heroTitle = document.querySelector('.hero-text h1');
  const heroSubtitle = document.querySelector('.hero-text h2');
  const heroDescription = document.querySelector('.hero-text p');
  const heroButtons = document.querySelector('.hero-buttons');
  const heroImage = document.querySelector('.hero-image');
  
  heroTitle.style.animation = 'fadeInDown 1s ease forwards';
  heroSubtitle.style.animation = 'fadeInDown 1s ease 0.3s forwards';
  heroDescription.style.animation = 'fadeInDown 1s ease 0.6s forwards';
  heroButtons.style.animation = 'fadeInUp 1s ease 0.9s forwards';
  heroImage.style.animation = 'fadeIn 1s ease 1.2s forwards';
  
  // Ajouter des classes d'opacité initiale
  heroTitle.style.opacity = '0';
  heroSubtitle.style.opacity = '0';
  heroDescription.style.opacity = '0';
  heroButtons.style.opacity = '0';
  heroImage.style.opacity = '0';
});

// Animations au défilement
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer les sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'opacity 1s ease, transform 1s ease';
  observer.observe(section);
});

// Ajouter une classe d'animation lors de l'entrée dans le viewport
document.addEventListener('DOMContentLoaded', () => {
  const animateOnScroll = () => {
    document.querySelectorAll('section').forEach(section => {
      if (isElementInViewport(section) && !section.classList.contains('animate')) {
        section.classList.add('animate');
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
      if (isElementInViewport(card) && !card.classList.contains('animate')) {
        card.classList.add('animate');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initialiser les styles pour l'animation au scroll
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 1s ease, transform 1s ease';
  });
  
  // Déclencher l'animation au scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Déclencher une première fois au chargement
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