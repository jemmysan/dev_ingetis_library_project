

// Fonctions d'affichage
function afficherSection(sectionId) {
    // Cacher toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    // Désactiver tous les boutons de navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-blue-700');
    });

    // Afficher la section demandée
    document.getElementById(sectionId).classList.remove('hidden');

    // Activer le bouton correspondant
    event.target.classList.add('bg-blue-700');

    // Mettre à jour les données si nécessaire
    if (sectionId === 'dashboard') {
        mettreAJourDashboard();
    }
}

function ouvrirModalAjoutLivre() {
    document.getElementById('modal-livre').classList.remove('hidden');
}

function fermerModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Fonctions de gestion (à compléter avec votre logique)
function ajouterLivreViaFormulaire(event) {
    event.preventDefault();
    // Récupérer les valeurs du formulaire et appeler ajouterLivre()
    console.log("Ajout de livre via formulaire");
    fermerModal('modal-livre');
}

function mettreAJourDashboard() {
    document.getElementById('total-livres').textContent = bibliotheque.livres.length;
    document.getElementById('total-utilisateurs').textContent = bibliotheque.utilisateurs.length;
    document.getElementById('total-emprunts').textContent = bibliotheque.emprunts.filter(e => !e.dateRetour).length;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    mettreAJourDashboard();
});






