// Configuration globale
const config = {
    theme: 'light',
    animations: true
};

// Éléments DOM
const elements = {
    themeToggle: document.getElementById('themeToggle'),
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('.section'),
    skills: document.querySelectorAll('.skill'),
    projectBtns: document.querySelectorAll('.project-btn'),
    projectModal: document.getElementById('projectModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalDescription: document.getElementById('modalDescription'),
    closeModal: document.querySelector('.close'),
    contactForm: document.getElementById('contactForm'),
    profilePhoto: document.getElementById('profilePhoto'),
    photoOverlay: document.getElementById('photoOverlay')
};

// Données des projets
const projectsData = {
    1: {
        title: "Application E-commerce",
        description: "Développement d'une plateforme e-commerce complète avec React en frontend et Node.js en backend. Fonctionnalités incluant le panier, paiement sécurisé, et gestion des commandes."
    },
    2: {
        title: "Dashboard Analytics",
        description: "Création d'un tableau de bord interactif pour la visualisation de données avec Chart.js. Intégration d'APIs REST et mise en place de filtres avancés."
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initSkillsAnimation();
    initProjects();
    initContactForm();
    initPhotoUpload();
});

// Gestion du thème
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    elements.themeToggle.addEventListener('click', function() {
        const newTheme = config.theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    config.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    elements.themeToggle.textContent = theme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair';
}

// Navigation
function initNavigation() {
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens
            elements.navLinks.forEach(l => l.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Masquer toutes les sections
            elements.sections.forEach(section => section.classList.remove('active'));
            
            // Afficher la section correspondante
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Animation des compétences si on arrive sur cette section
                if (targetId === 'competences') {
                    animateSkills();
                }
            }
        });
    });
}

// Animation des compétences
function initSkillsAnimation() {
    // Observer pour déclencher l'animation quand la section devient visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('competences');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkills() {
    elements.skills.forEach(skill => {
        const level = skill.getAttribute('data-level');
        const progressBar = skill.querySelector('.skill-progress');
        
        if (progressBar.style.width === '') {
            setTimeout(() => {
                progressBar.style.width = level + '%';
            }, 200);
        }
    });
}

// Gestion des projets
function initProjects() {
    // Boutons des projets
    elements.projectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });

    // Fermeture de la modal
    elements.closeModal.addEventListener('click', closeProjectModal);
    
    // Fermeture en cliquant en dehors
    elements.projectModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal();
        }
    });

    // Fermeture avec ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function showProjectModal(projectId) {
    const project = projectsData[projectId];
    if (project) {
        elements.modalTitle.textContent = project.title;
        elements.modalDescription.textContent = project.description;
        elements.projectModal.style.display = 'block';
        
        // Animation d'entrée
        setTimeout(() => {
            elements.projectModal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }
}

function closeProjectModal() {
    const modalContent = elements.projectModal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        elements.projectModal.style.display = 'none';
    }, 300);
}

// Formulaire de contact
function initContactForm() {
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message envoyé avec succès !');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Upload de photo (simulation)
function initPhotoUpload() {
    if (elements.photoOverlay) {
        elements.photoOverlay.addEventListener('click', function() {
            // Créer un input file caché
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        elements.profilePhoto.src = e.target.result;
                        
                        // Animation de confirmation
                        elements.profilePhoto.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            elements.profilePhoto.style.transform = 'scale(1)';
                        }, 300);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
    }
}

// Effets visuels supplémentaires
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.project-card, .education-item');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        
        const distanceX = Math.abs(e.clientX - cardX);
        const distanceY = Math.abs(e.clientY - cardY);
        
        if (distanceX < 200 && distanceY < 200) {
            const tiltX = (mouseY - 0.5) * 10;
            const tiltY = (mouseX - 0.5) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });
});

// Animation au scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelector('.header').style.transform = `translateY(${rate * 0.5}px)`;
});

// Fonction utilitaire pour les animations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}