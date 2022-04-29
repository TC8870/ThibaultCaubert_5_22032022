//créer une cart de Kanap en HTML
function createKanapCart(kanaps) {
    for (let myCompteur = 0; myCompteur < kanaps.length; myCompteur++) {
        //Création lien a 
        //Création balise <Article>
        //Création URL Image
        //Création texte titre H3
        //Création texte descriptif p
        let newKanapLink = document.createElement('a')
        newKanapLink.href = "./product.html?id=" + kanaps[myCompteur]._id
        let newArticle = document.createElement('ARTICLE')
        let newImage = document.createElement('img')
        newImage.src = kanaps[myCompteur].imageUrl
        newImage.alt = kanaps[myCompteur].altTxt
        let newH3 = document.createElement('h3')
        newH3.textContent = kanaps[myCompteur].name
        newH3.className = "productName"
        let newP = document.createElement('p')
        newP.textContent = kanaps[myCompteur].description
        newP.className = "productDescription"
        //Ajout dans le HTML dans la balise items dans l'ordre
        document.getElementById("items").appendChild(newKanapLink)
        newKanapLink.appendChild(newArticle)
        newArticle.appendChild(newImage)
        newArticle.appendChild(newH3)
        newArticle.appendChild(newP)
    }
}

//Récupérer les données API et les afficher
fetch(" http://localhost:3000/api/products/")
    .then((reponse) => {
        //Renvoie la reponse dans la console avec son statut
        //Affiche le statut de la promesse au format JSON dans la console
        usersData = reponse.json();
        usersData.then(userJsonData => {
            createKanapCart(userJsonData)
        })
            //Si erreur
            .catch((err) => console.log("ERREUR PROMESSE"))
    })
    .catch((err) => console.log("ERREUR PROMESSE"))
