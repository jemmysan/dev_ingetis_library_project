
// Variables globales
const bibliotheque = {
    livres: [],
    utilisateurs: [],
    emprunts: [],
    prochainIdLivre: 1,
    prochainIdUtilisateur: 1,
    prochainIdEmprunt: 1
};



// Fontion ajout Livre
function  ajouterLivre(titre, auteur, isbn, annee, genre){
    
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
        message('Le genre est obligatoire');
    }

    const livreExistant = bibliotheque.livres.find(livre => livre.isbn === isbn);

    if(livreExistant) {
        message('Ce livre extiste déjà', false);    
    }
    
    const nouveauLivre = {
        id : bibliotheque.prochainIdLivre,
        titre : titre.trim(),
        auteur : auteur.trim(),
        isbn : isbn,
        annee : annee,
        genre : genre.trim(),
        disponible: true,
        dateAjout: new Date().toISOString().split('T')[0] 
    }

    bibliotheque.livres.push(nouveauLivre);
    bibliotheque.prochainIdLivre++;
    
    message('Livre ajouté avec succès', true)
    console.log(bibliotheque);
}
