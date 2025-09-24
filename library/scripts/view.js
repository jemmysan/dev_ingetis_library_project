// const Bibliotheque = {
//     livres: [],
//     utilisateurs: [],
//     emprunts: [],
//     prochainIdLivre: 1,
//     prochainIdUtilisateur: 1,
//     prochainIdEmprunt: 1,
//     stockLivre : 0
// };
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




// function mettreAJourDashboard() {
//     document.getElementById('total-livres').textContent = Bibliotheque.livres.length;
//     document.getElementById('total-utilisateurs').textContent = Bibliotheque.utilisateurs.length;
//     document.getElementById('total-emprunts').textContent = Bibliotheque.emprunts.filter(e => !e.dateRetour).length;
// }

// Initialisation
// document.addEventListener('DOMContentLoaded', function () {
//     mettreAJourDashboard();
// });






