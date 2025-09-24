
// Variables globales


 const Bibliotheque = {
    livres: [],
    utilisateurs: [],
    emprunts: [],
    prochainIdLivre: 1,
    prochainIdUtilisateur: 1,
    prochainIdEmprunt: 1,
    stockLivre : 0
};

// Fonctions de gestion (à compléter avec votre logique)
function ajouterLivreViaFormulaire(event) {
    event.preventDefault();
    const titreLivre = document.getElementById('titre-livre').value;
    const auteurLivre = document.getElementById('auteur-livre').value;
    const isbnLivre = document.getElementById('isbn-livre').value;
    const anneeLivre = document.getElementById('annee-livre').value;
    const genreLivre = document.getElementById('genre-livre').value;
    const quantiteLivre = document.getElementById('quantite-livre').value;

    // Récupérer les valeurs du formulaire et appeler ajouterLivre()
    ajouterLivre(titreLivre, auteurLivre, isbnLivre, anneeLivre, genreLivre, quantiteLivre);

    console.log("Ajout de livre via formulaire");
    fermerModal('modal-livre');
}


function fermerModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}


function ouvrirModalAjoutLivre() {
    document.getElementById('modal-livre').classList.remove('hidden');
}


// Fontion ajout Livre
 function  ajouterLivre(titre, auteur, isbn, annee, genre, quantite){
    
    if(!titre || typeof(titre) !== 'string' || titre.trim() === ''){
        message('Le titre est obligatoire et doit être une chaîne non vide', false);
    }

    if(!auteur || typeof(auteur) !== 'string' || auteur.trim() === ''){
        message('Le nom de l\'auteur est obligatoire et doit être une chaîne non vide', false);
    }

    const isbnRegex = /^\d{3}-\d-\d{2}-\d{6}-\d$/;

    if(!isbnRegex.test(isbn)){
        message('Format ISBN invalide. Format attendu: XXX-X-XX-XXXXXX-X', false)
    }

    if(!annee || typeof(annee) !== 'number' || annee <0 || annee > new Date().getFullYear()){
        message('L\'année doit être un nombre valide', false);
    }

    if(!genre || typeof(genre) !== 'string' || genre.trim() ===''){
        message('Le genre est obligatoire', false);
    }

    if(!quantite || typeof(quantite) !=='number' || quantite <=0 ){
        message('La quantité doit être un nombre positif et au moins égale à 1', false);
    }

    const livreExistant = Bibliotheque.livres.find(livre => livre.isbn === isbn);

    if(livreExistant) {
        message('Ce livre extiste déjà', false);    
    }
    
    const nouveauLivre = {
        id : Bibliotheque.prochainIdLivre,
        titre : titre.trim(),
        auteur : auteur.trim(),
        isbn : isbn,
        annee : annee,
        genre : genre.trim(),
        quanteDisponible: 0,
        quantiteTotal : quantite,
        dateAjout: new Date().toISOString().split('T')[0] 
    }

    Bibliotheque.livres.push(nouveauLivre);
    Bibliotheque.prochainIdLivre++;
    Bibliotheque.stockLivre++;
    
    message('Livre ajouté avec succès', true)
    console.log(Bibliotheque);
}


function message(message, status){
    return {
        success : status,
        message : message
    }
}