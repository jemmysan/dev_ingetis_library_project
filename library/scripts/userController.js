
 const Bibliotheque = {
    livres: [],
    utilisateurs: [],
    emprunts: [],
    prochainIdLivre: 1,
    prochainIdUtilisateur: 1,
    prochainIdEmprunt: 1,
    stockLivre : 0
};

const utilisateurs = [];

function ajouterUtilisateur(nom, email, telephone){
    if(!nom || typeof(nom)!=='string' || nom.trim() ===''){
        message('Le nom de l\'utilisateur est obligtoire',false);
    }

    if(!email || typeof(email)!== 'string'){
        message('L\'adresse mail est requise',false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex){
        message('le format de l\'adresse mail est incorrect', false);
    }

    if(!telephone || typeof(telephone)!== 'string'){
        message('Le numéro téléphone est obligatoire', false)
    }

    const cleanTel = telephone.trim();
    const regexMobileFR = /^(?:(?:\+|00)33|0)[67]\s*(?:\d{2}\s*){4}$/;

    if(!regexMobileFR.test(cleanTel)){
        message('le format du téléphone est incorrect', false);
    }

    const nouvelUtilisateur = {
        id : bibliotheque.prochainIdUtilisateur,
        nom : nom.trim(),
        email : email,
        telephone : telephone
    }

    utilisateurs.push(nouvelUtilisateur);
    Bibliotheque.prochainIdUtilisateur++
    // localStorage.setItem('utilisateurs', utilisateurs);
    message('Utilisateur ajouté avec succès', true);
}

