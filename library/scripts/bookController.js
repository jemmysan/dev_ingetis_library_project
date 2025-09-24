// Variables globales
const Bibliotheque = {
    livres: [],
    utilisateurs: [],
    emprunts: [],
    prochainIdLivre: 1,
    prochainIdUtilisateur: 1,
    prochainIdEmprunt: 1,
    stockLivre: 0
};

// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', function() {
    chargerBibliotheque();
    afficherLivres();
    console.log('Bibliothèque chargée:', Bibliotheque);
});

// Fonction pour charger les données existantes
function chargerBibliotheque() {
    const data = localStorage.getItem('Bibliotheque');
    if (data) {
        try {
            const savedData = JSON.parse(data);
            // Fusionner avec l'objet Bibliotheque actuel
            Object.assign(Bibliotheque, savedData);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    }
}

// Fonction pour sauvegarder
function sauvegarderBibliotheque() {
    localStorage.setItem('Bibliotheque', JSON.stringify(Bibliotheque));
}

// Fonction pour afficher un message
function message(text, isSuccess) {
    const color = isSuccess ? 'green' : 'red';
    console.log(`%c${text}`, `color: ${color}; font-weight: bold;`);
    
    // Notification visuelle
    const notification = document.createElement('div');
    notification.textContent = text;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px;
        background: ${isSuccess ? '#d4edda' : '#f8d7da'};
        color: ${isSuccess ? '#155724' : '#721c24'};
        border: 1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'};
        border-radius: 5px;
        z-index: 1000;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 10000);
}

// Fonction ajout Livre
function ajouterLivre(titre, auteur, isbn, annee, genre, quantite) {
    // Validation
    if (!titre || typeof titre !== 'string' || titre.trim() === '') {
        message('Le titre est obligatoire et doit être une chaîne non vide', false);
        return false;
    }

    if (!auteur || typeof auteur !== 'string' || auteur.trim() === '') {
        message('Le nom de l\'auteur est obligatoire et doit être une chaîne non vide', false);
        return false;
    }

    const isbnRegex = /^\d{3}-\d-\d{2}-\d{6}-\d$/;
    if (!isbnRegex.test(isbn)) {
        message('Format ISBN invalide. Format attendu: XXX-X-XX-XXXXXX-X', false);
        return false;
    }

    // Convertir en nombre
    annee = parseInt(annee);
    quantite = parseInt(quantite);

    if (!annee || isNaN(annee) || annee < 0 || annee > new Date().getFullYear()) {
        message('L\'année doit être un nombre valide', false);
        return false;
    }

    if (!genre || typeof genre !== 'string' || genre.trim() === '') {
        message('Le genre est obligatoire', false);
        return false;
    }

    if (!quantite || isNaN(quantite) || quantite <= 0) {
        message('La quantité doit être un nombre positif et au moins égale à 1', false);
        return false;
    }

    // Vérifier si le livre existe déjà
    const livreExistant = Bibliotheque.livres.find(livre => livre.isbn === isbn);
    if (livreExistant) {
        message('Ce livre existe déjà', false);
        return false;
    }

    // Créer le nouveau livre
    const nouveauLivre = {
        id: Bibliotheque.prochainIdLivre,
        titre: titre.trim(),
        auteur: auteur.trim(),
        isbn: isbn,
        annee: annee,
        genre: genre.trim(),
        quantiteDisponible: quantite,
        quantiteTotal: quantite,
        dateAjout: new Date().toISOString().split('T')[0],
        disponible: true
    };

    // Ajouter au tableau
    Bibliotheque.livres.push(nouveauLivre);
    Bibliotheque.prochainIdLivre++;
    Bibliotheque.stockLivre += quantite;

    // Sauvegarder
    sauvegarderBibliotheque();
    
    message('Livre ajouté avec succès!', true);
    
    // Mettre à jour l'affichage
    afficherLivres();
    return true;
}

// Fonction d'ajout via formulaire
function ajouterLivreViaFormulaire(event) {
    event.preventDefault();
    
    const titreLivre = document.getElementById('titre-livre').value;
    const auteurLivre = document.getElementById('auteur-livre').value;
    const isbnLivre = document.getElementById('isbn-livre').value;
    const anneeLivre = document.getElementById('annee-livre').value;
    const genreLivre = document.getElementById('genre-livre').value;
    const quantiteLivre = document.getElementById('quantite-livre').value;

    if (ajouterLivre(titreLivre, auteurLivre, isbnLivre, anneeLivre, genreLivre, quantiteLivre)) {
        fermerModal('modal-livre');
        document.getElementById('form-livre').reset();
    }
}

// Fonction pour afficher les livres
function afficherLivres() {
    const container = document.getElementById("liste-livres");
    
    if (!Bibliotheque.livres || Bibliotheque.livres.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-book-open text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Aucun livre dans la bibliothèque</p>
            </div>
        `;
        return;
    }

    container.innerHTML = Bibliotheque.livres.map(livre => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-lg font-semibold text-gray-800 truncate">${livre.titre}</h3>
                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${livre.genre}</span>
                </div>
                
                <p class="text-gray-600 mb-2"><i class="fas fa-user-pen text-gray-400 mr-2"></i>${livre.auteur}</p>
                <p class="text-gray-600 mb-2"><i class="fas fa-calendar text-gray-400 mr-2"></i>${livre.annee}</p>
                <p class="text-gray-600 mb-3"><i class="fas fa-barcode text-gray-400 mr-2"></i>${livre.isbn}</p>
                
                <div class="flex justify-between items-center mt-4">
                    <span class="text-sm font-medium ${livre.quantiteDisponible > 0 ? 'text-green-600' : 'text-red-600'}">
                        <i class="fas fa-copy mr-1"></i>${livre.quantiteDisponible}/${livre.quantiteTotal} disponible(s)
                    </span>
                    <span class="text-xs px-2 py-1 rounded-full ${livre.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${livre.disponible ? 'Disponible' : 'Indisponible'}
                    </span>
                </div>
                
                <div class="flex space-x-2 mt-4">
                    <button onclick="emprunterLivre(${livre.id})" 
                            class="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors ${!livre.disponible ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${!livre.disponible ? 'disabled' : ''}>
                        <i class="fas fa-hand-holding mr-1"></i>Emprunter
                    </button>
                    <button onclick="modifierLivre(${livre.id})" 
                            class="bg-gray-500 text-white py-2 px-3 rounded text-sm hover:bg-gray-600 transition-colors">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="supprimerLivre(${livre.id})" 
                            class="bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Fonctions modales
function fermerModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function ouvrirModalAjoutLivre() {
    document.getElementById('modal-livre').classList.remove('hidden');
}

// Fonctions de gestion des livres
function emprunterLivre(id) {
    console.log("Emprunter livre ID:", id);
    // Votre logique d'emprunt
}

function modifierLivre(id) {
    console.log("Modifier livre ID:", id);
    // Votre logique de modification
}

function supprimerLivre(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
        const index = Bibliotheque.livres.findIndex(livre => livre.id === id);
        if (index !== -1) {
            const livre = Bibliotheque.livres[index];
            Bibliotheque.stockLivre -= livre.quantiteTotal;
            Bibliotheque.livres.splice(index, 1);
            sauvegarderBibliotheque();
            afficherLivres();
            message('Livre supprimé avec succès!', true);
        }
    }
}